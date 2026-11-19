const steps = document.querySelectorAll(".form-step");

const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const submitBtn = document.getElementById("submit-btn");

const progressFill = document.getElementById("progress-fill");
const stepTitle = document.getElementById("step-title");
const progressPercent = document.getElementById("progress-percent");

const form = document.getElementById("assessment-form");

let currentStep = 0;


// SHOW CURRENT STEP

function showStep(index) {

    steps.forEach((step, i) => {

        step.classList.toggle("active", i === index);

    });

    // Update progress

    const progress = ((index + 1) / steps.length) * 100;

    progressFill.style.width = progress + "%";

    progressPercent.textContent = Math.round(progress) + "%";

    stepTitle.textContent = `Step ${index + 1} of ${steps.length}`;


    // Previous button

    prevBtn.style.display = index === 0 ? "none" : "block";


    // Next and Submit buttons

    nextBtn.style.display =
        index === steps.length - 1 ? "none" : "block";

    submitBtn.style.display =
        index === steps.length - 1 ? "block" : "none";

}


// VALIDATE CURRENT STEP

function validateStep() {

    const currentInputs = steps[currentStep].querySelectorAll(
        "input[required]"
    );

    for (let input of currentInputs) {

        if (!input.checkValidity()) {

            input.reportValidity();

            return false;

        }

    }

    return true;

}


// NEXT BUTTON

nextBtn.addEventListener("click", function () {

    if (!validateStep()) {
        return;
    }

    if (currentStep < steps.length - 1) {

        currentStep++;

        showStep(currentStep);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

});


// PREVIOUS BUTTON

prevBtn.addEventListener("click", function () {

    if (currentStep > 0) {

        currentStep--;

        showStep(currentStep);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

});


// FORM SUBMISSION

// FORM SUBMISSION

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    if (!validateStep()) {
        return;
    }

    const formData = new FormData(form);

    const answers = Object.fromEntries(formData.entries());

    console.log("Assessment Answers:", answers);

    try {

        const response = await fetch("/submit-assessment", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(answers)

        });

        const result = await response.json();

        if (result.success) {

            alert("Your assessment data has been successfully received by HerHorizon!");

            console.log("Flask Response:", result);

        } else {

            alert("Something went wrong: " + result.message);

        }

    }

    catch (error) {

        console.error("Error:", error);

        alert("Unable to connect to the server. Please try again.");

    }

});


// INITIALIZE

showStep(currentStep);