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
const cancelBtn = document.querySelector(".btn-secondary"); 
if (cancelBtn) {
    cancelBtn.addEventListener("click", () => closeModal("new-project-modal"));
} else {
    console.warn("No cancel button found.");
}

// Formular-Submit verhindern und Daten loggen
const projectForm = document.getElementById("new-project-form");
if (projectForm) {
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(projectForm)
        const project = {
            name: formData.get("name"),
            discription: formData.get("discription"),
            role: formData.get("role"),
            status: formData.get("status"),
            date: formData.get("date")
        }
        console.log(project);
        closeModal("new-project-modal"); // Schließt das Modal nach dem Submit
    });
} else {
    console.warn("No new project form found. Check the ID!");
}
