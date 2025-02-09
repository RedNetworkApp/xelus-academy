export const lessons = [
  {
    title: "Database Concepts",
    content: [
      {
        type: "text",
        text: "Understand relational and non-relational database systems"
      },
      {
        type: "code",
        language: "sql",
        code: "CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(50),\n  email VARCHAR(100) UNIQUE\n);"
      }
    ]
  }
];

export const courseInfo = {
  title: "Database Fundamentals",
  description: "Master database design and management",
  duration: "2 weeks",
  instructor: {
    name: "James Wilson",
    expertise: ["SQL", "NoSQL", "Database Architecture"]
  },
  syllabus: [
    "Relational Databases",
    "SQL Queries",
    "Database Normalization",
    "NoSQL Concepts",
    "MongoDB Basics"
  ],
  features: [
    "Interactive SQL exercises",
    "Real-world schema design",
    "Query optimization",
    "ACID vs BASE",
    "Database security"
  ]
};
