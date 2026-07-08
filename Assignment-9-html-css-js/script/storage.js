const STORAGE_KEY = "localdata";

export const state = {
  theme: "emerge",
  username: "",

  tasks: [
    {
      id: 1,
      title: "Plan Your First Week",
      description:
        "Create a few tasks and organize your priorities to get started.",
      status: "In Progress",
      isCompleted: false,
    },
    {
      id: 2,
      title: "Explore Productivity Hub",
      description:
        "Browse Tasks, Goals, Daily Planner, Quotes, and the Pomodoro Timer.",
      status: "Completed",
      isCompleted: true,
    },
  ],

  goals: [
    {
      id: 1,
      title: "Build Better Habits",
      description:
        "Stay consistent by making small improvements every single day.",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Achieve Work-Life Balance",
      description:
        "Manage your time effectively while making room for rest and personal growth.",
      status: "Pending",
    },
  ],

  dailyPlans: [],

  pomodoro: {
    duration: 25 * 60,
    remaining: 25 * 60,
    isRunning: false,
    mode: "focus",

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
      text: "Do what you can, with what you have, where you are.",
      author: "Theodore Roosevelt",
    },
    {
      id: 4,
      text: "Dream big and dare to fail.",
      author: "Norman Vaughan",
    },
    {
      id: 5,
      text: "Action is the foundational key to all success.",
      author: "Pablo Picasso",
    },
    {
      id: 6,
      text: "Small progress is still progress.",
      author: "Unknown",
    },
    {
      id: 7,
      text: "Discipline is choosing what you want most over what you want now.",
      author: "Unknown",
    },
    {
      id: 8,
      text: "You don't have to be great to start, but you have to start to be great.",
      author: "Zig Ziglar",
    },
    {
      id: 9,
      text: "Focus on being productive instead of busy.",
      author: "Tim Ferriss",
    },
    {
      id: 10,
      text: "Great things never come from comfort zones.",
      author: "Unknown",
    },
    {
      id: 11,
      text: "Don't watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
    },
    {
      id: 12,
      text: "The future depends on what you do today.",
      author: "Mahatma Gandhi",
    },
    {
      id: 13,
      text: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    {
      id: 14,
      text: "Everything you can imagine is real.",
      author: "Pablo Picasso",
    },
    {
      id: 15,
      text: "Success usually comes to those who are too busy to be looking for it.",
      author: "Henry David Thoreau",
    },
    {
      id: 16,
      text: "Start where you are. Use what you have. Do what you can.",
      author: "Arthur Ashe",
    },
    {
      id: 17,
      text: "One day or day one. You decide.",
      author: "Unknown",
    },
    {
      id: 18,
      text: "Done is better than perfect.",
      author: "Sheryl Sandberg",
    },
    {
      id: 19,
      text: "Progress, not perfection.",
      author: "Unknown",
    },
    {
      id: 20,
      text: "Every accomplishment starts with the decision to try.",
      author: "John F. Kennedy",
    },
    {
      id: 21,
      text: "Stay patient and trust your journey.",
      author: "Unknown",
    },
    {
      id: 22,
      text: "Consistency beats intensity.",
      author: "Unknown",
    },
    {
      id: 23,
      text: "The secret of getting ahead is getting started.",
      author: "Mark Twain",
    },
    {
      id: 24,
      text: "Little by little, a little becomes a lot.",
      author: "Tanzanian Proverb",
    },
    {
      id: 25,
      text: "Keep going. Everything you need will come to you.",
      author: "Unknown",
    },
    {
      id: 26,
      text: "Push yourself because no one else is going to do it for you.",
      author: "Unknown",
    },
    {
      id: 27,
      text: "Success begins with self-discipline.",
      author: "Unknown",
    },
    {
      id: 28,
      text: "Doubt kills more dreams than failure ever will.",
      author: "Suzy Kassem",
    },
    {
      id: 29,
      text: "A little progress each day adds up to big results.",
      author: "Satya Nani",
    },
    {
      id: 30,
      text: "Work hard in silence, let success make the noise.",
      author: "Frank Ocean",
    },
    {
      id: 31,
      text: "Stay hungry. Stay foolish.",
      author: "Steve Jobs",
    },
    {
      id: 32,
      text: "Hard work beats talent when talent doesn't work hard.",
      author: "Tim Notke",
    },
    {
      id: 33,
      text: "Your habits shape your future.",
      author: "Unknown",
    },
    {
      id: 34,
      text: "You are capable of amazing things.",
      author: "Unknown",
    },
    {
      id: 35,
      text: "Every day is a fresh start.",
      author: "Unknown",
    },
    {
      id: 36,
      text: "Don't limit your challenges. Challenge your limits.",
      author: "Unknown",
    },
    {
      id: 37,
      text: "Make today count.",
      author: "Unknown",
    },
    {
      id: 38,
      text: "Stay focused and never give up.",
      author: "Unknown",
    },
    {
      id: 39,
      text: "Your future is created by what you do today, not tomorrow.",
      author: "Robert Kiyosaki",
    },
    {
      id: 40,
      text: "Believe in yourself and all that you are.",
      author: "Christian D. Larson",
    },
    {
      id: 41,
      text: "The harder you work for something, the greater you'll feel when you achieve it.",
      author: "Unknown",
    },
    {
      id: 42,
      text: "Success doesn't come from what you do occasionally. It comes from what you do consistently.",
      author: "Marie Forleo",
    },
    {
      id: 43,
      text: "Stay committed to your goals, but stay flexible in your approach.",
      author: "Unknown",
    },
    {
      id: 44,
      text: "The journey of a thousand miles begins with a single step.",
      author: "Lao Tzu",
    },
    {
      id: 45,
      text: "Be stronger than your strongest excuse.",
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
