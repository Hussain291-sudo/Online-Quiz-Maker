const API = "http://localhost:5000/api/quiz";

let questions = [];

// Add question UI
function addQuestion() {
  const container = document.getElementById("questions");

  const qIndex = questions.length;

  container.innerHTML += `
    <div>
      <input placeholder="Question" id="q${qIndex}"><br>
      <input placeholder="Option 1" id="o${qIndex}0">
      <input placeholder="Option 2" id="o${qIndex}1">
      <input placeholder="Option 3" id="o${qIndex}2">
      <input placeholder="Option 4" id="o${qIndex}3">
      <input placeholder="Correct Index (0-3)" id="c${qIndex}">
    </div><br>
  `;

  questions.push({});
}

// Submit quiz
async function submitQuiz() {
  const title = document.getElementById("title").value;

  let quizQuestions = [];

  for (let i = 0; i < questions.length; i++) {
    quizQuestions.push({
      question: document.getElementById(`q${i}`).value,
      options: [
        document.getElementById(`o${i}0`).value,
        document.getElementById(`o${i}1`).value,
        document.getElementById(`o${i}2`).value,
        document.getElementById(`o${i}3`).value
      ],
      correctAnswer: parseInt(document.getElementById(`c${i}`).value)
    });
  }

  await fetch(`${API}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, questions: quizQuestions })
  });

  alert("Quiz Created!");
}

// Load quizzes
async function loadQuizzes() {
  const res = await fetch(API);
  const quizzes = await res.json();

  const list = document.getElementById("quizList");

  quizzes.forEach(q => {
    list.innerHTML += `
      <div>
        <h3>${q.title}</h3>
        <button onclick="startQuiz('${q._id}')">Take Quiz</button>
      </div>
    `;
  });
}

function startQuiz(id) {
  localStorage.setItem("quizId", id);
  window.location.href = "quiz.html";
}

// Quiz Logic
let currentQuiz, index = 0, score = 0;

async function loadQuiz() {
  const id = localStorage.getItem("quizId");
  const res = await fetch(`${API}/${id}`);
  currentQuiz = await res.json();

  document.getElementById("quizTitle").innerText = currentQuiz.title;
  showQuestion();
}

function showQuestion() {
  const q = currentQuiz.questions[index];

  document.getElementById("questionBox").innerHTML = `
    <h3>${q.question}</h3>
    ${q.options.map((opt, i) => `
      <button onclick="checkAnswer(${i})">${opt}</button>
    `).join("")}
  `;
}

function checkAnswer(i) {
  if (i === currentQuiz.questions[index].correctAnswer) {
    score++;
  }
}

function nextQuestion() {
  index++;

  if (index < currentQuiz.questions.length) {
    showQuestion();
  } else {
    localStorage.setItem("score", score);
    window.location.href = "result.html";
  }
}

// Auto load
if (document.getElementById("quizList")) loadQuizzes();
if (document.getElementById("quizTitle")) loadQuiz();