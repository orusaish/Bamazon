var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "samiya93",
  database: "Bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id" + connection.threadId);
  console.log("\n");
  console.log(
    "-----------------------Welcome to Bamazon-------------------------------"
  );
  console.log("\n");
});

var displayProducts = function() {
  var query = "Select * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;

    var displayTable = new Table({
      head: ["Item ID", "Product Name", "Department", "Price", "Quantity"],
      colWidths: [10, 25, 25, 10, 14]
    });
    for (var i = 0; i < res.length; i++) {
      displayTable.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    console.log(displayTable.toString());
    purchasePrompt();
  });
};

function purchasePrompt() {
  inquirer
    .prompt([
      {
        name: "ID",
        type: "input",
        message: "Please enter Item ID you like to purhcase.[Enter 0 to quit]",
        filter: Number
      },
      {
        name: "Quantity",
        type: "input",
        message: "How many items do you wish to purchase?",
        filter: Number
      }
    ])
    .then(function(answers) {
      if (answers.ID == 0) {
        console.log("Thank You");
        process.exit();
      }

      var quantityNeeded = answers.Quantity;
      var IDrequested = answers.ID;

      purchaseOrder(IDrequested, quantityNeeded);
    });
}

function purchaseOrder(ID, amtNeeded) {
  connection.query("Select * FROM products WHERE item_id = " + ID, function(
    err,
    res
  ) {
    if (err) {
      console.log("err");
    }
    if (amtNeeded <= res[0].stock_quantity) {
      var totalCost = res[0].price * amtNeeded;
      console.log("Good news your order is in stock!");
      console.log(
        "Your total cost for " +
          amtNeeded +
          " " +
          res[0].product_name +
          " is " +
          totalCost +
          "$ Thank you!"
      );
      connection.query(
        "UPDATE products SET stock_quantity='" +
          (res[0].stock_quantity - amtNeeded) +
          "' WHERE item_id=" +
          ID,
        function(err, res2) {}
      );
    } else {
      console.log(
        "Insufficient quantity, sorry we do not have enough " +
          res[0].product_name +
          " to complete your order."
      );
    }
    console.log(
      "--------------------------------------------------------------"
    );
    inquirer
      .prompt({
        name: "buy",
        type: "list",
        message: "Would you like to Buy more? ",
        choices: ["yes", "No"]
      })
      .then(function(answer) {
        if (answer.buy === "yes") {
          displayProducts();
        } else if (answer.buy === "No") {
          console.log("Thank you");
          process.exit();
        }
      });
  });
}

displayProducts();
