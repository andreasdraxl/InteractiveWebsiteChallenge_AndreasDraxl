//function
function showModal (id) {
    const modal = document.getElementById(id)
    modal.showModal()
}

//create New Project
const newProjectBtn = document.getElementById("new-project-btn")

if (newProjectBtn) {
    newProjectBtn.addEventListener("click", () => {showModal("new-project-modal")})
} else {
    console.warn("No new project button found")
}


