const inquirer = require("inquirer");

// Remove me for production, used to test prompts and adding to database
const connection = require("./connection")

//---------------------------------------------- Question Arrays ----------------------------------------------

// Question Array for adding a new department
const addDeptQuestions = [
  {
    type: "input",
    name: "dept_name",
    message: "What is the name of the department you'd like to add.",
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
    name: "title",
    message: "What is the title of the role you'd like to add.",
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
    name: "salary",
    message: "What is the yearly salary of the role",
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
    name: "department",
    message: "Which department does this role belong to?",
    choices: [], // Add function to pull from existing departments in our DB and present them
  },
];

// Question Array for adding an Employee
const addEmployeeQuestions = [
  {
    type: "input",
    name: "first_name",
    message: "What is the employee's first name?", //Add Validation
  },
  {
    type: "input",
    name: "last_name",
    message: "What is the employee's last name?", //Add Validation
  },
  {
    type: "list",
    name: "role",
    message: "What role does this employee hold?",
    choices: [], //Add Function to pull existing roles from DB
  },
  {
    type: "list",
    name: "manager",
    message: "Does this employee have a manager?",
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
      // Runs Inquirer prompt from Questions array, pulls the dept_name from the response
      const { dept_name } = await inquirer.prompt(addDeptQuestions);

      //Our MySQL prompt to insert new data into our table using placeholders
      const DepartmentInsert = "INSERT INTO department (dept_name) VALUES (?);";

      // await function, passes in our response and fills in placeholder with dept_name variable
      await connection.query(DepartmentInsert, [dept_name]);

      //Logs a confirmation log to the user so they can see that something has been done.
      console.log(dept_name + " has been added to the database.");
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
