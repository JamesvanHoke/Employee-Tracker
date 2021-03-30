const inquirer = require("inquirer")

//---------------------------------------------- Question Arrays ----------------------------------------------

// Question Array for adding a new department
const addDeptQuestions = [
  {
    type: "input",
    message: "What is the name of the department you'd like to add.",
    name: "dept_name",
    // Validates to make sure the user input a string and not a number
    validate(value) {
      if (isNaN(value) === true) {
        return true;
      }
      return "please enter a valid department name.";
    },
  },
];

//Question Array for adding a new role
const addRoleQuestions = [
  {
    type: "input",
    message: "What is the title of the role you'd like to add.",
    name: "title",
    // Validates to make sure the user input a string and not a number
    validate(value) {
      if (isNaN(value) === true) {
        return true;
      }
      return "please enter a valid title for your role.";
    },
  },
  {
    type: "input",
    message: "What is the yearly salary of the role",
    name: "salary",
    // Validates to make sure the user input a number and not a string
    validate(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return "please enter a valid number for your salary.";
    },
  },
  {
    type: "list",
    message: "Which department does this role belong to?",
    name: "department",
    choices: [], // Add function to pull from existing departments in our DB and present them
  },
];

// Question Array for adding an Employee
const addEmployeeQuestions = [
  {
    type: "input",
    message: "What is the employee's first name?",
    name: "first_name",
  },
  {
    type: "input",
    message: "What is the employee's last name?",
    name: "last_name",
  },
  {
    type: "list",
    message: "What role does this employee hold?",
    name: "role",
    choices: [], //Add Function to pull existing roles from DB
  },
  {
    type: "list",
    message: "Does this employee have a manager?",
    name: "manager",
    choices: [], //Add function to pull existing managers from DB
  },
];

//---------------------------------------------- Question Prompt ----------------------------------------------

// Sets as an async function so we can wait on inquirer responses
const addDataPrompt = async function () {
    
  // Runs Inquirer to check which table they'd like to add to, pulls their response into a variable
  const { SelectedType } = await inquirer.prompt([
    {
      type: "list",
      name: "SelectedType",
      message: "What would you like to add to?",
      choices: ["Department", "Role", "Employee", "None"],
    },
  ]);

  //   Switch case for our first inq prompt
  switch (SelectedType) {
    case "Department":
      // Run Department Questions array through inq
      // INSERT in dept. table, pass in the name value pulled from prompt resp.
      // Give user a console.log letting them know we did it
      break;
    case "Role":
      // Run role Questions array through inq
      // INSERT in role table, pass in the value salary, title, and dept_id pulled from prompt resp.
      // Give user a console.log letting them know we did it
      break;
    case "Employee":
      // Run Department Questions array through inq
      // INSERT in employee table, pass in the first name, last name, role ID, and manager id values pulled from prompt resp.
      // Give user a console.log letting them know we did it
      break;
  }
};

// Test call, comment out before production.
addDataPrompt();
