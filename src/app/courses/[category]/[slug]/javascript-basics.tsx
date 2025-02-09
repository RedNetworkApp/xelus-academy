export const lessons = [
  {
    title: "JavaScript Essentials",
      content: [
        {
          type: 'text' as const,
          text: 'Introduction to JavaScript fundamentals...'
        },
        {
          type: 'video' as const,
          url: '/videos/js-basics-intro.mp4',
          duration: '15:30'
        }
      ]
  }
];

export const courseInfo = {
  title: "JavaScript Basics",
  description: "Master core JavaScript programming concepts",
  duration: "2 weeks",
  instructor: {
    name: "Michael Johnson",
    expertise: ["JavaScript", "ES6+", "Web Development"]
  },
  syllabus: [
    "Variables & Data Types",
    "Functions & Scope",
    "DOM Manipulation",
    "ES6 Features",
    "Error Handling"
  ],
  features: [
    "Interactive coding challenges",
    "Real-world projects",
    "Modern ES6+ syntax",
    "Browser API exercises",
    "Debugging techniques"
  ]
};
