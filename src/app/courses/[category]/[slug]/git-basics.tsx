export const lessons = [
  {
    title: "Introduction to Version Control",
    content: [
      {
        type: "text",
        text: "Learn the fundamentals of version control systems and why they're essential for modern development."
      },
      {
        type: "video",
        url: "https://www.youtube.com/embed/2ReR1YJrNOM"
      }
    ]
  },
  {
    title: "Installing Git",
    content: [
      {
        type: "text",
        text: "Step-by-step guide to installing Git on Windows, macOS, and Linux:"
      },
      {
        type: "code",
        language: "bash",
        code: "# For Ubuntu/Debian\nsudo apt-get install git\n\n# For MacOS using Homebrew\nbrew install git"
      }
    ]
  },
  {
    title: "Basic Git Commands",
    content: [
      {
        type: "text",
        text: "Essential commands to get started:"
      },
      {
        type: "code",
        language: "bash",
        code: "git init          # Initialize new repository\ngit add .         # Stage all changes\ngit commit -m 'Initial commit'\ngit status        # Check repository status"
      }
    ]
  },
  {
    title: "Branching and Merging",
    content: [
      {
        type: "text",
        text: "Master the power of branching:"
      },
      {
        type: "code",
        language: "bash",
        code: "git branch new-feature  # Create new branch\ngit checkout new-feature  # Switch branches\n# Make changes then...\ngit checkout main\ngit merge new-feature"
      }
    ]
  }
];

export const courseInfo = {
  title: "Git Essentials",
  description: "Master version control with Git and GitHub basics",
  duration: "2 weeks",
  instructor: {
    name: "Sarah Chen",
    expertise: ["Version Control", "Git", "Software Development"]
  },
  syllabus: [
    "Understanding Version Control",
    "Git Installation & Configuration",
    "Basic Git Workflow",
    "Branching Strategies",
    "Collaborating with GitHub",
    "Resolving Merge Conflicts"
  ]
};
