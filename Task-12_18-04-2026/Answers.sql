SHOW DATABASES;

USE softgowaytech;

-- Assignment 1: Basic Queries

CREATE TABLE employeest(
	id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary INT,
    joining_date DATE
);

INSERT INTO employeest VALUES
(1, 'Vishal', 'Sales', 60000, '2023-01-10'),
(2, 'Amit', 'HR', 45000, '2022-03-15'),
(3, 'Sneha', 'IT', 75000, '2021-07-20'),
(4, 'Rahul', 'Sales', 52000, '2020-11-05'),
(5, 'Priya', 'IT', 80000, '2022-06-25'),
(6, 'Neha', 'HR', 48000, '2023-02-14'),
(7, 'Arjun', 'Sales', 55000, '2021-09-18'),
(8, 'Kiran', 'IT', 90000, '2020-01-30'),
(9, 'Ravi', 'HR', 40000, '2022-12-01'),
(10, 'Pooja', 'Sales', 62000, '2023-04-12');

-- Retrieve all employees from the "Sales" department 
SELECT * FROM employeest
WHERE department = 'Sales';

-- Find employees with salary greater than 50,000 
SELECT * FROM employeest
WHERE salary > 50000;

-- Display employees sorted by salary (highest first) 
SELECT * FROM employeest
ORDER BY salary DESC;

-- Show only names and joining dates of employees 
SELECT name, joining_date FROM employeest;

-- Assignment 2: Filtering & Aggregation

-- Count total number of employees in each department 
SELECT department, COUNT(*) AS total FROM employees
GROUP BY department;

-- Find average salary per department 
SELECT department, AVG(salary) AS avg_salary FROM employeest
GROUP BY department;

-- Get the highest salary in each department 
SELECT department, MAX(salary) AS highest_salary FROM employeest
GROUP BY department;

-- List departments having more than 5 employees 
SELECT department, COUNT(*) AS total_employees FROM employeest
GROUP BY department
HAVING COUNT(*) > 5;

--  Assignment 3: Joins

CREATE TABLE departmentst (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50)
);

INSERT INTO departmentst VALUES
(1, 'Sales'),
(2, 'HR'),
(3, 'IT'),
(4, 'Finance');

CREATE TABLE emp_dept (
    emp_id INT,
    name VARCHAR(50),
    dept_id INT
);

INSERT INTO emp_dept VALUES
(1, 'Vishal', 1),
(2, 'Amit', 2),
(3, 'Sneha', 3),
(4, 'Rahul', 1),
(5, 'Priya', 3),
(6, 'Neha', 2),
(7, 'Arjun', NULL);

-- Display employee names with their department names 
SELECT e.name, d.dept_name FROM emp_dept AS e
JOIN departmentst d
ON e.dept_id = d.dept_id;

-- Find employees who are not assigned to any department 
SELECT * FROM emp_dept 
WHERE dept_id IS NULL;

-- List all departments and their employees (even if no employees exist) 
SELECT d.dept_name, e.name FROM departmentst d
LEFT JOIN emp_dept e ON d.dept_id = e.dept_id;

-- Assignment 4: Subqueries

-- Find employees earning more than the average salary 
SELECT * FROM employeest
WHERE salary > (SELECT AVG(salary) FROM employeest);

-- Get the second highest salary 
SELECT MAX(salary) AS highest_salary FROM employeest
WHERE salary < (SELECT MAX(salary) FROM employeest);

-- List employees who earn the highest salary in their department 
SELECT * FROM employeest e
WHERE salary = (
	SELECT MAX(salary) FROM employeest
	WHERE department = e.department
);

-- Assignment 5: Data Manipulation

CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    price INT,
    stock INT
);

-- Insert 5 sample records 

INSERT INTO products VALUES
(1, 'Laptop', 50000, 10),
(2, 'Phone', 20000, 0),
(3, 'Tablet', 30000, 5),
(4, 'Headphones', 2000, 15),
(5, 'Mouse', 500, 0);

-- Update price of a product
UPDATE products
SET price = 55000
WHERE id = 1;

SET SQL_SAFE_UPDATES = 0;
 
-- Delete products with zero stock 
DELETE FROM products
WHERE stock = 0;

-- Increase price by 10% for all products 
UPDATE products
SET price = price * 1.10;

-- Assignment 6: Real-World Scenario

CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(50)
);

INSERT INTO customers VALUES
(1, 'Vishal'),
(2, 'Amit'),
(3, 'Sneha'),
(4, 'Rahul');

CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    amount INT,
    order_date DATE
);

INSERT INTO orders VALUES
(1, 1, 1000, '2024-01-10'),
(2, 1, 2000, '2024-02-15'),
(3, 2, 1500, '2024-02-20'),
(4, 3, 3000, '2024-03-05');

-- Find total amount spent by each customer 
SELECT c.name, SUM(o.amount) AS total_spent FROM customers c
JOIN orders o 
ON c.id = o.customer_id
GROUP BY c.name;

-- Get top 3 customers by spending 
SELECT c.name, SUM(o.amount) AS total FROM customers c
JOIN orders o 
ON c.id = o.customer_id
GROUP BY c.name
ORDER BY total DESC
LIMIT 3;

-- Find customers who never placed orders 
SELECT c.name FROM customers c
LEFT JOIN orders o 
ON c.id = o.customer_id
WHERE o.id IS NULL;

-- Calculate monthly revenue 
SELECT MONTH(order_date) AS month, SUM(amount) AS revenue FROM orders
GROUP BY MONTH(order_date);

-- Advanced
-- Goal: Think like a backend engineer

-- Write a query to remove duplicate records 
DELETE FROM employeest
WHERE id NOT IN (
    SELECT MIN(id)
    FROM employees
    GROUP BY name, department, salary
);

-- Create a view for top customers 
CREATE VIEW top_customers AS
SELECT c.name, SUM(o.amount) AS total FROM customers c
JOIN orders o 
ON c.id = o.customer_id
GROUP BY c.name
ORDER BY total DESC;

SELECT * FROM top_customers;

-- Use window functions to rank employees by salary 
SELECT name, salary,
RANK() OVER (ORDER BY salary DESC) AS rank_
FROM employeest;

-- Find running total of orders per day
SELECT order_date, SUM(amount) OVER (ORDER BY order_date) AS running_total
FROM orders;