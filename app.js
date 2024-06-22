document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("start-btn");
    const homepageSection = document.getElementById("homepage-section");
    const resumeSection = document.getElementById("resume-section");

    startBtn.addEventListener("click", function() {
        homepageSection.style.display = "none";
        resumeSection.style.display = "block";
        loadFromLocalStorage();
    });
    //Next, Back, and Preview buttons
    const formSteps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".next-btn");
    const backBtns = document.querySelectorAll(".back-btn");
    const previewBtns = document.querySelectorAll(".preview-btn");
    const resumeForm = document.getElementById("resume-form");
    const previewSection = document.getElementById("preview-section");
    const resumePreview = document.getElementById("resume-preview");

    let currentStep = 0;
    formSteps[currentStep].classList.add("active");

    function saveToLocalStorage() {
        localStorage.setItem("name", document.getElementById("name").value);
        localStorage.setItem("address", document.getElementById("address").value);
        localStorage.setItem("email", document.getElementById("email").value);
        localStorage.setItem("phone", document.getElementById("phone").value);
        localStorage.setItem("college", document.getElementById("college").value);
        localStorage.setItem("major", document.getElementById("major").value);
        localStorage.setItem("gpa", document.getElementById("gpa").value);
        localStorage.setItem("grad-date", document.getElementById("grad-date").value);
        localStorage.setItem("experience", document.getElementById("experience").value);
        localStorage.setItem("skills", document.getElementById("skills").value);
        localStorage.setItem("projects", document.getElementById("projects").value);
    }

    function loadFromLocalStorage() {
        document.getElementById("name").value = localStorage.getItem("name") || "";
        document.getElementById("address").value = localStorage.getItem("address") || "";
        document.getElementById("email").value = localStorage.getItem("email") || "";
        document.getElementById("phone").value = localStorage.getItem("phone") || "";
        document.getElementById("college").value = localStorage.getItem("college") || "";
        document.getElementById("major").value = localStorage.getItem("major") || "";
        document.getElementById("gpa").value = localStorage.getItem("gpa") || "";
        document.getElementById("grad-date").value = localStorage.getItem("grad-date") || "";
        document.getElementById("experience").value = localStorage.getItem("experience") || "";
        document.getElementById("skills").value = localStorage.getItem("skills") || "";
        document.getElementById("projects").value = localStorage.getItem("projects") || "";
    }

    function generatePreview(stepIndex) {
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const college = document.getElementById("college").value;
        const major = document.getElementById("major").value;
        const gpa = document.getElementById("gpa").value;
        const gradDate = document.getElementById("grad-date").value;
        const experience = document.getElementById("experience").value.split('\n').map(line => `<li>${line}</li>`).join('');
        const skills = document.getElementById("skills").value.split('\n').map(line => `<li>${line}</li>`).join('');
        const projects = document.getElementById("projects").value.split('\n').map(line => `<li>${line}</li>`).join('');

        const previewHTML = `
            <div>
                <h1>${name}</h1>
                <p>${address} | ${email} | ${phone}</p>
            </div>
            <div>
                <h2>Education</h2>
                <p>${college}, ${major}</p>
                <p>GPA: ${gpa} | Graduation Date: ${gradDate}</p>
            </div>
            <div>
                <h2>Experience</h2>
                <ul>${experience}</ul>
            </div>
            <div>
                <h2>Skills</h2>
                <ul>${skills}</
            </ul>
            </div>
            <div>
                <h2>Projects</h2>
                <ul>${projects}</ul>
            </div>
        `;

        //Update the preview section
        resumePreview.innerHTML = previewHTML;
    }

    //Function to handle navigation to the next form step (next button)
    function goToNextStep() {
        formSteps[currentStep].classList.remove("active");
        currentStep++;
        if (currentStep < formSteps.length) {
            formSteps[currentStep].classList.add("active");
        }
        saveToLocalStorage();
    }

    //Function to handle navigation to the previous form step (back button)
    function goToPreviousStep() {
        formSteps[currentStep].classList.remove("active");
        currentStep--;
        if (currentStep >= 0) {
            formSteps[currentStep].classList.add("active");
        }
    }

    //Event listeners for next and back buttons
    nextBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            goToNextStep();
        });
    });

    backBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            goToPreviousStep();
        });
    });

    //Event listeners for preview buttons
    previewBtns.forEach((btn, index) => {
        btn.addEventListener("click", () => {
            generatePreview(index); // Call generatePreview with the current step index
            previewSection.style.display = "block";
        });
    });

    //Form submit event listener
    resumeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        alert('Form submitted!');
        localStorage.clear(); 
    });

});