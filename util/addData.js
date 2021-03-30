// * Add departments, roles, employees

const addDeptQuestions = [
  {
    type: "input",
    message: "Please input the name of the department you'd like to add.",
    name: "dept_name",
    validate(value) {
      if (isNaN(value) === true) {
        return true;
      }
      return "please enter a valid department name.";
    },
  },
];




// validate(value) {
//   if (isNaN(value) === false) {
//     return true;
//   }
//   return false;
// }

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
