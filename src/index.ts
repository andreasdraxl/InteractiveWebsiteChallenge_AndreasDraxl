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

const projectsListUI = document.getElementById("projects-list") as HTMLElement;
const projectManager = new ProjectsManager(projectsListUI);

document.addEventListener("DOMContentLoaded", () => {
    const newProjectBtn = document.getElementById("new-project-btn");
    if (newProjectBtn) {
        newProjectBtn.addEventListener("click", () => {
            projectManager.createDefaultProject();  // Erstellt das Standardprojekt nur nach Klick
        });
    }

    // Event-Listener für den "Edit"-Button in der Projekt-Detailseite
    const editProjectBtn = document.querySelector(".btn-secondary");
    if (editProjectBtn) {
        editProjectBtn.addEventListener("click", () => {
            showModal("project-card-modal");  // Öffne das Bearbeitungsmodal
        });
    }
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
        const projectData: IProject = {
            name: formData.get("name") as string || "",
            description: formData.get("description") as string || "",
            userRole: formData.get("role") as UserRole,
            status: formData.get("status") as ProjectStatus,
            finishDate: new Date(formData.get("date") as string || "")
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
