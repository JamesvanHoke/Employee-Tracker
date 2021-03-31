INSERT INTO department (dept_name)
VALUES 
("Sales"),
("Human Resources"),
("R&D"),
("Marketing"),
("Finance"),
("Admin");

INSERT INTO employee_role (title, salary, department_id)
VALUES
("Senior Accountant", 200000, 5),
("Accountant", 160000, 5),
("Clerk", 30000, 5),
("Regional Manager", 130000, 6),
("District Manager", 95000, 6),
("Store Manager", 65000, 6),
("Lead Developer", 120000, 3),
("Senior Developer", 80000, 3),
("Junior Developer", 50000, 3),
("Sales Lead", 70000, 1),
("Sales Rep", 45000, 1),
("Social Media Manager", 25000, 4),
("HR Rep", 61000, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
("Tammy", "Hayworth", 1),
("Jessica", "Liu", 2),
("Mark", "Borman", 3),
("Lucy", "Short", 4),
("Eva", "Wood", 5),
("Teagan", "Mercado", 6),
("Julien", "Searle", 7),
("Arianna", "Thomas", 8),
("Tomi", "Reyna", 9);