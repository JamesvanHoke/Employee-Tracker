// Import our MySQL promisify'd connection from /util
const inquirer = require("inquirer");
const addDataPrompt = require("./util/addData");
const viewDataPrompt = require("./util/viewData");
const updateDataPrompt = require("./util/updateData");
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
        "Update The Company",
        "Exit",
      ],
    },
  ]);

  switch (whatToDo) {
    case "View The Company":
      await viewDataPrompt(connection);
      await init();
      break;
    case "Add To The Company":
      await addDataPrompt(connection);
      await init();
      break;
    case "Update The Company":
      await updateDataPrompt(connection)
      await init();
      break;
    case "Delete From The Company":
      console.log("I still need to have a function made");
      break;
    default:
      connection.end();
      break;
  }
};

init();
