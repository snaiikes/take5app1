const questions = [
    { type: "text", text: "What's your name?" },
    { type: "text", text: "What's the date today? (DD/MM/YY)" },
    { type: "yesno", text: "Can I strain or overexert myself?" },
    { type: "yesno", text: "Can I fall from a height?" }
  ];
  
  let currentIndex = 0;
  let answers = [];
  let history = [];
  
  const questionText = document.getElementById("question-text");
  const textInput = document.getElementById("text-input");
  const yesBtn = document.getElementById("yes-btn");
  const noBtn = document.getElementById("no-btn");
  const backBtn = document.getElementById("back-btn");

  
  function showQuestion() {
    const q = questions[currentIndex];
    questionText.textContent = q.text;
  
    if (q.type === "text") {
      textInput.style.display = "block";
      textInput.value = answers[currentIndex]?.answer || "";
      yesBtn.style.display = "none";
      noBtn.style.display = "none";
    } else {
      textInput.style.display = "none";
      yesBtn.style.display = "inline-block";
      noBtn.style.display = "inline-block";
    }
  
    backBtn.style.display = currentIndex > 0 ? "inline-block" : "none";
  }
  
  
  function recordAnswer(answer) {
    answers[currentIndex] = { question: questions[currentIndex].text, answer };
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
  backBtn.onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      showQuestion();
    }
  };
  
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
  