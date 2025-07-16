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
  const confirmBtn = document.getElementById("confirm-btn");
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const backBtn = document.getElementById("back-btn");
  
  function showQuestion() {
    if (currentIndex >= questions.length) {
      finishQuiz();
      return;
    }
  
    const q = questions[currentIndex];
    questionText.textContent = q.text;
  
    if (q.type === "text") {
      textInput.style.display = "block";
      confirmBtn.style.display = "inline-block";
      textInput.value = answers[currentIndex]?.answer || "";
      yesBtn.style.display = "none";
      noBtn.style.display = "none";
    } else {
      textInput.style.display = "none";
      confirmBtn.style.display = "none";
      yesBtn.style.display = "inline-block";
      noBtn.style.display = "inline-block";
    }
  
    backBtn.style.display = currentIndex > 0 ? "inline-block" : "none";
  }
  
  function recordAnswer(answer) {
    answers[currentIndex] = {
      question: questions[currentIndex].text,
      answer: answer
    };
    currentIndex++;
    showQuestion();
  }
  
  function finishQuiz() {
    document.getElementById("card").innerHTML = "<h2>Thanks for answering!</h2>";
    document.querySelector(".buttons").style.display = "none";
    confirmBtn.style.display = "none";
    backBtn.style.display = "none";
  
    const summary = document.createElement("pre");
    summary.textContent = JSON.stringify(answers, null, 2);
    document.getElementById("app").appendChild(summary);
  }
  
  yesBtn.onclick = () => recordAnswer("Yes");
  noBtn.onclick = () => recordAnswer("No");
  confirmBtn.onclick = () => {
    const val = textInput.value.trim();
    if (val) {
      recordAnswer(val);
      textInput.value = "";
    }
  };
  
  textInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const val = textInput.value.trim();
      if (val) {
        recordAnswer(val);
        textInput.value = "";
      }
    }
  });
  
  backBtn.onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      showQuestion();
    }
  };
  
  showQuestion();
  