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
  inquirerForUpdates();
});
function inquirerForUpdates() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "Choose an option below to manage current inventory:",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "Exit"
        ]
      }
    ])
    .then(function(answers) {
      switch (answers.action) {
        case "View Products for Sale":
          ViewProducts();
          break;
        case "View Low Inventory":
          LowInventory();
          break;
        case "Add to Inventory":
          AddInventory();

          break;
        case "Add New Product":
          NewProduct();
          break;
        case "Exit":
          ExitNow();
          break;
      }
    });
}
function ViewProducts() {
  connection.query("SELECT * FROM Products", function(err, res) {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.log("-----------List of Products for Sale --------------");
    console.log("\n");
    var theDisplayTable = new Table({
      head: ["Item ID", "Product Name", "Category", "Price", "Quantity"],
      colWidths: [10, 25, 25, 10, 14]
    });
    for (i = 0; i < res.length; i++) {
      theDisplayTable.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    console.log(theDisplayTable.toString());
    inquirerForUpdates();
  });
}

function ExitNow() {
  console.log("ThankYou");
  process.exit();
}

function LowInventory() {
  connection.query("SELECT * FROM Products WHERE stock_quantity < 5", function(
    err,
    res
  ) {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.log(
      "--------------------- List of Low Inventory Items --------------------------"
    );
    console.log("\n");
    var LowInventoryTable = new Table({
      head: ["Item ID", "Product Name", "Category", "Price", "Quantity"],
      colWidths: [10, 25, 25, 10, 14]
    });
    for (var i = 0; i < res.length; i++) {
      LowInventoryTable.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity
      ]);
    }
    console.log(LowInventoryTable.toString());
    inquirerForUpdates();
  });
}

function AddInventory() {
  inquirer
    .prompt([
      {
        name: "ID",
        type: "input",
        message:
          "What is the item number of the item you would like to restock?"
      },
      {
        name: "Quantity",
        type: "input",
        message: "What is the quantity you would like to add?"
      }
    ])
    .then(function(answers) {
      var quantityAdded = answers.Quantity;
      var IDOfProduct = answers.ID;
      connection.query(
        "SELECT * FROM Products WHERE item_id = " + IDOfProduct,
        function(err, res) {
          if (err) {
            console.log(err);
          }

          connection.query(
            "UPDATE Products SET stock_quantity ='" +
              (res[0].stock_quantity + parseInt(answers.Quantity)) +
              "' WHERE item_id =" +
              IDOfProduct
          );
          console.log("\n");
          console.log("Stock Updated");
          console.log("-----------------------------------------------");
          inquirerForUpdates();
        }
      );
    });
}

function NewProduct() {
  inquirer
    .prompt([
      {
        name: "Name",
        type: "input",
        message: "What is name of product you would like to stock?"
      },
      {
        name: "Category",
        type: "input",
        message: "What is the category for product?"
      },
      {
        name: "Price",
        type: "input",
        message: "What is the price for item?"
      },
      {
        name: "Quantity",
        type: "input",
        message: "What is the quantity you would like to add?"
      }
    ])
    .then(function(ans) {
      connection.query(
        "INSERT INTO Products SET ?",
        {
          product_name: ans.Name,
          department_name: ans.Category,
          price: ans.Price,
          stock_quantity: ans.Quantity
        },
        function(err, res) {
          if (err) throw err;
          console.log("\n");
          console.log("The item was added to the store.");
          console.log("--------------------------------------------");
          inquirerForUpdates();
        }
      );
    });
}
