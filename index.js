//function
function showModal (id) {
    const modal = document.getElementById(id)
    if (modal) {
        modal.showModal()
    } else {
        console.warn("The provided modal wasn`t found. ID: ", id)
    }
    
}

//create New Project
const newProjectBtn = document.getElementById("new-project-btn")

if (newProjectBtn) {
    newProjectBtn.addEventListener("click", () => {showModal("new-project-modal")})
} else {
    console.warn("No new project button found")
}

const projectForm = document.getElementById("new-project-form")
if (projectForm) {
    projectForm.addEventListener("submit", () => {})
} else {
    console.warn("No new project form found. Check the ID!")
}

