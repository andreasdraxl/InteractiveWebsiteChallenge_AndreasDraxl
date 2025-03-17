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

// "New user" Button - Öffnet das Modal
const newuserBtn = document.getElementById("new-user-btn");
if (newuserBtn) {
    newuserBtn.addEventListener("click", () => showModal("new-user-modal"));
} else {
    console.warn("No new user button found.");
}

// "Cancel" Button - Schließt das Modal
const cancelBtn = document.querySelector(".btn-secondary"); 
if (cancelBtn) {
    cancelBtn.addEventListener("click", () => closeModal("new-user-modal"));
} else {
    console.warn("No cancel button found.");
}

// Formular-Submit verhindern und Daten loggen
const userForm = document.getElementById("new-user-form");
if (userForm) {
    userForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(userForm)
        const user = {
            name: formData.get("name"),
            discription: formData.get("discription"),
            role: formData.get("role"),
            status: formData.get("status"),
            date: formData.get("date")
        }
        console.log(user);
        closeModal("new-user-modal"); // Schließt das Modal nach dem Submit
    });
} else {
    console.warn("No new user form found. Check the ID!");
}
