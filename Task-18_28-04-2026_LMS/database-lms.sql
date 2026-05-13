DROP DATABASE lms;
CREATE DATABASE lms;

USE lms;

SHOW TABLES;

SELECT * FROM books;

DESC users;

INSERT INTO books (title, author, description, image_url, status, created_at, updated_at)
VALUES
('The Alchemist', 'Paulo Coelho',
'A philosophical novel about a shepherd named Santiago who travels in search of treasure and discovers his destiny.',
'https://source.unsplash.com/400x600/?book,alchemist',
'available', NOW(), NOW()),

('Atomic Habits', 'James Clear',
'A practical guide on building good habits and breaking bad ones using small daily improvements.',
'https://source.unsplash.com/400x600/?book,habits',
'available', NOW(), NOW()),

('Rich Dad Poor Dad', 'Robert T. Kiyosaki',
'Focuses on financial education and the difference between working for money and making money work for you.',
'https://source.unsplash.com/400x600/?book,money',
'available', NOW(), NOW()),

('The Psychology of Money', 'Morgan Housel',
'Explains how human behavior and emotions influence financial decisions.',
'https://source.unsplash.com/400x600/?book,finance',
'available', NOW(), NOW()),

('Clean Code', 'Robert C. Martin',
'A must-read for developers about writing clean, readable, and maintainable code.',
'https://source.unsplash.com/400x600/?programming,book',
'available', NOW(), NOW()),

('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling',
'A young wizard begins his journey at Hogwarts and discovers his magical destiny.',
'https://source.unsplash.com/400x600/?harrypotter,book',
'available', NOW(), NOW()),

('Ikigai', 'Héctor García & Francesc Miralles',
'Explores the Japanese concept of finding purpose and joy in life.',
'https://source.unsplash.com/400x600/?japan,book',
'available', NOW(), NOW()),

('Deep Work', 'Cal Newport',
'Teaches how to focus without distraction and produce high-quality work.',
'https://source.unsplash.com/400x600/?focus,book',
'available', NOW(), NOW());

INSERT INTO users (name, email, created_at, updated_at)
VALUES
('Vishal Prajapati', 'vishal.prajapati@gmail.com', NOW(), NOW()),
('Aman Verma', 'aman.verma@gmail.com', NOW(), NOW()),
('Riya Sharma', 'riya.sharma@gmail.com', NOW(), NOW()),
('Rahul Singh', 'rahul.singh@gmail.com', NOW(), NOW()),
('Neha Gupta', 'neha.gupta@gmail.com', NOW(), NOW()),
('Arjun Patel', 'arjun.patel@gmail.com', NOW(), NOW()),
('Sneha Kapoor', 'sneha.kapoor@gmail.com', NOW(), NOW());