CREATE DATABASE SoftGoWayTech;

USE SoftGoWayTech;

CREATE TABLE Employees(
	EmpID INT PRIMARY KEY,
    Name VARCHAR(50),
    Department VARCHAR(50),
    Salary INT,
    JoinDate DATE,
    City VARCHAR(50)
);

INSERT INTO Employees VALUES
(1, 'Rajesh', 'HR', 35000, '2020-01-15', 'Delhi'),
(2, 'Meena', 'IT', 50000, '2019-03-20', 'Mumbai'),
(3, 'Amit', 'Finance', 42000, '2021-07-12', 'Bangalore'),
(4, 'Neha', 'IT', 60000, '2018-11-30', 'Pune'),
(5, 'Rohan', 'HR', 30000, '2022-05-10', 'Delhi');

CREATE TABLE Departments(
	DeptID INT PRIMARY KEY,
    Department VARCHAR(50),
    Location VARCHAR(50)
);

INSERT INTO Departments VALUES
(101, 'HR', 'Delhi'),
(102, 'IT', 'Mumbai'),
(103, 'Finance', 'Bangalore');

-- Basic Queries

-- 1.Write a query to display all employees.
SELECT * FROM employees;

-- 2.Display name and salary of employees working in IT department.
SELECT Name, Salary FROM employees
WHERE department = 'IT';

-- 3.Show employees who joined after 2020-01-01.
SELECT * FROM employees
WHERE joindate > '2020-01-01';

-- 4.Find employees with salary greater than 40,000.
SELECT * FROM employees 
WHERE salary > 40000;

-- 5.Count total number of employees.
SELECT COUNT(*) AS TotalEmployees FROM employees;

-- Intermediate Queries

-- 6.Display employees in descending order of salary.
SELECT * FROM employees
ORDER BY salary DESC;

-- 7.Find the highest and lowest salary from Employees.
SELECT MAX(salary) AS HighestSalary, MIN(salary) AS LowestSalary FROM employees;

-- 8.Show average salary department-wise.
SELECT Department, AVG(salary) AS AvgSalary FROM employees
GROUP BY department;

-- 9.Find employees whose name starts with ‘R’.
SELECT * FROM employees
WHERE name LIKE 'R%';

-- 10.List employees working in Delhi or Mumbai.
SELECT * FROM Employees 
WHERE City IN ('Delhi', 'Mumbai');

-- Joins

-- 11.Write a query to display Employee Name, Department, and Department Location (use JOIN).
SELECT e.name AS Employee, e.department AS Department, d.location AS Location FROM employees e
JOIN departments d
ON e.department = d.department;

-- 12.Find employees whose department is Finance using JOIN.
SELECT e.* FROM employees e
JOIN departments d
ON e.department = d.department
WHERE d.department = 'finance';

-- Aggregates & Grouping

-- 13.Find total employees in each department.
SELECT Department, COUNT(*) AS TotalEmployees FROM employees
GROUP BY department;

-- 14.Show department having more than 1 employee.
SELECT Department, COUNT(*) AS TotalEmployees FROM employees
GROUP BY department
HAVING TotalEmployees > 1;

-- 15.Find department with the highest average salary.
SELECT Department, AVG(salary) as AvgSalary FROM employees
GROUP BY department
ORDER BY AvgSalary DESC
LIMIT 1;

-- 🔹 Advanced (for practice)

-- 16.Show the second highest salary from Employees.
SELECT MAX(salary) AS SecondHighestSalary FROM employees
WHERE Salary < (SELECT MAX(salary) FROM employees);

-- 17.Find employees who do not belong to any department (LEFT JOIN).
SELECT e.* FROM employees e
LEFT JOIN departments d
ON e.department = d.department
WHERE d.department IS NULL;

-- 18.List employees with salary between 30,000 and 50,000.
SELECT * FROM employees
WHERE salary BETWEEN 30000 AND 50000;

-- 19.Find employees who joined in the year 2021.
SELECT * FROM employees 
WHERE YEAR(joindate) = 2021;

-- 20.Display top 3 highest paid employees.
SELECT * FROM employees
ORDER BY salary DESC
LIMIT 3;