const inquirer = require("inquirer");
const cTable = require("console.table");

// Sets as an async function so we can wait on inquirer responses
const viewDataPrompt = async function (connection) {
  // Runs Inquirer to check which table they'd like to add to, pulls their response into a variable
  const { SelectedType } = await inquirer.prompt([
    {
      type: "list",
      name: "SelectedType",
      message: "What would you like to view?",
      choices: ["Departments", "Roles", "Employees", "None"],
    },
  ]);

  //   Switch case for our first inq prompt
  switch (SelectedType) {
    case "Departments":
      const viewDepts = await connection.query(
        "SELECT id, dept_name FROM department;");
      console.table(viewDepts);
      break;
    case "Roles":
      const viewRoles = await connection.query("SELECT title, salary, dept_name AS department FROM employee_role LEFT JOIN department on employee_role.department_id = department.id ORDER BY department;");
      console.table(viewRoles);
      break;

    case "Employees":
      const viewEmployees = await connection.query("SELECT employee.first_name, employee.last_name, employee_role.title, department.dept_name AS department, salary FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id LEFT JOIN department ON employee_role.department_id = department.id ORDER BY dept_name ASC, title ASC, last_name ASC;");
      console.table(viewEmployees);
      break;
  }
};

module.exports = viewDataPrompt;
