// script.js

let selectedAnswer = "";  // Variable to hold the selected answer

// Sample questions and answers
const questions = [
  {
    question: "",
    choices: ["Blue", "Green", "Red", "Yellow"],
    correctAnswer: "Blue"
  },
  {
    question: "Where would I like to travel next?",
    choices: ["Japan", "Italy", "Australia", "Canada"],
    correctAnswer: "Japan"
  },
  // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;

// Start the game by hiding the home page and displaying the game page
function startGame() {
  document.querySelector(".home-container").style.display = "none";
  document.querySelector(".game-container").style.display = "block";
  displayQuestion();
}

// Function to display the current question
function displayQuestion() {
  const questionElement = document.getElementById("question");
  const answerChoicesElement = document.getElementById("answer-choices");
  const nextButton = document.getElementById("next-btn");

  // Hide the Next button initially
  nextButton.style.display = "none";
  document.getElementById("feedback").textContent = "";  // Clear feedback
  selectedAnswer = "";  // Reset selected answer for each question

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  // Clear the previous answer choices
  answerChoicesElement.innerHTML = "";

  // Display answer choices dynamically
  currentQuestion.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.className = "answer-button"; // Add the CSS class for styling

    // Handle the selection of an answer
    button.onclick = () => {
      selectedAnswer = choice;
      document.querySelectorAll(".answer-button").forEach(btn => {
        btn.classList.remove("selected");  // Remove selected class from all buttons
      });
      button.classList.add("selected");  // Highlight the selected choice
    };

    answerChoicesElement.appendChild(button);
  });
}

// Function to handle the submission of an answer
function submitAnswer() {
  const feedbackElement = document.getElementById("feedback");
  const currentQuestion = questions[currentQuestionIndex];

  // Check if the selected answer is correct
  if (selectedAnswer === currentQuestion.correctAnswer) {
    feedbackElement.textContent = "Correct!";
    feedbackElement.className = "feedback correct";
    score++;
  } else {
    feedbackElement.textContent = `Wrong! The correct answer was ${currentQuestion.correctAnswer}.`;
    feedbackElement.className = "feedback wrong";
  }

  // Update the score (if needed)
  

  // Show the Next button after submitting an answer
  document.getElementById("next-btn").style.display = "inline";
}

// Function to move to the next question
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();  // Load the next question
  } else {
    endGame();  // End the game if all questions are answered
  }
}

// Function to end the game
function endGame() {
  const questionElement = document.getElementById("question");
  const answerChoicesElement = document.getElementById("answer-choices");

  questionElement.textContent = `Game Over! Your final score is: ${score}`;
  answerChoicesElement.style.display = "none";  // Hide the answer choices
  document.getElementById("submit-btn").style.display = "none";  // Hide the submit button
  document.getElementById("next-btn").style.display = "none";  // Hide the Next button
}
displayQuestion();
