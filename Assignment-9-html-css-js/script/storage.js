const STORAGE_KEY = "localdata";

export const state = {
  theme: "light",
  username: "Atharv",

  tasks: [
    {
      id: 1,
      title: "Complete Portfolio Website",
      description:
        "Finish the responsive homepage, add project cards, optimize images, and deploy the website.",
      status: "In Progress",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Practice JavaScript",
      description: "Solve 5 DOM manipulation problems and review ES6 concepts.",
      status: "Completed",
      isCompleted: true,
    },
    {
      id: 3,
      title: "Workout",
      description:
        "Complete a 45-minute strength training session and stretching.",
      status: "Pending",
      isCompleted: false,
    },
    {
      id: 4,
      title: "Read a Book",
      description: "Read 30 pages of 'Atomic Habits' before bedtime.",
      status: "Pending",
      isCompleted: false,
    },
  ],

  goals: [
    {
      id: 1,
      title: "Become a Full Stack Developer",
      description:
        "Master HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB while building real-world projects.",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Get an Internship",
      description:
        "Build a strong portfolio, polish resume, and apply to software development internships.",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Improve Fitness",
      description:
        "Exercise at least 5 days a week and maintain a healthy diet.",
      status: "Pending",
    },
  ],

  dailyPlans: [],

  quotes: [
    {
      id: 1,
      text: "Success is the sum of small efforts, repeated day in and day out.",
      author: "Robert Collier",
    },
    {
      id: 2,
      text: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
    },
    {
      id: 3,
      text: "Discipline is choosing between what you want now and what you want most.",
      author: "Abraham Lincoln",
    },
    {
      id: 4,
      text: "Your only limit is the one you set yourself.",
      author: "Unknown",
    },
  ],
};

export function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    Object.assign(state, JSON.parse(saved));
  } else {
    state.theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
}

export function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

loadState();
