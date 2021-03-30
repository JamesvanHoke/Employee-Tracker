-- Only used for testing purposes
-- DROP DATABASE IF EXISTS employee_db;

-- Iniitializes our database
CREATE DATABASE employee_db;

-- Sets mySQL to work out of employee_db
USE employee_db;

-- Creates our department table and gives it 3 fields
CREATE TABLE department(
    -- Intiger, automatically goes up by one for each row created within the table
    id INT AUTO_INCREMENT NOT NULL,
    -- String
    dept_name VARCHAR(30),
    -- Sets ID to be the primary key, our identifier. PK's can not have duplicates within the same table
    PRIMARY KEY (id)
);

CREATE TABLE employeeRole(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    -- allows for non-whole numbers to be stored
    salary DECIMAL,
    PRIMARY KEY (id)
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);