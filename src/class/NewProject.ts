import { Project, IProject } from "./Project";

const defaultProject: IProject = {
    name: "Default Project",
    description: "This is a default project description.",
    status: "pending",
    userRole: "developer",
    finishDate: new Date(),
    ToDo: "Initial setup and planning"
};

export function createNewProject() {
    const project = new Project(defaultProject);
    
    // Füge das neue Projekt zur Projektliste in der UI hinzu
    const projectList = document.getElementById("projects-list");
    if (projectList) {
        projectList.appendChild(project.ui);
    }
}

// Beim Laden der Seite direkt eine Default-Karte hinzufügen
document.addEventListener("DOMContentLoaded", () => {
    createNewProject(); // Erstellt sofort ein Default-Projekt beim Laden der Seite

    const newProjectBtn = document.getElementById("new-project-btn");
    if (newProjectBtn) {
        newProjectBtn.addEventListener("click", () => {
            createNewProject();
        });
    }
});
