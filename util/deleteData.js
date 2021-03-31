const inquirer = require("inquirer");

const deleteDataPrompt = async function (connection) {
  const { userSelection } = await inquirer.prompt([
    {
      type: "list",
      name: "userSelection",
      message: "What aspect of the company do you want to delete.",
      choices: ["Department", "Roles", "Employees", "Nevermind"],
    },
  ]);

  switch (userSelection) {
    case "Department":
      const departmentDB = await connection.query("SELECT * FROM department");
      const { deptId } = await inquirer.prompt({
        type: "list",
        name: "deptId",
        message: "Which department do you want to remove?",
        choices: departmentDB.map((data) => data.dept_name),
      });

      const { DepConfirm } = await inquirer.prompt({
        type: "confirm",
        name: "DepConfirm",
        message: `Are you sure you want to remove ${deptId}?`
      });

      if(DepConfirm === true){
          let dept;
          for (let i = 0; i < departmentDB.length; i++) {
            if (departmentDB[i].dept_name === deptId) {
              dept = departmentDB[i].id;
            }
          }
          await connection.query("DELETE FROM department WHERE id=?", dept);
          console.log(`${deptId} has been removed from the database`);
      } else {
          console.log(`Deletion of ${deptId} has been aborted.`)
      }
      break;
    case "Roles":
        const roleDB = await connection.query("SELECT * from employee_role")
        const { roleId } = await inquirer.prompt({
            type: "list",
            name: "roleId",
            message: "Which role do you want to remove?",
            choices: roleDB.map((data) => data.title),
        })
        const { roleConfirm } = await inquirer.prompt({
            type: "confirm",
            name: "roleConfirm",
            message: `Are you sure you want to remove ${roleId}?`
          });

          if(roleConfirm === true){
              let role;
              for (let i = 0; i < roleDB.length; i++) {
                if (roleDB[i].title === roleId) {
                  role = roleDB[i].id;
                }
              }
              await connection.query("DELETE FROM employee_role WHERE id=?", role);
              console.log(`${roleId} has been removed from the database`);
          } else {
              console.log(`Deletion of ${roleId} has been aborted.`)
          }
      break;
    case "Employees":
        console.log("Sorry, you can't remove your employees... yet")
      break;
    default:
      break;
  }
};
module.exports = deleteDataPrompt;
