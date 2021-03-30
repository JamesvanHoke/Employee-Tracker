const inquirer = require("inquirer");

// Remove me for production, used to test prompts and adding to database
const connection = require("./connection");

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
    message: "What is the employee's first name?", //TODO: Add Validation
  },
  {
    type: "input",
    name: "last_name",
    message: "What is the employee's last name?", //TODO: Add Validation
  },
  {
    type: "list",
    name: "role",
    message: "What role does this employee hold?",
    choices: [], //Function within inquirer prompt will map over this array with our current roles in the DB.
  },
  {
    type: "list",
    name: "manager",
    message: "Does this employee have a manager? if they don't leave blank",
    choices: [], //Add function to pull existing employees.
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
      // Runs Inquirer prompt from Questions array, pulls the dept_name from the response into a deconstructed variable
      const { dept_name } = await inquirer.prompt(addDeptQuestions);

      //Our MySQL prompt to insert new data into our table using placeholders
      const DepartmentInsert = "INSERT INTO department (dept_name) VALUES (?);";

      // await function, passes in our response and fills in placeholder with dept_name variable
      await connection.query(DepartmentInsert, [dept_name]);

      //Logs a confirmation to the user so they can see that the department has been added.
      console.log(dept_name + " has been added to the database.");
      break;

    case "Role":
      // Query our DB for all current departments and save it to a variable.
      const currentDepts = await connection.query("SELECT * FROM department;");

      // Targets the third question (second index) of our role questions array, and sets the choices array to be equal to our mapped department db
      addRoleQuestions[2].choices = currentDepts.map((data) => data.dept_name);

      // Runs Inquirer prompt from Role Questions array, pulls the title, salary, and department id into a variable
      const response = await inquirer.prompt(addRoleQuestions);

      // Our MySQL prompt to insert new data into our table using placeholders
      const RoleInsert =
        "INSERT INTO employeeRole (title, salary, department_id) VALUES (?, ?, ?);";

      // Checks our database for dept name ID's that match the dept we passed in via inquirer
      const deptIDQuery = await connection.query(
        "SELECT id FROM department WHERE dept_name = ?;",
        [response.department]
      );

      // Maps the returned object so we can pass it into our mysql
      let id = deptIDQuery.map((data) => data.id);

      // Puts together our query and sends it along to the database generating a new role.
      await connection.query(RoleInsert, [response.title, response.salary, id]);

      // Logs a confirmation to the user so they can see that the role they created has been added to their selected department.
      console.log(
        `The role of ${response.title} has been added to the ${response.department} department in the database.`
      );
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

exports.module = addDataPrompt;
