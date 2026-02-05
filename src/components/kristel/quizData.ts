export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

// EDIT YOUR ANSWERS HERE!
// correctIndex is 0-based (0 = first option, 1 = second, etc.)
export const quizQuestions: QuizQuestion[] = [
  {
    question: "What's my favorite color?",
    options: [
      "[YOUR ANSWER]",      // Option 0 - mark as correct
      "Blue",
      "Red",
      "It changes depending on my mood"
    ],
    correctIndex: 0,
  },
  {
    question: "What's my favorite food?",
    options: [
      "Pizza",
      "[YOUR ANSWER]",      // Option 1 - mark as correct
      "Sushi",
      "Anything you cook for me"
    ],
    correctIndex: 1,
  },
  {
    question: "What's my favorite music/artist?",
    options: [
      "Drake",
      "Taylor Swift",
      "[YOUR ANSWER]",      // Option 2 - mark as correct
      "Whatever's playing when I'm with you"
    ],
    correctIndex: 2,
  },
  {
    question: "What's my favorite car?",
    options: [
      "[YOUR ANSWER]",      // Option 0 - mark as correct
      "Tesla Model S",
      "BMW M4",
      "Any car as long as you're in it"
    ],
    correctIndex: 0,
  },
  {
    question: "What's our favorite thing to do together?",
    options: [
      "Watch movies",
      "Go on adventures",
      "Stay home and cuddle",
      "[YOUR ANSWER]"       // Option 3 - mark as correct
    ],
    correctIndex: 3,
  },
  {
    question: "What date means the most to us?",
    options: [
      "February 14",
      "December 25",
      "September 12",       // Option 2 - the correct answer!
      "Every day with you"
    ],
    correctIndex: 2,
  },
  {
    question: "What's my favorite place to be?",
    options: [
      "At the beach",
      "In the mountains",
      "[YOUR ANSWER]",      // Option 2 - mark as correct
      "Anywhere with you"
    ],
    correctIndex: 2,
  },
  {
    question: "What do I love most about you?",
    options: [
      "[YOUR ANSWER]",      // Option 0 - mark as correct
      "Your smile",
      "Your laugh",
      "Everything"
    ],
    correctIndex: 0,
  },
  {
    question: "What's my favorite season?",
    options: [
      "Summer",
      "[YOUR ANSWER]",      // Option 1 - mark as correct
      "Fall",
      "Winter"
    ],
    correctIndex: 1,
  },
  {
    question: "What's the best gift you've ever given me?",
    options: [
      "Something expensive",
      "A surprise trip",
      "Your time",
      "[YOUR ANSWER]"       // Option 3 - mark as correct
    ],
    correctIndex: 3,
  },
];

export const correctFeedback = [
  "Okay wow… you really know me",
  "Exactly right! You're amazing",
  "Perfect! I knew you'd get it",
  "Yes! You know me so well",
  "That's my girl!",
  "Aww you remembered",
  "You really do pay attention",
  "That's so sweet of you to say",
  "You got it!",
  "I love that you remember",
];

export const wrongFeedback = [
  "Still cute. I'll allow it",
  "Close enough, my love",
  "Hmm not quite, but I still love you",
  "That's okay, you're still perfect",
  "Nice try, beautiful",
  "I'll let that one slide",
  "Wrong answer but still adorable",
  "Not quite, but I love you anyway",
  "Maybe next time, my love",
  "Close! You're still the best",
];
