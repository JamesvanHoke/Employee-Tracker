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
("Accountant", 160000, 5),
("Regional Manager", 130000, 6),
("Lead Developer", 120000, 3),
("Sales Lead", 70000, 1),
("Social Media Manager", 25000, 4),
("HR Rep", 61000, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
("Lucian", "Beil", 2),
("Eva", "Wood", 6),
("Teagan", "Mercado", 5),
("Julien", "Searle", 4),
("Arianna", "Thomas", 3),
("Tomi", "Reyna", 1);