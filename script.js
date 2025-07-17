const questions = [
    { type: "text", text: "Name:" },
    { type: "text", text: "Your email:", 
        key: "userEmail", remember: true },
    { type: "text", text: "Your supervisor's email:", 
        key: "supervisorEmail", remember: true },
    { type: "text", text: "Task:" },
    { type: "text", text: "Location:" },
    { type: "text", text: "Date (DD/MM/YYYY):" },
  
    //{ type: "text", text: "Risk Identified and Controls" },
  
    //{ type: "text", text: "Answers to Take 5 questions" },
  
    { type: "yesno", 
        text: "Can I strain or overexert myself?",
        controlOn: "yes",
        controlPrompt: "Describe the control for straining or overexerting yourself:"}
  ];

  let currentIndex = 0;
  let answers = [];
  let waitingForControl = false;
  let currentAnswer = null;
  
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
  
    // Control input step
    if (waitingForControl) {
      questionText.textContent = q.controlPrompt || "Please enter the control:";
      textInput.style.display = "block";
      confirmBtn.style.display = "inline-block";
      yesBtn.style.display = "none";
      noBtn.style.display = "none";
      textInput.value = answers[currentIndex]?.control || "";
    } else if (q.type === "text") {
      questionText.textContent = q.text;
      textInput.style.display = "block";
      confirmBtn.style.display = "inline-block";
      yesBtn.style.display = "none";
      noBtn.style.display = "none";
      textInput.value = answers[currentIndex]?.answer || (q.remember && q.key ? localStorage.getItem(q.key) || "" : "");
    } else if (q.type === "textorno") {
      questionText.textContent = q.text;
      textInput.style.display = "block";
      confirmBtn.style.display = "inline-block";
      textInput.value = answers[currentIndex]?.answer || "";
      yesBtn.style.display = "none";
      noBtn.style.display = "inline-block";
    } else if (q.type === "yesno") {
      questionText.textContent = q.text;
      textInput.style.display = "none";
      confirmBtn.style.display = "none";
      yesBtn.style.display = "inline-block";
      noBtn.style.display = "inline-block";
    }
  
    backBtn.style.display = currentIndex > 0 || waitingForControl ? "inline-block" : "none";
  }
  
  function handleControlRequired(response, q) {
    if (
      (q.controlOn === "yes" && response === "Yes") ||
      (q.controlOn === "no" && response === "No") // ||
      // (q.controlOn === "both")
    ) {
      return true;
    }
    return false;
  }
  
  yesBtn.onclick = () => {
    const q = questions[currentIndex];
    currentAnswer = "Yes";
    answers[currentIndex] = {
      question: q.text,
      answer: "Yes"
    };
  
    if (q.type === "yesno" && handleControlRequired("Yes", q)) {
      waitingForControl = true;
      showQuestion();
    } else {
      currentIndex++;
      showQuestion();
    }
  };
  
  noBtn.onclick = () => {
    const q = questions[currentIndex];
    currentAnswer = "No";
    answers[currentIndex] = {
      question: q.text,
      answer: "No"
    };
  
    if (q.type === "yesno" && handleControlRequired("No", q)) {
      waitingForControl = true;
      showQuestion();
    } else {
      currentIndex++;
      showQuestion();
    }
  };
  
  confirmBtn.onclick = () => {
    const val = textInput.value.trim();
    if (!val) return;
  
    const q = questions[currentIndex];
  
    if (waitingForControl) {
      answers[currentIndex].control = val;
      waitingForControl = false;
      currentIndex++;
      showQuestion();
    } else {
      answers[currentIndex] = {
        question: q.text,
        answer: val
      };
      currentIndex++;
      showQuestion();
    }

    if (q.remember && q.key) {
        localStorage.setItem(q.key, val);
    }
  
    textInput.value = "";
    textInput.style.height = "auto";

  };

  textInput.addEventListener("input", function () {
    this.style.height = "auto"; // Reset height
    this.style.height = (this.scrollHeight) + "px"; // Set new height
  });
  
  textInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      confirmBtn.onclick();
    }
  });
  
  backBtn.onclick = () => {
    if (waitingForControl) {
      waitingForControl = false;
      showQuestion();
    } else if (currentIndex > 0) {
      currentIndex--;
      const q = questions[currentIndex];
      const lastAns = answers[currentIndex];
  
      // If control is expected based on last answer, go to control step
      if (q.type === "yesno" && handleControlRequired(lastAns.answer, q)) {
        waitingForControl = true;
      }
  
      showQuestion();
    }
  };
  
  function finishQuiz() {
    document.getElementById("card").innerHTML = "<h2>These were your answers. A copy has been sent to your email and your supervisor's email. If you don't see it, check your junk inbox.</h2>";
    document.querySelector(".buttons").style.display = "none";
    confirmBtn.style.display = "none";
    backBtn.style.display = "none";
  
    const summary = document.createElement("div");
    summary.id = "result-summary";
    summary.innerHTML = answers.map((a, i) => {
      let html = `<p><strong>Q${i + 1}: ${a.question}</strong><br>${a.answer}`;
      if (a.control) html += `<br><em>Control:</em> ${a.control}`;
      html += "</p>";
      return html;
    }).join("");

  document.getElementById("app").appendChild(summary);

    const usersName = answers.find(a => a.question.includes("Name:"))?.answer || "";
    const todaysTask = answers.find(a => a.question.includes("Task:"))?.answer || "";
    const todaysDate = answers.find(a => a.question.includes("Date"))?.answer || "";
    const userEmail = answers.find(a => a.question.includes("Your email"))?.answer || "";
    const supervisorEmail = answers.find(a => a.question.includes("supervisor"))?.answer || "";

    const checklistText = answers.map((a, i) => {
        let str = `Q${i + 1}: ${a.question}\n${a.answer}`;
        if (a.control) str += `\nControl: ${a.control}`;
        return str;
      }).join("\n\n");
      
      emailjs.send('take5', 'template_maenl8s', {
        name: usersName,
        task: todaysTask, 
        date: todaysDate, 
        supervisoremail: supervisorEmail,
        responses: checklistText,
        youremail: userEmail
      }).then(function(response) {
        console.log("Email sent!", response.status, response.text);
      }, function(err) {
        console.error("Failed to send email:", err);
      });
  }
  
  // Start app
  showQuestion();
  