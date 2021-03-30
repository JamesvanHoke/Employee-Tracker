// * View departments, roles, employees

function viewFlavors() {
    connection.query("SELECT * FROM products", function (err, data) {
      console.table(data);
    });
  }