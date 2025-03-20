import { Project } from './class/project.js';

// Funktion zum Öffnen des Modals
function showModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.showModal();
    } else {
        console.warn("The provided modal wasn't found. ID: ", id);
    }
}

// Funktion zum Schließen des Modals
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
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
if (projectForm) {
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(projectForm);
        const projectData = {
            name: formData.get("name"),
            description: formData.get("description"),
            role: formData.get("role"),
            status: formData.get("status"),
            date: formData.get("date")
        };

        const projectInstance = new Project(projectData);
        console.log(projectInstance);

        //closeModal("new-project-modal"); // Schließt das Modal nach dem Submit
    });
} else {
    console.warn("No new project form found. Check the ID!");
}
