// Import our MySQL promisify'd connection from /util
const connection = require("./util/connection");
const inquirer = require("inquirer");
const ConsoleTable = require("console.table");

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "whatToDo",
        message: "What would you like to do?",
        choices: ["View All Flavors", "Add A Flavor", "Exit"],
      },
    ])
    .then(function (response) {
      switch (response.whatToDo) {
        case "View All Flavors":
          viewFlavors();
          break;
        case "Add A Flavor":
          addFlavor();
          break;
        default:
          connection.end();
      }
    });
}

init();
