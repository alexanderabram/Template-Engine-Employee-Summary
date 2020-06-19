const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

function appMenu () {
    console.log("Let's build your team!");
    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                message: "Manager, please enter your name.",
                name: "name"
            },
            {
                type: "input",
                message: "What is your employee ID number?",
                name: "id"
            },
            {
                type: "input",
                message: "Please enter your email address",
                name: "email"
            },
            {
                type: "input",
                message: "What is your office number?",
                name: "officeNumber"
            },
        ])
        .then(res => {
            const manager = new Manager(res.name, res.id, res.email, res.officeNumber);
            team.push(manager);
            createTeam();
        })
    }
    function createTeam() {
        inquirer.prompt([
            {
                type: 'list',
                message: 'Would you like to add another team member, or create team summary?',
                name: 'memberChoice',
                choices: ['Engineer', 'Intern', 'Build Team Summary']
            }
        ])
        .then(res => {
            switch (res.memberChoice) {
                case 'Engineer':
                    addEngineer();
                    break;
                case 'Intern':
                    addIntern();
                    break;
                case 'Build Team Summary':
                    buildTeam();
            }
        })
    }
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter employee's name",
                name: "name"
            },
            {
                type: "input",
                message: "Please enter employee's ID number",
                name: "id"
            },
            {
                type: "input",
                message: "Please enter employee's email address",
                name: "email"
            },
            {
                type: "input",
                message: "Please enter employee's GitHub account",
                name: "github"
            },
        ])
        .then(res => {
            const engineer = new Engineer(res.name, res.id, res.email, res.github);
            team.push(engineer);
            createTeam();
        })
    }
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                message: "Please enter intern's name",
                name: "name"
            },
            {
                type: "input",
                message: "Please enter intern's ID number",
                name: "id"
            },
            {
                type: "input",
                message: "Please enter intern's email address",
                name: "email"
            },
            {
                type: "input",
                message: "Please enter intern's school",
                name: "school"
            },
        ])
        .then(res => {
            const intern = new Intern(res.name, res.id, res.email, res.school);
            team.push(intern);
            createTeam();
        })
    }
    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(team), 'utf-8');
    }
    createManager();
}
appMenu();