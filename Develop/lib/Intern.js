const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school){
        super(name, id, email);
        this.school = school;   
    };

    //returns the school of the employee
    getSchool() {
        return this.school;
    };

    //returns the role of the employee
    getRole() {
        return "Intern";
    };
};
//.exports allows this page to be used elsewhere
module.exports = Intern;