import { v4 as uuidv4 } from 'uuid';

export type ProjectStatus = "pending" | "inProgress" | "finished";
export type UserRole = "architect" | "developer" | "engineer";

export interface IProject {
    name: string;
    description: string;
    status: ProjectStatus;
    userRole: UserRole;
    finishDate: Date;
}

export class Project implements IProject {
    name: string;
    description: string;
    status: ProjectStatus;
    userRole: UserRole;
    finishDate: Date;

    ui: HTMLDivElement;
    cost: number = 0;
    progress: number = 0;
    id: string;

    constructor(data: IProject) {
        this.name = data.name;
        this.description = data.description;
        this.status = data.status;
        this.userRole = data.userRole;
        this.finishDate = data.finishDate;
        this.id = uuidv4();

        this.setUI();
    }

    setUI() {
        if (this.ui) return;
    
        
        const getInitials = (name: string): string => {
            return name
                .split(" ") 
                .map(word => word.charAt(0).toUpperCase()) 
                .join(""); 
        };
    
        const initials = getInitials(this.name);
    
        this.ui = document.createElement("div");
        this.ui.className = "project-card";
        this.ui.innerHTML = `
            <div class="card-header">
                <p class="project-initials" style="background-color: rgb(130, 117, 102); padding: 10px; border-radius: 8px; aspect-ratio: 1">
                    ${initials}
                </p>
                <div>
                    <h5>${this.name}</h5>
                    <p>${this.description}</p>
                </div>
            </div>
            <div class="card-content">
                <div class="card-property">
                    <div style="display: flex; flex-wrap: wrap; gap: 15px;">
                        <div class="card-property">
                            <p style="color: #969696; font-size: 12px;">Status</p>
                            <p><strong>${this.status}</strong></p>
                        </div>
                        <div class="card-property">
                            <p style="color: #969696; font-size: 12px;">Cost</p>
                            <p><strong>€ ${this.cost}</strong></p>
                        </div>
                        <div class="card-property">
                            <p style="color: #969696; font-size: 12px;">Role</p>
                            <p><strong>${this.userRole}</strong></p>
                        </div>
                        <div class="card-property">
                            <p style="color: #969696; font-size: 12px;">Finish Date</p>
                            <p><strong>${this.finishDate.toISOString().split("T")[0]}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    
        // Event-Listener für den Edit-Button
        const editButton = this.ui.querySelector(".edit-project-btn") as HTMLButtonElement;
        if (editButton) {
            editButton.addEventListener("click", () => {
                alert(`Editing project: ${this.name}`);
                // Hier könnte später eine Modal-Funktion zum Bearbeiten implementiert werden
            });
        }
    }
}
