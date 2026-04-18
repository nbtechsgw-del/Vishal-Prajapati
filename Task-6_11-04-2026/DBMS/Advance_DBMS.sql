USE softgowaytech;

CREATE TABLE Students(
	student_id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    department_id INT
);

INSERT INTO Students VALUES
(1, 'Vishal', 21, 1),
(2, 'Amit', 22, 1),
(3, 'Sneha', 20, 2),
(4, 'Riya', 23, 3),
(5, 'Karan', 21, NULL);

CREATE TABLE Departments(
	department_id INT PRIMARY KEY,
    department_name VARCHAR(50)
);

INSERT INTO Departments VALUES
(1, 'Computer Science'),
(2, 'Mechanical'),
(3, 'Electrical'),
(4, 'Civil');

CREATE TABLE Courses(
	course_id INT PRIMARY KEY,
    course_name VARCHAR(50),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

INSERT INTO Courses VALUES
(101, 'DBMS', 1),
(102, 'Operating Systems', 1),
(103, 'Thermodynamics', 2),
(104, 'Circuits', 3),
(105, 'Structures', 4);

CREATE TABLE Enrollments(
	enrollment_id INT PRIMARY KEY,
    student_id INT,
    course_id INT,
    grade VARCHAR(5),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id)
);

INSERT INTO Enrollments VALUES
(1, 1, 101, 9.0),
(2, 1, 102, 8.5),
(3, 2, 101, 7.5),
(4, 2, 102, 8.0),
(5, 3, 103, 6.5),
(6, 4, 104, 9.5);

