import { IProject,Project } from "./Project"



export class ProjectsManager {
    list: Project[] = []
    ui: HTMLElement

    constructor(container: HTMLElement) {
        this.ui = container
    }

    newProject(data: IProject) {
        const project = new Project(data);
    
        project.ui.addEventListener("click", () => {
            const projectsPage = document.getElementById("projects-page");
            const detailsPage = document.getElementById("project-details");
            if (!projectsPage || !detailsPage) return;
    
            projectsPage.style.display = "none";
            detailsPage.style.display = "flex";
            this.setDetailsPage(project);
        });
    
        this.ui.append(project.ui);
        this.list.push(project);
    }
    
    private setDetailsPage(project: Project) {
        const detailsPage = document.getElementById("project-details");
        if (!detailsPage) return;
    
        const name = detailsPage.querySelector("[data-project-info='name']");
        if (name) name.textContent = project.name;
    }
    

    createDefaultProject() {
        const defaultProject: IProject = {
            name: "Default Project",
            description: "This is a default project description.",
            status: "pending",
            userRole: "developer",
            finishDate: new Date(),
        };

        this.newProject(defaultProject);
    }

    getProject(id: string) {
        const project = this.list.find((project) => {
            return project.id === id
        })
        return project
    }

    deleteProject(id: string) {
        const project = this.getProject(id)
        if (!project) { return }
        project.ui.remove()
        const remaining = this.list.filter((project) => {
                return project.id !== id
            })
            this.list = remaining
        }

    

    exportToJSON(fileName: string = "projects") {
        const json = JSON.stringify(this.list, null, 2)
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.click()
        URL.revokeObjectURL(url)
    }



    importFromJSON() {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'application/json'
        const reader = new FileReader()
        reader.addEventListener('load', (e) => {
            const json = reader.result
            if (!json) { return }
            const projects: IProject[] = JSON.parse(json as string)
            for (const project of projects) {
                try {
                this.newProject(project)
            } catch (error) {
                console.error(error)
            }
        }
    })
    input.addEventListener('change', () => {
        const filesList = input.files
        if (!filesList) { return }
            reader.readAsText(filesList[0])
        })
        input.click()
    }
}