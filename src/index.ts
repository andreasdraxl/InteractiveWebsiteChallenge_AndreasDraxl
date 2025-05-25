import { IProject, ProjectStatus, UserRole } from './class/Project';
import { ProjectsManager } from './class/ProjectsManager';
import { initializeViewer } from './class/Viewer';


// Funktion zum Öffnen des Modals
function showModal(id: string) {
    const modal = document.getElementById(id);
    if (modal && modal instanceof HTMLDialogElement) {
        modal.showModal();
    } else {
        console.warn("The provided modal wasn't found. ID: ", id);
    }
}

const projectsListUI = document.getElementById("projects-list") as HTMLElement;
const projectManager = new ProjectsManager(projectsListUI);

document.addEventListener("DOMContentLoaded", () => {
    const newProjectBtn = document.getElementById("new-project-btn");
    if (newProjectBtn) {
        newProjectBtn.addEventListener("click", () => {
            projectManager.createDefaultProject(); // Erstellt ein Standardprojekt nur nach Klick

            
        });
    }

    /*
document.addEventListener("DOMContentLoaded", () => {
    const newProjectBtn = document.getElementById("new-project-btn");
    if (newProjectBtn) {
        newProjectBtn.addEventListener("click", () => {
            const newProject = projectManager.createDefaultProject();

            // Füge Event-Listener für die neue Karte hinzu
            setTimeout(() => {
                const projectCards = document.querySelectorAll('.project-card');
                const lastCard = projectCards[projectCards.length - 1];
                if (lastCard) {
                    lastCard.addEventListener("click", () => {
                        const viewerContainer = document.getElementById("viewer-container");
                        if (viewerContainer) {
                            initializeViewer(viewerContainer);
                        }
                    });
                }
            }, 100); // kurze Verzögerung, um sicherzustellen, dass das Element gerendert ist
        });
    }
    */

    // Event-Listener für alle "Edit"-Buttons in Projekten
    document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;

        // Prüfen, ob ein "Edit"-Button geklickt wurde
        if (target.classList.contains("edit-project-btn")) {
            const projectCard = target.closest(".project-card"); // Finde die nächste Projektkarte
            
            if (projectCard) {
                const projectName = projectCard.querySelector("h5")?.innerText || "";
                const projectDescription = projectCard.querySelector("p")?.innerText || "";

                // Setze die Werte ins Formular
                const nameInput = document.getElementById("project-name") as HTMLInputElement;
                const descriptionInput = document.getElementById("project-description") as HTMLTextAreaElement;

                if (nameInput && descriptionInput) {
                    nameInput.value = projectName;
                    descriptionInput.value = projectDescription;
                }

                showModal("new-project-modal"); // Öffnet das Modal zum Bearbeiten
            } else {
                console.warn("No project card found for editing.");
            }
        }
    });
});

// Funktion zum Schließen des Modals
function closeModal(id: string) {
    const modal = document.getElementById(id);
    if (modal && modal instanceof HTMLDialogElement) {
        modal.close();
    } else {
        console.warn("The provided modal wasn't found. ID: ", id);
    }
}

// Formular-Submit verhindern und Daten speichern
const projectForm = document.getElementById("new-project-form");
if (projectForm && projectForm instanceof HTMLFormElement) {
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const formData = new FormData(projectForm);
        const dateString = formData.get("date") as string;
        const finishDate = dateString ? new Date(dateString) : new Date(); 
        const projectData: IProject = {
            name: formData.get("name") as string || "",
            description: formData.get("description") as string || "",
            userRole: formData.get("role") as UserRole,
            status: formData.get("status") as ProjectStatus,
            finishDate: finishDate
        };
        try {
            projectManager.newProject(projectData);
            projectForm.reset();
            closeModal("new-project-modal");
        } catch (error) {
            alert(error);
        }
    });
} else {
    console.warn("No new project form found. Check the ID!");
}

const exportProjectsBtn = document.getElementById("export-projects-btn");
if (exportProjectsBtn) {
    exportProjectsBtn.addEventListener("click", () => {
        projectManager.exportToJSON();
    });
}

const importProjectsBtn = document.getElementById("import-projects-btn");
if (importProjectsBtn) {
    importProjectsBtn.addEventListener("click", () => {
        projectManager.importFromJSON();
    });
}


