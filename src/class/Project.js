export class Project {

    constructor(data) {
        this.name = data.name;
        this.description = data.description; 
        this.status = data.status;
        this.userRole = data.role;
        this.finishDate = data.date; 
    }
}
