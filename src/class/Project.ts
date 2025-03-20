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

    constructor(data: IProject) {
        this.name = data.name
        this.description = data.description
        this.status = data.status
        this.userRole = data.userRole
        this.finishDate = data.finishDate
    }
}
