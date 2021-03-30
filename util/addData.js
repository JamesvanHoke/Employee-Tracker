// * Add departments, roles, employees

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



// function addFlavor() {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "flavor",
//         message: "What flavor would you like to add?",
//       },
//       {
//         type: "input",
//         name: "price",
//         message: "How much does it cost?",
//       },
//       {
//         type: "input",
//         name: "quantity",
//         message: "How many do you have?",
//       },
//     ])
//     .then(function (response) {
//       console.log(response);
//       const query =
//         "INSERT INTO products (flavor, price, quantity) VALUES (?, ?, ?);";

//       const foo = connection.query(
//         query,
//         [response.flavor, response.price, response.quantity],
//         function (err, data) {
//           console.log("Added flavor", response.flavor);
//           console.log(foo.sql);
//         }
//       );
//     });
// }
