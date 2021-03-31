const inquirer = require("inquirer");

const updateDataPrompt = async function (connection) {
  const employeeDB = await connection.query(
    "SELECT CONCAT(employee.first_name, ' ', employee.last_name) AS full_name, employee_role.title, employee.id FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id;"
  );

  const roleDB = await connection.query("SELECT title, id FROM employee_role;");

  const { employee, newRole } = await inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: "Which employee do you want to update?",
      choices: employeeDB.map((data) => data.full_name),
    },
    {
      type: "list",
      name: "newRole",
      message: "Which role do you want to update them to?",
      choices: roleDB.map((data) => data.title),
    },
  ]);

  let employeeId;
  for (let i = 0; i < employeeDB.length; i++) {
    if (employeeDB[i].full_name === employee) {
      employeeId = employeeDB[i].id;
    }
  }
  let roleId;
  for (let j = 0; j < roleDB.length; j++) {
    if (roleDB[j].title === newRole) {
      roleId = roleDB[j].id;
    }
  }
  await connection.query("UPDATE employee SET role_id = ? WHERE id = ?;", [roleId, employeeId])
  console.log(`${employee} has been successfully changed to the role of ${newRole}`)
};

module.exports = updateDataPrompt;
