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

// "New User" Button - Öffnet das Modal
const newUserBtn = document.getElementById("new-User-btn");
if (newUserBtn) {
    newUserBtn.addEventListener("click", () => showModal("new-User-modal"));
} else {
    console.warn("No new User button found.");
}

// "Cancel" Button - Schließt das Modal
const cancelBtn = document.querySelector(".btn-secondary"); 
if (cancelBtn) {
    cancelBtn.addEventListener("click", () => closeModal("new-User-modal"));
} else {
    console.warn("No cancel button found.");
}

// Formular-Submit verhindern und Daten loggen
const UserForm = document.getElementById("new-User-form");
if (UserForm) {
    UserForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(UserForm)
        const User = {
            name: formData.get("name"),
            discription: formData.get("discription"),
            role: formData.get("role"),
            status: formData.get("status"),
            date: formData.get("date")
        }
        console.log(User);
        closeModal("new-User-modal"); // Schließt das Modal nach dem Submit
    });
} else {
    console.warn("No new User form found. Check the ID!");
}
