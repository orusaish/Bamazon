-- Create a database called 'Bamazon' and switch into it for this activity --
-- Drop database if it already exhists--
DROP DATABASE Bamazon;
CREATE DATABASE Bamazon;
USE Bamazon;

-- Create a table called 'products' which will contain the store inventory --
CREATE TABLE products
(
    item_id INTEGER(11)
    AUTO_INCREMENT NOT NULL,
	product_name VARCHAR
    (30) NOT NULL,
	department_name VARCHAR
    (20) NOT NULL,
	price DECIMAL
    (10,2) NOT NULL,
	stock_quantity INTEGER
    (11) NOT NULL,
	PRIMARY KEY
    (item_id)
);
    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ('Head and shoulder Shampoo', 'Cosmetics', 5.75, 500),
        ('Dove Conditioner', 'Cosmetics', 6.25, 627),
        ('Nature valley nutition bar', 'Grocery', 5.99, 300),
        ('No name Paper Towels', 'Grocery', 4.25, 400),
        ('Fuji Apples', 'Produce', 1.25, 800),
        ('Bannana', 'Produce', 0.90, 10000),
        ('Oasis Mango  Juice', 'Grocery', 4.45, 267),
        ('Lactantia Milk', 'Grocery', 4.50, 200),
        ('Pampers Diapers', 'Children', 12.75, 476),
        ('Charmin Toiler Paper', 'Grocery', 12.99, 575),
        ('Pampers Baby Wipes', 'Children', 5.50, 423),
        ('Ibuprophen', 'Pharmacy', 4.95, 389),
        ('Band Aid', 'Pharmacy', 3.25, 550),
        ('Nestle Ice Cream', 'Grocery', 3.25, 432),
        ('Tylenol', 'Pharmacy', 3.25, 5);