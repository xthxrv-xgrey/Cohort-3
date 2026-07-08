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
    {
      id: 5,
      title: "Complete Portfolio Website",
      description:
        "Finish the responsive homepage, add project cards, optimize images, and deploy the website.",
      status: "In Progress",
      isCompleted: false,
    },
    {
      id: 6,
      title: "Practice JavaScript",
      description: "Solve 5 DOM manipulation problems and review ES6 concepts.",
      status: "Completed",
      isCompleted: true,
    },
    {
      id: 7,
      title: "Workout",
      description:
        "Complete a 45-minute strength training session and stretching.",
      status: "Pending",
      isCompleted: false,
    },
    {
      id: 8,
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
    {
      id: 4,
      title: "Become a Full Stack Developer",
      description:
        "Master HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB while building real-world projects.",
      status: "In Progress",
    },
    {
      id: 5,
      title: "Get an Internship",
      description:
        "Build a strong portfolio, polish resume, and apply to software development internships.",
      status: "In Progress",
    },
    {
      id: 6,
      title: "Improve Fitness",
      description:
        "Exercise at least 5 days a week and maintain a healthy diet.",
      status: "Pending",
    },
  ],

  dailyPlans: [
    {
      date: "2026-07-06",
      notes: "Finish pending college work and revise JavaScript array methods.",
      tasks: [
        {
          id: 1,
          time: "06:00",
          title: "Wake Up",
          description: "Drink water and freshen up",
          icon: "ri-sun-line",
        },
        {
          id: 2,
          time: "06:30",
          title: "Morning Walk",
          description: "30 minutes brisk walk",
          icon: "ri-walk-line",
        },
        {
          id: 3,
          time: "08:00",
          title: "Breakfast",
          description: "Healthy breakfast with fruits",
          icon: "ri-restaurant-line",
        },
        {
          id: 4,
          time: "10:00",
          title: "College Assignment",
          description: "Complete DBMS assignment",
          icon: "ri-book-open-line",
        },
        {
          id: 5,
          time: "15:30",
          title: "JavaScript Practice",
          description: "Solve 5 DOM questions",
          icon: "ri-code-s-slash-line",
        },
        {
          id: 6,
          time: "22:30",
          title: "Sleep",
          description: "Get at least 8 hours of sleep",
          icon: "ri-moon-clear-line",
        },
      ],
    },

    {
      date: "2026-07-07",
      notes:
        "Need to call Rahul regarding project submission and buy groceries.",
      tasks: [
        {
          id: 7,
          time: "06:15",
          title: "Wake Up",
          description: "Morning routine",
          icon: "ri-sun-line",
        },
        {
          id: 8,
          time: "07:00",
          title: "Workout",
          description: "Strength training",
          icon: "ri-heart-pulse-line",
        },
        {
          id: 9,
          time: "09:30",
          title: "Team Meeting",
          description: "Discuss portfolio features",
          icon: "ri-team-line",
        },
        {
          id: 10,
          time: "13:00",
          title: "Lunch",
          description: "Lunch break",
          icon: "ri-restaurant-line",
        },
        {
          id: 11,
          time: "17:00",
          title: "Buy Groceries",
          description: "Milk, Eggs, Bread, Fruits",
          icon: "ri-shopping-cart-line",
        },
        {
          id: 12,
          time: "20:00",
          title: "Read Book",
          description: "Read 30 pages of Atomic Habits",
          icon: "ri-book-line",
        },
      ],
    },

    {
      date: "2026-07-08",
      notes:
        "Focus on portfolio UI today. Don't forget to push changes to GitHub.",
      tasks: [
        {
          id: 13,
          time: "06:00",
          title: "Wake Up",
          description: "Hydrate and freshen up",
          icon: "ri-sun-line",
        },
        {
          id: 14,
          time: "07:00",
          title: "Meditation",
          description: "15 minutes mindfulness",
          icon: "ri-mental-health-line",
        },
        {
          id: 15,
          time: "08:30",
          title: "Workout",
          description: "45 mins strength training",
          icon: "ri-heart-pulse-line",
        },
        {
          id: 16,
          time: "10:00",
          title: "Portfolio Development",
          description: "Complete Daily Planner module",
          icon: "ri-code-box-line",
        },
        {
          id: 17,
          time: "14:00",
          title: "Debug Project",
          description: "Fix localStorage issues",
          icon: "ri-bug-line",
        },
        {
          id: 18,
          time: "18:30",
          title: "GitHub Push",
          description: "Commit and push latest code",
          icon: "ri-github-fill",
        },
        {
          id: 19,
          time: "21:30",
          title: "Watch Tutorial",
          description: "Learn advanced CSS animations",
          icon: "ri-play-circle-line",
        },
      ],
    },

    {
      date: "2026-07-09",
      notes: "",
      tasks: [
        {
          id: 20,
          time: "07:00",
          title: "Wake Up",
          description: "Morning routine",
          icon: "ri-sun-line",
        },
        {
          id: 21,
          time: "09:00",
          title: "Interview Preparation",
          description: "Practice DSA questions",
          icon: "ri-briefcase-line",
        },
        {
          id: 22,
          time: "12:00",
          title: "Lunch",
          description: "Lunch with friends",
          icon: "ri-restaurant-line",
        },
        {
          id: 23,
          time: "16:00",
          title: "React Project",
          description: "Build authentication page",
          icon: "ri-reactjs-line",
        },
        {
          id: 24,
          time: "19:30",
          title: "Cycling",
          description: "Ride for 10 km",
          icon: "ri-bike-line",
        },
      ],
    },

    {
      date: "2026-07-10",
      notes: "Weekend starts tomorrow. Finish important work before evening.",
      tasks: [
        {
          id: 25,
          time: "06:30",
          title: "Wake Up",
          description: "Morning routine",
          icon: "ri-sun-line",
        },
        {
          id: 26,
          time: "08:00",
          title: "Breakfast",
          description: "Healthy breakfast",
          icon: "ri-restaurant-line",
        },
        {
          id: 27,
          time: "11:00",
          title: "Client Call",
          description: "Discuss UI changes",
          icon: "ri-phone-line",
        },
        {
          id: 28,
          time: "15:00",
          title: "Code Review",
          description: "Review teammates' pull requests",
          icon: "ri-git-pull-request-line",
        },
        {
          id: 29,
          time: "18:00",
          title: "Movie Night",
          description: "Watch a sci-fi movie",
          icon: "ri-film-line",
        },
        {
          id: 30,
          time: "22:00",
          title: "Sleep",
          description: "End of the day",
          icon: "ri-moon-clear-line",
        },
      ],
    },
  ],

  pomodoro: {
    duration: 25 * 60, // Total session time (seconds)
    remaining: 25 * 60, // Remaining time (seconds)
    isRunning: false,
    mode: "focus", // focus | shortBreak | longBreak

    sessionsCompleted: 0,

    settings: {
      focus: 25, // minutes
      shortBreak: 5, // minutes
      longBreak: 15, // minutes
      longBreakAfter: 4, // After every 4 focus sessions
      autoStartBreak: false,
      autoStartFocus: false,
    },
  },

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
    {
      id: 5,
      text: "Success is the sum of small efforts, repeated day in and day out.",
      author: "Robert Collier",
    },
    {
      id: 6,
      text: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
    },
    {
      id: 7,
      text: "Discipline is choosing between what you want now and what you want most.",
      author: "Abraham Lincoln",
    },
    {
      id: 8,
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
