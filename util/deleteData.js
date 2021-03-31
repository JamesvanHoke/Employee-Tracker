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

      const { confirm } = await inquirer.prompt({
        type: "confirm",
        name: "confirm",
        message: `Are you sure you want to remove ${deptId}?`
      });

      if(confirm === true){
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
      break;
    case "Employees":
      break;
    default:
      break;
  }
};
module.exports = deleteDataPrompt;
