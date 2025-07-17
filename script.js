const questions = [
    { type: "text", text: "Name:",
        key: "name", remember: true },
    { type: "text", text: "Enter your email. A copy of your responses will be sent to this inbox.", 
        key: "userEmail", remember: true },
    { type: "text", text: "Enter your supervisor's email. A copy of your responses will be sent to this inbox.", 
        key: "supervisorEmail", remember: true },
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
        controlPrompt: "Describe the control for falling from height:" },
    { type: "yesno",
        text: "Can I be trapped/caught by a plant?",
        controlOn: "yes",
        controlPrompt: "Describe the control for being trapped/caught by a plant:" },
    { type: "yesno", 
        text: "Can I contact chemicals or ignition sources?",
        controlOn: "yes",
        controlPrompt: "Describe the control for contacting chemicals or ignition sources:" },
    { type: "yesno", 
        text: "Can I receive burns (hot/cold)?",
        controlOn: "yes",
        controlPrompt: "Describe the control for receiving burns:" },
    { type: "yesno", 
        text: "Is there potential for slip, trip, and fall hazards?",
        controlOn: "yes",
        controlPrompt: "Describe the control for slip, trip, and fall hazards:" },
    { type: "yesno", 
        text: "Is there potential for stored energy needing isolation?",
        controlOn: "yes",
        controlPrompt: "Describe the control for stored energy needing isolation:" },
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
        controlOn: "no",
        controlPrompt: "How do I plan on preparing if the weather changes?" },
    { type: "yesno", 
        text: "Am I prepared if my work impacts on others around me?",
        controlOn: "no",
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
  let editingStorageItem = false;
  let editingKey = null;

  const storedKeysToCheck = ["name", "userEmail", "supervisorEmail"];
  let storageCheckIndex = 0;
  let inStorageCheck = true; // initially true to start checking stored values

  function showStorageCheck() {
    if (storageCheckIndex >= storedKeysToCheck.length) {
        console.log("THIS PART MEANS WE WENT BACK TO NORMAL QUESTION?")
      // Done checking storage, start normal quiz
      inStorageCheck = false;
      currentIndex = 3; // start asking from "Task" since storedkeystocheck are all checked
      showQuestion();
      return;
    }

    const key = storedKeysToCheck[storageCheckIndex]; 
    const saved = localStorage.getItem(key);

    if (saved) {
        // if there is a saved item then ask
      questionText.textContent = `Your last entered ${key === "userEmail" ? "email" : key === "supervisorEmail" ? "supervisor's email" : "name"} was "${saved}". Do you want to change it?`;
      textInput.style.display = "none";
      confirmBtn.style.display = "none";
      yesBtn.style.display = "inline-block";
      noBtn.style.display = "inline-block";
      if (currentIndex == 0) {
        backBtn.style.display = "none"; // hide back button here if you want
      } else {
        backBtn.style.display = "inline-block";
      }
    } else {
        console.log("THIS PART MEANS WE did the weird?")

        // if there is not a saved item then skip all of this storage checking bs
        inStorageCheck = false;
        currentIndex = 0; // start asking from regular name since nothing checked yet
        showQuestion();
        return;
    }
  }

  
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

    if (q.remember && q.key) {
        const saved = localStorage.getItem(q.key);
        if (saved) textInput.value = saved;
    }
  
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
      textInput.value = answers[currentIndex]?.answer || "";
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

    if (inStorageCheck) {
        const key = storedKeysToCheck[storageCheckIndex];
        editingStorageItem = true;
        editingKey = key;

        // ask user to input new value

        questionText.textContent = questions[currentIndex].text;
        textInput.style.display = "block";
        confirmBtn.style.display = "inline-block";
        yesBtn.style.display = "none";
        noBtn.style.display = "none";
        backBtn.style.display = "inline-block";
        textInput.value = "";

        // answers[currentIndex] = {
        //     question: q.text,
        //     answer: "Yes"
        // }
        // // done, go next
        // currentIndex++;
        // storageCheckIndex++;
        // showStorageCheck();
        // return; // THIS MIGHT BE IMPORTANT


    // Move to normal question that matches this key
    // currentIndex = questions.findIndex(q => q.key === key);
    // inStorageCheck = false;
    // // Show input card for that question
    // questionText.textContent = questions[currentIndex].text;
    // textInput.style.display = "block";
    // confirmBtn.style.display = "inline-block";
    // yesBtn.style.display = "none";
    // noBtn.style.display = "none";
    // backBtn.style.display = currentIndex > 0 || waitingForControl ? "inline-block" : "none";
    // textInput.value = "";

    } else {
        // normal quiz questions

    //currentAnswer = "Yes";
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
    }
  };
  //console.log("NO button clicked");
  noBtn.onclick = () => {
    const q = questions[currentIndex];
    console.log("NO button clicked");

    if (inStorageCheck) {
        console.log("Storage check NO clicked for index:", storageCheckIndex);

        const key = storedKeysToCheck[storageCheckIndex];
        const saved = localStorage.getItem(key) || "";

        // Find question index with this key
        const qIndex = questions.findIndex(q => q.key === key);

        if (qIndex !== -1) {
            answers[qIndex] = {
                question: questions[qIndex].text,
                answer: saved
            };
        }

        currentIndex++;
        storageCheckIndex++;
        showStorageCheck();
        return; // IDK IF NEED THIS

    } else {
        console.log("Normal NO clicked at quiz index:", currentIndex);

        //currentAnswer = "No";
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
    }
  };
  
  
  confirmBtn.onclick = () => {
    const val = textInput.value.trim();
    if (!val) return;
  
    const q = questions[currentIndex];

    if (editingStorageItem && editingKey) {
        localStorage.setItem(editingKey, val);
        editingStorageItem = false;
        editingKey = null;

        answers[currentIndex] = {
            question: q.text,
            answer: val
        };

        currentIndex++;
        storageCheckIndex++;
        showStorageCheck();
        return;
    }
  
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
    if (inStorageCheck) {

        if (editingStorageItem) {
        // if editing/confirming and going back then nothing in particular, that is handled by "Yes" button on click? no
            editingStorageItem = false;
            editingKey = null;
            showStorageCheck();
            return;

        } else {
        // if wanting to go back to the previous page
            currentIndex--;
            storageCheckIndex--;
            showStorageCheck();
            return;
        }
    }
    if (waitingForControl) {
      waitingForControl = false;
      showQuestion();
    } else if (currentIndex > 0) {
        console.log(`curreny index ${currentIndex}`);
    // if last was a storage but you've gone to tasks and now want to change something
        
        if (currentIndex == 3) { // i.e. is TASK question
            console.log("this happened");
            inStorageCheck = true;
            currentIndex--;
            storageCheckIndex--;
            showStorageCheck();
            return;
        }
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
    document.getElementById("card").innerHTML = "<h2>Thanks for answering! A copy of your responses has been sent to you and your supervisor. If you don't see it, check your junk inbox.</h2>";
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
    const userEmail = answers.find(a => a.question.includes("your email"))?.answer || "";
    const supervisorEmail = answers.find(a => a.question.includes("supervisor"))?.answer || "";

    console.log("Sending to:", userEmail);
    console.log(`${userEmail}, ${supervisorEmail}`);

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
  //showQuestion();
  showStorageCheck();
  