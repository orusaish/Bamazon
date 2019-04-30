# BAMazon

It is an Amazon-like storefront with the MySQL and Node.js .

## Getting Started

- Clone repo.
- Run command in Terminal or Gitbash 'npm install'
- Run command depending which mode you would like to be on:
  - Customer - 'node bamazonCustomer.js'
  - Manager - 'node bamazonManager.js'

### What Each JavaScript Does

1. `BamazonCustomer.js`

   - Prints the products in the store.

   - Prompts customer which product they would like to purchase by ID number.

   - Asks for the quantity.

     - If there is a sufficient amount of the product in stock, it will return the total for that purchase.
     - However, if there is not enough of the product in stock, it will tell the user that there isn't enough of the product.
     - If the purchase goes through, it updates the stock quantity to reflect the purchase.

---

2. `BamazonManager.js`

   - Starts with a menu:

     - View Products for Sale
     - View Low Inventory
     - Add to Inventory
     - Add New Product
     - Exit

   - If the manager selects `View Products for Sale`, It lists all of the products in the store including all of their details.

   - If the manager selects `View Low Inventory`, It'll list all the products with less than five items in its Stock_quantity column.

   - If the manager selects `Add to Inventory`, it allows the manager to select a product and add inventory.

   - If the manager selects `Add New Product`, it allows the manager to add a new product to the store.

   - If the manager selects `Exit`, it ends the session and doesn't go back to the menu.

---

## Preview

- BamazonCustomer.js

<img width="571" alt="BC1" src="https://user-images.githubusercontent.com/46056178/56976616-60a54180-6b41-11e9-881e-b4b399561a68.png">
<img width="567" alt="BC2" src="https://user-images.githubusercontent.com/46056178/56976658-79155c00-6b41-11e9-80bc-b4b79bd1f6e3.png">

- BamazonManager.js

<img width="571" alt="BC1" src="https://user-images.githubusercontent.com/46056178/56976616-60a54180-6b41-11e9-881e-b4b399561a68.png">
<img width="567" alt="BC2" src="https://user-images.githubusercontent.com/46056178/56976658-79155c00-6b41-11e9-80bc-b4b79bd1f6e3.png">
<img width="572" alt="BM3" src="https://user-images.githubusercontent.com/46056178/56978129-ce06a180-6b44-11e9-80a0-178895da1fa2.png">
<img width="586" alt="BM4" src="https://user-images.githubusercontent.com/46056178/56978139-d2cb5580-6b44-11e9-8fd7-aab74d20895b.png">

## Technologies used

- Node.js
- Inquire NPM Package (https://www.npmjs.com/package/inquirer)
- MYSQL NPM Package (https://www.npmjs.com/package/mysql)
- cli-table Npm Package (https://www.npmjs.com/package/cli-table)

### Prerequisites

```
- Node.js - Download the latest version of Node https://nodejs.org/en/
- Create a MYSQL database called 'Bamazon', reference Bamazon.sql
```

## Built With

- MySQLWorkbench
- Terminal/Gitbash
