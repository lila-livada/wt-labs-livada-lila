
const state = {
  current: 0,     
  selected: null,
  choices: [],    
};

const quizEl = document.querySelector("#quiz");
const progressEl = document.querySelector("#progress");


function createEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text; 
}

function getScore() {
  return state.choices.filter((choice, i) => choice === questions[i].correct).length;
}

function renderQuestion() {
  const question = questions[state.current];
  progressEl.textContent = `Question ${state.current + 1} of ${questions.length} · Score: ${getScore()}`;

  const topic = createEl("p", "topic", question.topic);
  const title = createEl("h2", "", question.text);
  const answerList = createEl("div", "answers");


  question.answers.forEach((answer, index) => {
    const button = createEl("button", "answer", answer);
    button.type = "button";

    if (state.selected !== null) {
      button.disabled = true;
      if (index === question.correct) {
        button.classList.add("correct");
      } else if (index === state.selected && index !== question.correct) {
        button.classList.add("wrong");
      }
    }

    button.addEventListener("click", () => handleAnswer(index));
    answerList.append(button);
  });

  quizEl.append(topic, title, answerList);

  if (state.selected !== null) {
    const isRight = state.selected === question.correct;
    const feedback = createEl("p", isRight ? "feedback ok" : "feedback bad",
      isRight ? "Correct!" : `Wrong – the answer is "${question.answers[question.correct]}".`);

    const isLast = state.current === questions.length - 1;
    const nextButton = createEl("button", "primary", isLast ? "See results" : "Next question");
    nextButton.type = "button";
    nextButton.addEventListener("click", handleNext);

    quizEl.append(feedback, nextButton);
    nextButton.focus();
  }
}

function renderResults() {
  progressEl.textContent = "Finished";

  const score = getScore();
  const heading = createEl("h2", "", `You scored ${score} of ${questions.length}`);
  quizEl.append(heading);

  const wrongQuestions = questions.filter((q, idx) => state.choices[idx] !== q.correct);

  if (wrongQuestions.length === 0) {
    quizEl.append(createEl("p", "", "Perfect – no mistakes!"));
  } else {
    const ul = createEl("ul", "review");
    wrongQuestions.forEach((q) => {
      const li = document.createElement("li");
      const qText = createEl("span", "", q.text);
      const rightAns = createEl("span", "", `Correct answer: ${q.answers[q.correct]}`);
      li.append(qText, rightAns);
      ul.append(li);
    });
    quizEl.append(ul);
  }

  const playAgainBtn = createEl("button", "primary", "Play again");
  playAgainBtn.type = "button";
  playAgainBtn.addEventListener("click", handleRestart);
  quizEl.append(playAgainBtn);
}

function render() {
  quizEl.replaceChildren(); 
  if (state.current < questions.length) {
    renderQuestion();
  } else {
    renderResults();
  }
}

function handleAnswer(index) {
  if (state.selected !== null) return;
  state.selected = index;
  state.choices.push(index);
  render();
}

function handleNext() {
  state.current++;
  state.selected = null;
  render();
}

function handleRestart() {
  state.current = 0;
  state.selected = null;
  state.choices = [];
  render();
}

render();