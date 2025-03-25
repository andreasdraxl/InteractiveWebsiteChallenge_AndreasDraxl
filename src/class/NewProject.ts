import { v4 as uuidv4 } from 'uuid';

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
    id: string

    constructor(data: IProject) {
        //project data definition
        for (const key in data) {
            this[key] = data[key]
        }
        this.id = uuidv4()
        this.setUI()
       
    }

    setUI() { 
        if (this.ui) {return}
        this.ui = document.createElement("div")
        this.ui.className = "project-card"
        this.ui.innerHTML = `
         <div class="project-card">
                    <div class="card-header">
                        <p class="project-initials" style="background-color: #ca8134; padding: 10px; border-radius: 8px; aspect-ratio: 1">HC</p>
                        <div>
                            <h5>Project Name</h5>
                            <p>Project Description Goes Here</p>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card-property">
                            <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                                <div class="card-property"><p style="color: #969696; font-size: 12px;">Status</p><p><strong>Active</strong></p></div>
                                <div class="card-property"><p style="color: #969696; font-size: 12px;">Cost</p><p><strong>€ 1.000.000.000</strong></p></div>
                                <div class="card-property"><p style="color: #969696; font-size: 12px;">Role</p><p><strong>Engineer</strong></p></div>
                                <div class="card-property"><p style="color: #969696; font-size: 12px;">Finish Date</p><p><strong>2030-05-01</strong></p></div>
                            </div>
                        </div>
                    </div>
                </div>
        `}
}
