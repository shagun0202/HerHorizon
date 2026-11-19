const questions = [

    {
        key: "Age (yrs)",
        question: "What is your age?",
        type: "number",
        min: 1,
        max: 100,
        placeholder: "Enter your age"
    },

    {
        key: "Weight (Kg)",
        question: "What is your current weight?",
        type: "number",
        min: 1,
        max: 300,
        placeholder: "Weight in Kg"
    },

    {
        key: "Height(Cm)",
        question: "What is your height?",
        type: "number",
        min: 50,
        max: 250,
        placeholder: "Height in Cm"
    },

    {
        key: "Cycle(R/I)",
        question: "How would you describe your menstrual cycle?",
        type: "radio",
        options: [
            { label: "Regular", value: "R" },
            { label: "Irregular", value: "I" }
        ]
    },

    {
        key: "Cycle length(days)",
        question: "What is your usual menstrual cycle length?",
        type: "number",
        min: 1,
        max: 365,
        placeholder: "Number of days"
    },

    {
        key: "Marraige Status (Yrs)",
        question: "How many years have you been married?",
        type: "number",
        min: 0,
        max: 100,
        placeholder: "Years"
    },

    {
        key: "Pregnant(Y/N)",
        question: "Are you currently pregnant?",
        type: "radio",
        options: [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" }
        ]
    },

    {
        key: "No. of abortions",
        question: "How many previous abortions have you had?",
        type: "number",
        min: 0,
        max: 50,
        placeholder: "Enter number"
    },

    {
        key: "Hip(inch)",
        question: "What is your hip measurement?",
        type: "number",
        min: 10,
        max: 100,
        placeholder: "Measurement in inches"
    },

    {
        key: "Waist(inch)",
        question: "What is your waist measurement?",
        type: "number",
        min: 10,
        max: 100,
        placeholder: "Measurement in inches"
    },

    {
        key: "Weight gain(Y/N)",
        question: "Have you experienced unexplained weight gain?",
        type: "radio",
        options: [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" }
        ]
    },

    {
        key: "hair growth(Y/N)",
        question: "Have you noticed excessive facial or body hair growth?",
        type: "radio",
        options: [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" }
        ]
    },

    {
        key: "Skin darkening (Y/N)",
        question: "Have you noticed unusual skin darkening?",
        type: "radio",
        options: [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" }
        ]
    },

    {
        key: "Hair loss(Y/N)",
        question: "Have you experienced excessive hair loss?",
        type: "radio",
        options: [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" }
        ]
    },

    {
        key: "Pimples(Y/N)",
        question: "Do you frequently experience pimples or acne?",
        type: "radio",
        options: [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" }
        ]
    },

    {
        key: "Fast food (Y/N)",
        question: "Do you frequently consume fast food?",
        type: "radio",
        options: [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" }
        ]
    },

    {
        key: "Reg.Exercise(Y/N)",
        question: "Do you exercise regularly?",
        type: "radio",
        options: [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" }
        ]
    }

];


let currentQuestion = 0;

let answers = {};


function startAssessment() {

    document.getElementById("assessment").style.display = "none";

    document.getElementById("home").style.display = "none";

    document.getElementById("questionnaire").style.display = "block";

    document.getElementById("questionnaire").scrollIntoView({
        behavior: "smooth"
    });

    showQuestion();

}


function showQuestion() {

    const q = questions[currentQuestion];

    const container = document.getElementById("question-container");

    document.getElementById("progress-text").innerText =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    document.getElementById("progress-bar").style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    let html = `<h3 class="question-title">${q.question}</h3>`;


    if (q.type === "number") {

        html += `
            <input
                type="number"
                id="answer"
                class="question-input"
                min="${q.min}"
                max="${q.max}"
                step="any"
                placeholder="${q.placeholder}"
                value="${answers[q.key] ?? ''}"
                required
            >
        `;

    }


    if (q.type === "radio") {

        q.options.forEach(option => {

            const checked =
                answers[q.key] === option.value ? "checked" : "";

            html += `
                <label class="radio-option">

                    <input
                        type="radio"
                        name="answer"
                        value="${option.value}"
                        ${checked}
                    >

                    ${option.label}

                </label>
            `;

        });

    }


    container.innerHTML = html;


    document.getElementById("prev-btn").disabled =
        currentQuestion === 0;


    document.getElementById("next-btn").innerText =
        currentQuestion === questions.length - 1
        ? "Submit Assessment"
        : "Next →";

}


function nextQuestion() {

    const q = questions[currentQuestion];

    let value;


    if (q.type === "number") {

        const input = document.getElementById("answer");

        value = input.value.trim();

        if (
            value === "" ||
            !Number.isFinite(Number(value)) ||
            Number(value) < q.min ||
            Number(value) > q.max
        ) {

            alert("Please enter a valid answer.");
            return;

        }

    }


    else {

        const selected = document.querySelector(
            'input[name="answer"]:checked'
        );

        if (!selected) {

            alert("Please select an answer.");
            return;

        }

        value = selected.value;

    }


    answers[q.key] = value;


    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    }

    else {

        submitAssessment();

    }

}


function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

}


function submitAssessment() {

    console.log("User Answers:", answers);

    alert(
        "Thank you! Your questionnaire is complete. Model integration will be added in the next development phase."
    );

}