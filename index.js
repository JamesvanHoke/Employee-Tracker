// Import our MySQL promisify'd connection from /util
const inquirer = require("inquirer");
const addDataPrompt = require("./util/addData");
const viewDataPrompt = require("./util/viewData");
const updateDataPrompt = require("./util/updateData");
// const deleteDataPrompt = require("./util/deleteData")
const connection = require("./util/connection");

console.log(`

/$$$$$$$$                         /$$                                         
| $$_____/                        | $$                                        
| $$       /$$$$$$/$$$$   /$$$$$$ | $$  /$$$$$$  /$$   /$$  /$$$$$$   /$$$$$$ 
| $$$$$   | $$_  $$_  $$ /$$__  $$| $$ /$$__  $$| $$  | $$ /$$__  $$ /$$__  $$
| $$__/   | $$ \ $$ \ $$| $$  \ $$| $$| $$  \ $$| $$  | $$| $$$$$$$$| $$$$$$$$
| $$      | $$ | $$ | $$| $$  | $$| $$| $$  | $$| $$  | $$| $$_____/| $$_____/
| $$$$$$$$| $$ | $$ | $$| $$$$$$$/| $$|  $$$$$$/|  $$$$$$$|  $$$$$$$|  $$$$$$$
|________/|__/ |__/ |__/| $$____/ |__/ \______/  \____  $$ \_______/ \_______/
                        | $$                     /$$  | $$                    
                        | $$                    |  $$$$$$/                    
                        |__/                     \______/                     
 /$$$$$$$$                           /$$                                      
|__  $$__/                          | $$                                      
   | $$  /$$$$$$  /$$$$$$   /$$$$$$$| $$   /$$  /$$$$$$   /$$$$$$             
   | $$ /$$__  $$|____  $$ /$$_____/| $$  /$$/ /$$__  $$ /$$__  $$            
   | $$| $$  \__/ /$$$$$$$| $$      | $$$$$$/ | $$$$$$$$| $$  \__/            
   | $$| $$      /$$__  $$| $$      | $$_  $$ | $$_____/| $$                  
   | $$| $$     |  $$$$$$$|  $$$$$$$| $$ \  $$|  $$$$$$$| $$                  
   |__/|__/      \_______/ \_______/|__/  \__/ \_______/|__/                  
                                                                              
                                                                              
                                                                               
`);

const init = async function () {
  let { whatToDo } = await inquirer.prompt([
    {
      type: "list",
      name: "whatToDo",
      message: "What would you like to do?",
      choices: [
        "View The Company",
        "Add To The Company",
        "Update An Employee",
        "Exit",
      ],
    },
  ]);

  switch (whatToDo) {
    case "View The Company":
      await viewDataPrompt(connection);
      init();
      break;
    case "Add To The Company":
      await addDataPrompt(connection);
      init();
      break;
    case "Update An Employee":
      await updateDataPrompt(connection)
      init();
      break;
    case "Delete From The Company":
      await deleteDataPrompt(connection);
      init();
      break;
    default:
      connection.end();
      break;
  }
};

init();
