const questions = [
    { type: "text", text: "Name:" },
    { type: "text", text: "Task:" },
    { type: "text", text: "Location:" },
    { type: "text", text: "Date (DD/MM/YYYY):" },
  
    //{ type: "text", text: "Risk Identified and Controls" },
  
    //{ type: "text", text: "Answers to Take 5 questions" },
  
    { type: "yesno", 
        text: "Can I strain or overexert myself?",
        controlOn: "yes",
        controlPrompt: "Describe the control for straining or overexerting yourself:"},
    { type: "yesno", 
        text: "Can I fall from a height?",
        controlOn: "yes",
        controlPrompt: "Describe the control for falling from height:"
     },
    { type: "yesno",
        text: "Can I be trapped/caught by a plant?",
        controlOn: "yes",
        controlPrompt: "Describe the control for being trapped/caught by a plant:"
    },
    { type: "yesno", 
        text: "Can I contact chemicals or ignition sources?",
        controlOn: "yes",
        controlPrompt: "Describe the control for contacting chemicals or ignition sources:"
    },
    { type: "yesno", 
        text: "Can I receive burns (hot/cold)?",
        controlOn: "yes",
        controlPrompt: "Describe the control for receiving burns:"
    },
    { type: "yesno", 
        text: "Is there potential for slip, trip, and fall hazards?",
        controlOn: "yes",
        controlPrompt: "Describe the control for slip, trip, and fall hazards:"
    },
    { type: "yesno", 
        text: "Is there potential for stored energy needing isolation?",
        controlOn: "yes",
        controlPrompt: "Describe the control for stored energy needing isolation:"
     },
    { type: "yesno", 
        text: "Is there potential for sharp edges or rotating parts?",
        controlOn: "yes",
        controlPrompt: "Describe the control for sharp edges or rotating parts:" },
    { type: "yesno", 
        text: "Is there potential for work with radiation sources?",
        controlOn: "yes",
        controlPrompt: "Describe the control for working with radiation sources:"},
    { type: "yesno", 
        text: "Is there potential for unsafe atmospheric conditions?",
        controlOn: "yes",
        controlPrompt: "Describe the control for unsafe atmospheric conditions:"},
    { type: "yesno", 
        text: "Am I prepared if the weather changes?",
        controlOn: "both",
        controlPrompt: "How do I plan on preparing if the weather changes?" },
    { type: "yesno", 
        text: "Am I prepared if my work impacts on others around me?",
        controlOn: "both",
        controlPrompt: "How do I plan on preparing if my work impacts others around me?" },
    { type: "yesno", 
        text: "Am I fit for duty?", 
        controlOn: "no",
        controlPrompt: "You should go home." },
    { type: "yesno", 
        text: "Am I fatigued and in need of a break?",
        controlOn: "yes",
        controlPrompt: "You should take a break." },
    { type: "yesno", 
        text: "Am I trained and authorised?", 
        controlOn: "no",
        controlPrompt: "Please ensure you are trained and authorised." },
    { type: "yesno", 
        text: "Am I following FPR Energy procedures for this task?",
        controlOn: "no",
        controlPrompt: "Please follow FPR Energy procedures for this task." },
    { type: "yesno", 
        text: "Am I aware of site emergency procedures?",
        controlOn: "no",
        controlPrompt: "Please make yourself aware of site emergency procedures." },
    { type: "yesno", 
        text: "Am I working above or below someone?",
        controlOn: "yes",
        controlPrompt: "Describe the control for working above or below someone:" },
    { type: "yesno", 
        text: "Do I have the correct PPE?",
        controlOn: "no",
        controlPrompt: "Please ensure you have the correct PPE." },
    { type: "yesno", 
        text: "Do I need a Risk Management Plan?",
        controlOn: "yes",
        controlPrompt: "Briefly describe the Risk Management Plan:" },
    { type: "yesno", 
        text: "Do I need any work permits?",
        controlOn: "yes",
        controlPrompt: "Please ensure you have obtained the relevant work permits." },
    { type: "yesno", 
        text: "Do I need to restrict access?",
        controlOn: "yes",
        controlPrompt: "Describe the control for restricting access:" },
    { type: "yesno", 
        text: "Do I have safe access & egress?",
        controlOn: "no",
        controlPrompt: "Please ensure you have safe access and egress before continuing." },
    { type: "yesno", 
        text: "Do I have the required MSDS?",
        controlOn: "no",
        controlPrompt: "Please obtain the required MSDS." },
    { type: "yesno", 
        text: "Do I need assistance?",
        controlOn: "yes",
        controlPrompt: "What type of assistance do I need and can I readily obtain it?" },

    { type: "textorno", text: "Any other concerns?" }
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
    }
    // Regular text question
    else if (q.type === "text") {
      questionText.textContent = q.text;
      textInput.style.display = "block";
      confirmBtn.style.display = "inline-block";
      yesBtn.style.display = "none";
      noBtn.style.display = "none";
      textInput.value = answers[currentIndex]?.answer || "";
    }
    // Yes/No question
    else if (q.type === "yesno") {
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
      (q.controlOn === "no" && response === "No") ||
      (q.controlOn === "both")
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
  
    textInput.value = "";
  };
  
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
    document.getElementById("card").innerHTML = "<h2>Thanks for answering!</h2>";
    document.querySelector(".buttons").style.display = "none";
    confirmBtn.style.display = "none";
    backBtn.style.display = "none";
  
    const summary = document.createElement("div");
    summary.innerHTML = answers.map((a, i) => {
      let html = `<p><strong>Q${i + 1}: ${a.question}</strong><br>→ ${a.answer}`;
      if (a.control) html += `<br><em>Control:</em> ${a.control}`;
      html += "</p>";
      return html;
    }).join("");
    document.getElementById("app").appendChild(summary);
  }
  
  // Start app
  showQuestion();
  