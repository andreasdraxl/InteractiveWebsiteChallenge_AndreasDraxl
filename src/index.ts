import { IProject, ProjectStatus, UserRole } from './class/Project';
import { ProjectsManager } from './class/ProjectsManager';

// Funktion zum Öffnen des Modals
function showModal(id: string) {
    const modal = document.getElementById(id);
    if (modal && modal instanceof HTMLDialogElement) {
        modal.showModal();
    } else {
        console.warn("The provided modal wasn't found. ID: ", id);
    }
}


// Funktion zum Schließen des Modals
function closeModal(id: string) {
    const modal = document.getElementById(id);
    if (modal && modal instanceof HTMLDialogElement) {
        modal.close();
    } else {
        console.warn("The provided modal wasn't found. ID: ", id);
    }
}

// "New Project" Button - Öffnet das Modal
const newProjectBtn = document.getElementById("new-project-btn");
if (newProjectBtn) {
    newProjectBtn.addEventListener("click", () => showModal("new-project-modal"));
} else {
    console.warn("No new project button found.");
}

// "Cancel" Button - Schließt das Modal
document.querySelectorAll(".btn-secondary").forEach(btn => {
    btn.addEventListener("click", () => closeModal("new-project-modal"));
});

// Formular-Submit verhindern und Daten loggen
const projectForm = document.getElementById("new-project-form");
if (projectForm && projectForm instanceof HTMLFormElement) {
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(projectForm);
        const projectData: IProject = {
            name: formData.get("name") as string || "",
            description: formData.get("description") as string || "",
            userRole: formData.get("role") as UserRole,
            status: formData.get("status") as ProjectStatus,
            finishDate: new Date(formData.get("date") as string || "")
        };
        const projectsListUI = document.getElementById("projects-list") as HTMLElement
        const projectManager = new ProjectsManager(projectsListUI);
        const project = projectManager.newProject(projectData);
        projectForm.reset()
        
    });
} else {
    console.warn("No new project form found. Check the ID!");
}
