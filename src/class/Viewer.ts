// Import necessary libraries
import * as THREE from "three";
import * as OBC from "@thatopen/components";
import * as OBF from "@thatopen/components-front";
import * as BUI from "@thatopen/ui";

//export interface IProject 
export function initializeViewer(container: HTMLElement) {
    container.innerHTML = '<p>3D Viewer läuft hier!</p>'; // Beispielinhalt
    // Hier kommt dein eigentlicher Viewer-Code
}

// Initialize the UI manager
BUI.Manager.init();

// Create the main component manager
const components = new OBC.Components();

// Create the main world for the 3D scene
const worlds = components.get(OBC.Worlds);
const world = worlds.create<
  OBC.SimpleScene,
  OBC.OrthoPerspectiveCamera,
  OBF.PostproductionRenderer
>();
world.name = "Main";

// Setup the scene
world.scene = new OBC.SimpleScene(components);
world.scene.setup();
world.scene.three.background = null;

// Create the viewport (3D viewer)
const viewport = BUI.Component.create<BUI.Viewport>(() => {
  return BUI.html`
    <bim-viewport>
      <bim-grid floating></bim-grid>
    </bim-viewport>
  `;
});

// Set up the renderer
world.renderer = new OBF.PostproductionRenderer(components, viewport);
const { postproduction } = world.renderer;

// Create and configure the camera
world.camera = new OBC.OrthoPerspectiveCamera(components);

// Add a grid to the scene
const worldGrid = components.get(OBC.Grids).create(world);
worldGrid.material.uniforms.uColor.value = new THREE.Color(0x424242);
worldGrid.material.uniforms.uSize1.value = 2;
worldGrid.material.uniforms.uSize2.value = 8;

// Handle resizing
const resizeWorld = () => {
  world.renderer?.resize();
  world.camera.updateAspect();
};
viewport.addEventListener("resize", resizeWorld);

// Init components
components.init();

// Enable post-processing
postproduction.enabled = true;
postproduction.customEffects.excludedMeshes.push(worldGrid.three);
postproduction.setPasses({ custom: true, ao: true, gamma: true });
postproduction.customEffects.lineColor = 0x17191c;

// Set layout with only the viewport
const app = document.getElementById("app") as BUI.Grid;
app.layouts = {
  onlyViewport: {
    template: `"viewport" 1fr / 1fr`,
    elements: { viewport },
  },
};
app.layout = "onlyViewport";
