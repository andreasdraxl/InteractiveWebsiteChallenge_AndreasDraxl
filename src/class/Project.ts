export type ProjectStatus = "pending" | "inProgress" | "finished" 
export type UserRole = "architect" | "developer" | "engineer"

export interface IProject {
    name: string
    description: string
    status: ProjectStatus
    userRole: UserRole
    finishDate: Date
}

export class Project implements IProject{
    name: string
    description: string
    status: "pending" | "inProgress" | "finished"
    userRole: "architect" | "developer" | "engineer"
    finishDate: Date;

    ui: HTMLDivElement
    cost: number = 0
    progress: number = 0

    constructor(data: IProject) {
        //project data definition
        this.name = data.name
        this.description = data.description
        this.status = data.status
        this.userRole = data.userRole
        this.finishDate = data.finishDate
        this.setUI()
       
    }

    setUI() { 
        if (this.ui) {return}
        this.ui = document.createElement("div")
        this.ui.className = "project-card"
        this.ui.innerHTML = `
        <div class="card-header">
                        <p class="project-initials" style="background-color: #ca8134; padding: 10px; border-radius: 8px; aspect-ratio: 1">HC</p>
                        <div>
                            <h5>${this.name}</h5>
                            <p>${this.description}</p>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card-property">
                            <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                                <div class="card-property">
                                <p style="color: #969696; font-size: 12px;">status</p>
                                <p><strong>${this.status}</strong></p>
                                </div>
                                <div class="card-property">
                                <p style="color: #969696; font-size: 12px;">user role</p>
                                <p><strong>${this.userRole}</strong></p>
                                </div>
                                <div class="card-property"><p style="color: #969696; font-size: 12px;">cost</p>
                                <p><strong>$${this.cost}</strong></p>
                                </div>
                                <div class="card-property"><p style="color: #969696; font-size: 12px;">Progress</p>
                                <p><strong>${this.progress* 100}%</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
        `}
}
