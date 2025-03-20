export class Project {
    name: string;
    description: string;
    status: string;
    userRole: string;
    finishDate: string;

    constructor(data: { name: string; description: string; status: string; role: string; date: string }) {
        this.name = data.name;
        this.description = data.description;
        this.status = data.status;
        this.userRole = data.role;
        this.finishDate = data.date;
    }
}
