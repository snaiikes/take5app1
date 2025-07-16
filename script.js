const questions = [
    { type: "yesno", text: "Do you like pineapple on pizza?" },
    { type: "text", text: "What’s your favourite movie?" },
    { type: "yesno", text: "Have you traveled overseas this year?" },
    { type: "text", text: "What’s one goal you have for this month?" }
  ];
  
  let currentIndex = 0;
  let answers = [];
  
  const questionText = document.getElementById("question-text");
  const textInput = document.getElementById("text-input");
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  
  function showQuestion() {
    const q = questions[currentIndex];
    questionText.textContent = q.text;
  
    if (q.type === "text") {
      textInput.style.display = "block";
      textInput.focus();
      yesBtn.style.display = "none";
      noBtn.style.display = "none";
    } else {
      textInput.style.display = "none";
      yesBtn.style.display = "inline-block";
      noBtn.style.display = "inline-block";
    }
  }
  
  function recordAnswer(answer) {
    answers.push({ question: questions[currentIndex].text, answer });
    currentIndex++;
  
    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      finishQuiz();
    }
  }
  
  function finishQuiz() {
    document.getElementById("card").innerHTML = "<h2>Thanks for answering!</h2>";
    document.querySelector(".buttons").style.display = "none";
    const summary = document.createElement("pre");
    summary.textContent = JSON.stringify(answers, null, 2);
    document.getElementById("app").appendChild(summary);
  }
  
  yesBtn.onclick = () => recordAnswer("Yes");
  noBtn.onclick = () => recordAnswer("No");
  
  textInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const val = e.target.value.trim();
      if (val) {
        recordAnswer(val);
        textInput.value = "";
      }
    }
  });
  
  showQuestion();
  