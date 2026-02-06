export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  anyAnswerCorrect?: boolean; // If true, any selected answer is treated as correct
}

// EDIT YOUR ANSWERS HERE!
// correctIndex is 0-based (0 = first option, 1 = second, etc.)
export const quizQuestions: QuizQuestion[] = [
  {
    question: "What's my favorite color?",
    options: [
      "Navy Blue",      // Option 0 - mark as correct
      "Blue",
      "Red",
      "It changes depending on my mood"
    ],
    correctIndex: 0,
  },
  {
    question: "What's my favorite food?",
    options: [
      "Kabsa",
      "Burrito Bowl",
      "Pancit Canton",
      "Hotdog na red"
    ],
    correctIndex: 1, // Burrito Bowl is the correct answer
  },
  {
    question: "What's my favorite music/artist?",
    options: [
      "Sabrina Carpenter",
      "Role Model",
      "Gracie Abrams",      // Option 2 - mark as correct
      "Olivia Rodrigo"
    ],
    correctIndex: 2,
  },
  {
    question: "What's my favorite car?",
    options: [
      "Porsche 911",      // Option 0 - mark as correct
      "Tesla Model Why",
      "BMW M4",
      "Audi Q5"
    ],
    correctIndex: 0,
  },
  {
    question: "What's our favorite thing to do together?",
    options: [
      "Stay home and cuddle",
      "Go on Concert Dates",
      "Write....",
      "All of the above"       // Option 3 - mark as correct
    ],
    correctIndex: 3,
  },
  {
    question: "What date means the most to us?",
    options: [
      "February 14",
      "December 25",
      "September 12",       // Option 2 - the correct answer!
      "July 7"
    ],
    correctIndex: 2,
  },
  {
    question: "What's my favorite place to be?",
    options: [
      "At the beach",
      "Concerts",
      "Anywhere with you",      // Option 2 - mark as correct
      "Billiards/Pool Hall"
    ],
    correctIndex: 2,
  },
  {
    question: "What do I love about you?",
    options: [
      "Everything",      // Option 0 - mark as correct
      "Your smile",
      "Your laugh",
      "Your jokes"
    ],
    correctIndex: 0,
  },
  {
    question: "What's my favorite season?",
    options: [
      "Spring",
      "Summer",      // Option 1 - mark as correct
      "Fall",
      "Winter"
    ],
    correctIndex: 1,
  },
  {
    question: "Which foood do you like more on a special occasion?",
    options: [
      "Italian food",
      "Thai food",
      "Japanese food",
      "Vietnamese food",
      "American food",
      "Chinese food"
    ],
    correctIndex: 0, // Not used when anyAnswerCorrect is true
    anyAnswerCorrect: true, // Any answer is correct!
  },
];

export const correctFeedback = [
  "Okay wow… you really know me",
  "Exactly right! You're amazing",
  "Perfect! I knew you'd get it",
  "Yes! You know me so well",
  "That's my baber!",
  "Aww you remembered",
  "You really do pay attention",
  "That's so sweet of you to say",
  "You got it!",
  "I love that you remember",
];

export const wrongFeedback = [
  "Still cute.",
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