CREATE TABLE Professors (
    professor_id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

INSERT INTO Professors VALUES
(1, 'Dr. Sharma', 1),
(2, 'Dr. Mehta', 2),
(3, 'Dr. Rao', 3),
(4, 'Dr. Khan', 1);

CREATE TABLE CourseAssignments (
    assignment_id INT PRIMARY KEY,
    course_id INT,
    professor_id INT,
    semester VARCHAR(20),
    FOREIGN KEY (course_id) REFERENCES Courses(course_id),
    FOREIGN KEY (professor_id) REFERENCES Professors(professor_id)
);

INSERT INTO CourseAssignments VALUES
(1, 101, 1, 'Sem1'),
(2, 102, 4, 'Sem1'),
(3, 103, 2, 'Sem1'),
(4, 104, 3, 'Sem1');

-- 🔹 Section 1: Joins and Aggregations

-- Q1. List all students along with their enrolled course names and grades. If a student isn’t enrolled in any course, still include their name.
SELECT s.name AS Student_Name, c.Course_name, e.Grade FROM Students s
LEFT JOIN Enrollments e
ON s.student_id = e.student_id
LEFT JOIN Courses c
ON e.course_id = c.course_id;

-- Q2. Display the number of students in each department. Include departments with zero students.
SELECT d.Department_name, COUNT(s.student_id) AS Total_Students FROM Departments d
LEFT JOIN Students s
ON d.department_id = s.department_id
GROUP BY d.department_name; 

-- Q3. Find the average grade in each course and list courses with an average grade higher than 8.0.
SELECT c.Course_name, AVG(e.Grade) AS Avg_Grade FROM Courses c
LEFT JOIN Enrollments e
ON c.course_id = e.course_id
GROUP BY c.Course_name
HAVING Avg_Grade > 8.0;

-- Q4. List professors along with the number of courses they have taught.
SELECT p.name AS Professor_name, COUNT(ca.course_id) AS Courses_taught FROM Professors p
LEFT JOIN CourseAssignments ca
ON p.professor_id = ca.professor_id
GROUP BY Professor_name;

-- 🔹 Section 2: Subqueries and Correlated Queries

-- Q5. Find students who have scored above the average grade in every course they’re enrolled in.
SELECT s.student_id, s.name
FROM Students s
WHERE NOT EXISTS (
    SELECT 1
    FROM Enrollments e
    WHERE e.student_id = s.student_id
    AND e.grade <= (
        SELECT AVG(e2.grade)
        FROM Enrollments e2
        WHERE e2.course_id = e.course_id
    )
);

-- Q6. List students who are enrolled in all courses offered by their department.
SELECT s.student_id, s.name
FROM Students s
WHERE NOT EXISTS (
    SELECT c.course_id
    FROM Courses c
    WHERE c.department_id = s.department_id
    AND NOT EXISTS (
        SELECT 1
        FROM Enrollments e
        WHERE e.student_id = s.student_id
        AND e.course_id = c.course_id
    )
);

-- Q7. List courses that have never been taken by any student.
SELECT c.course_id, c.course_name
FROM Courses c
WHERE NOT EXISTS (
    SELECT 1
    FROM Enrollments e
    WHERE e.course_id = c.course_id
);

-- Q8. Find departments where no students are enrolled, but at least one course is offered.
SELECT d.department_id, d.department_name
FROM Departments d
WHERE NOT EXISTS (
    SELECT 1
    FROM Students s
    WHERE s.department_id = d.department_id
)
AND EXISTS (
    SELECT 1
    FROM Courses c
    WHERE c.department_id = d.department_id
);

-- 🔹 Section 3: Window Functions & Ranking

-- Q9. Rank students within each course based on their grade (highest to lowest). Include course name, student name, grade, and rank.
SELECT c.course_name, s.name, e.grade, 
	RANK() OVER(
		PARTITION BY c.course_id
        ORDER BY e.grade DESC
    ) AS rank_in_course
FROM Enrollments e
JOIN Students s 
ON e.student_id = s.student_id
JOIN Courses c 
ON e.course_id = c.course_id;

-- Q10. For each student, show their highest grade, lowest grade, and average grade across all courses.
SELECT DISTINCT s.student_id, s.name,
MAX(e.grade) OVER (PARTITION BY s.student_id) AS Highest_Grade,
MIN(e.grade) OVER (PARTITION BY s.student_id) AS Lowest_Grade,
AVG(e.grade) OVER (PARTITION BY s.student_id) AS Avg_Grade
FROM Students s
JOIN Enrollments e
ON s.student_id = e.student_id;

-- 🔹 Section 4: Common Table Expressions (CTEs)

-- Q11. Using a CTE, list the top 3 students (by average grade) in each department.
WITH StudentAvg AS (
	SELECT s.student_id, s.name, s.department_id ,AVG(e.grade) AS AvgGrade FROM Students s
    JOIN Enrollments e 
	ON s.student_id = e.student_id
    GROUP BY s.student_id, s.name, s.department_id
),
RankedStudent AS (
	SELECT *, RANK() OVER (PARTITION BY department_id ORDER BY AvgGrade DESC) AS rank_in_dep FROM StudentAvg
)
SELECT * FROM RankedStudent;

-- Q12. Write a recursive CTE to simulate course prerequisites (e.g., if course A requires B, and B requires C, list full prerequisite chains). 
-- (Only applicable if you add a table like CoursePrerequisites(course_id, prerequisite_id).)
CREATE TABLE CoursePrerequisites (
    course_id INT,
    prerequisite_id INT
);

WITH RECURSIVE PrereqChain AS (
	SELECT course_id, prerequisite_id FROM CoursePrerequisites
    UNION ALL
    SELECT pc.course_id, cp.prerequisite_id FROM PrereqChain AS pc
    JOIN CoursePrerequisites cp
    ON pc.prerequisite_id = cp.course_id
) 
SELECT * FROM PrereqChain;

-- 🔹 Section 5: Views and Indexing

-- Q13. Create a view named StudentCoursePerformance showing student name, course name, grade, and department name.
CREATE VIEW StudentCoursePerformance AS
SELECT s.name AS student_name, c.course_name, e.grade, d.department_name FROM Students s
JOIN Enrollments e 
    ON s.student_id = e.student_id
JOIN Courses c 
    ON e.course_id = c.course_id
JOIN Departments d 
    ON s.department_id = d.department_id;

-- Q14. Create an index to optimize queries filtering on student_id and course_id in the Enrollments table.
CREATE INDEX idx_student_course
ON Enrollments(student_id, course_id);

-- 🔹 Section 6: Transactions and Constraints

-- Q15. Write a transaction to:
	-- Transfer a student from one department to another.
	-- Update their enrollments if necessary.
	-- Rollback if any part fails.
START TRANSACTION;

UPDATE Students
SET department_id = 2
WHERE student_id = 1;

COMMIT;

ROLLBACK;

-- Q16. Write a query to detect any grades above 10 or below 0 in the Enrollments table.
SELECT * FROM Enrollments
WHERE grade > 10 OR grade < 0;

-- 🔹 Section 7: Real-Life Scenarios

-- Q17. List students who share all the same courses as another student. (Ex: Student A and B have identical course enrollments.)
SELECT s1.student_id, s1.name, s2.student_id, s2.name
FROM Students s1
JOIN Students s2 
    ON s1.student_id < s2.student_id
WHERE NOT EXISTS (
    SELECT course_id 
    FROM Enrollments e1
    WHERE e1.student_id = s1.student_id
    AND course_id NOT IN (
        SELECT course_id 
        FROM Enrollments e2
        WHERE e2.student_id = s2.student_id
    )
)
AND NOT EXISTS (
    SELECT course_id 
    FROM Enrollments e2
    WHERE e2.student_id = s2.student_id
    AND course_id NOT IN (
        SELECT course_id 
        FROM Enrollments e1
        WHERE e1.student_id = s1.student_id
    )
);

-- Q18. Find the course(s) that have been taught by every professor in a given department.
SELECT c.course_id, c.course_name
FROM Courses c
WHERE NOT EXISTS (
    SELECT p.professor_id
    FROM Professors p
    WHERE p.department_id = c.department_id
    AND NOT EXISTS (
        SELECT 1
        FROM CourseAssignments ca
        WHERE ca.course_id = c.course_id
        AND ca.professor_id = p.professor_id
    )
);

-- Q19. Find professors who have never taught a course in their own department.
SELECT p.professor_id, p.name
FROM Professors p
WHERE NOT EXISTS (
    SELECT 1
    FROM CourseAssignments ca
    JOIN Courses c 
        ON ca.course_id = c.course_id
    WHERE ca.professor_id = p.professor_id
    AND c.department_id = p.department_id
);

-- Q20. List the students whose average grade is in the top 10% of all students.
WITH StudentAvg AS (
    SELECT 
        s.student_id,
        s.name,
        AVG(e.grade) AS avg_grade
    FROM Students s
    JOIN Enrollments e 
        ON s.student_id = e.student_id
    GROUP BY s.student_id, s.name
),
Ranked AS (
    SELECT *,
           NTILE(10) OVER (ORDER BY avg_grade DESC) AS percentile_group
    FROM StudentAvg
)
SELECT *
FROM Ranked
WHERE percentile_group = 1;