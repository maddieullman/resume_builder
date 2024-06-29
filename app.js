document.addEventListener("DOMContentLoaded", function() {
    const startBtn = document.getElementById("start-btn");
    const homepageSection = document.getElementById("homepage-section");
    const resumeSection = document.getElementById("resume-section");
    const formSteps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".next-btn");
    const backBtns = document.querySelectorAll(".back-btn");
    const previewBtns = document.querySelectorAll(".preview-btn");
    const saveBtn = document.querySelector(".save-btn");
    const deleteBtns = document.querySelectorAll(".delete-btn");
    const previewSection = document.getElementById("preview-section");
    const resumePreview = document.getElementById("resume-preview");
    let currentStep = 0;
    let resumeId; 

    formSteps[currentStep].classList.add("active");

    //Start button
    startBtn.addEventListener("click", function() {
        homepageSection.style.display = "none";
        resumeSection.style.display = "block";
        loadResumes();
    });

    async function loadResumes() {
        try {
            const response = await fetch('http://localhost:3001/api/resumes');
            if (response.ok) {
                const resumes = await response.json();
                if (resumes.length > 0) {
                    const firstResume = resumes[0];
                    resumeId = firstResume._id;
                    fillFormWithResume(firstResume);
                }
            } 
            else {
                alert('Failed to load resumes.');
            }
        } 
        catch (error) {
            console.error('Error loading resumes:', error);
            alert('An error occurred while loading the resumes.');
        }
    }

    async function saveResume(resume) {
        try {
            const response = await fetch('http://localhost:3001/api/resumes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resume)
            });
            if (response.ok) {
                alert('Resume saved successfully!');
                resumeId = undefined; 
                loadResumes(); 
            } 
            else {
                alert('Failed to save resume.');
            }
        } 
        catch (error) {
            console.error('Error saving resume:', error);
            alert('An error occurred while saving the resume.');
        }
    }

    async function updateResume(resumeData) {
        try {
            const response = await fetch(`http://localhost:3001/api/resumes/${resumeId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resumeData)
            });
            if (response.ok) {
                alert('Resume updated successfully!');
                loadResumes(); 
            } 
            else {
                const errorData = await response.json();
                alert(`Failed to update resume: ${errorData.message}`);
            }
        } 
        catch (error) {
            console.error('Error updating resume:', error);
            alert('An error occurred while updating the resume.');
        }
    }

    async function deleteResume() {
        try {
            const response = await fetch(`http://localhost:3001/api/resumes/${resumeId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert('Resume deleted successfully!');
                clearFormFields(); 
                loadResumes(); 
            } 
            else {
                const errorData = await response.json();
                alert(`Failed to delete resume: ${errorData.message}`);
            }
        } 
        catch (error) {
            console.error('Error deleting resume:', error);
            alert('An error occurred while deleting the resume.');
        }
    }

    function fillFormWithResume(resume) {
        document.getElementById("name").value = resume.name || "";
        document.getElementById("address").value = resume.address || "";
        document.getElementById("email").value = resume.email || "";
        document.getElementById("phone").value = resume.phone || "";
        document.getElementById("college").value = resume.college || "";
        document.getElementById("major").value = resume.major || "";
        document.getElementById("gpa").value = resume.gpa || "";
        document.getElementById("grad-date").value = resume.gradDate || "";
        document.getElementById("experience").value = resume.experience || "";
        document.getElementById("skills").value = resume.skills || "";
        document.getElementById("projects").value = resume.projects || "";
    }

    function clearFormFields() {
        document.getElementById("name").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("college").value = "";
        document.getElementById("major").value = "";
        document.getElementById("gpa").value = "";
        document.getElementById("grad-date").value = "";
        document.getElementById("experience").value = "";
        document.getElementById("skills").value = "";
        document.getElementById("projects").value = "";
    }

    function collectFormData() {
        return {
            name: document.getElementById("name")?.value || "",
            address: document.getElementById("address")?.value || "",
            email: document.getElementById("email")?.value || "",
            phone: document.getElementById("phone")?.value || "",
            college: document.getElementById("college")?.value || "",
            major: document.getElementById("major")?.value || "",
            gpa: document.getElementById("gpa")?.value || "",
            gradDate: document.getElementById("grad-date")?.value || "",
            experience: document.getElementById("experience")?.value || "",
            skills: document.getElementById("skills")?.value || "",
            projects: document.getElementById("projects")?.value || ""
        };
    }

    function generatePreview() {
        const formData = collectFormData();
        
        if (!formData.name && !formData.address && !formData.email && !formData.phone && !formData.college && !formData.major && !formData.gpa && !formData.gradDate && !formData.experience && !formData.skills && !formData.projects) {
            alert('No data to preview');
            return;
        }
        
        const experience = formData.experience.split('\n').map(line => `<li>${line}</li>`).join('');
        const skills = formData.skills.split('\n').map(line => `<li>${line}</li>`).join('');
        const projects = formData.projects.split('\n').map(line => `<li>${line}</li>`).join('');

        const previewHTML = `
            <div>
                <h1>${formData.name}</h1>
                <p>${formData.address} | ${formData.email} | ${formData.phone}</p>
            </div>
            <div>
                <h2>Education</h2>
                <p>${formData.college}</p>
                <p>${formData.major}</p>
                <p>${formData.gpa ? `GPA: ${formData.gpa}` : ''}</p>
                <p>${formData.gradDate ? `Graduation Date: ${formData.gradDate}` : ''}</p>
            </div>
            <div>
                <h2>Experience</h2>
                <ul>${experience}</ul>
            </div>
            <div>
                <h2>Skills</h2>
                <ul>${skills}</ul>
            </div>
            <div>
                <h2>Projects</h2>
                <ul>${projects}</ul>
            </div>
        `;

        resumePreview.innerHTML = previewHTML;
        previewSection.style.display = "block"; 
    }

    //Next buttons
    nextBtns.forEach((btn) => {
        btn.addEventListener("click", function() {
            formSteps[currentStep].classList.remove("active");
            currentStep = (currentStep + 1) % formSteps.length;
            formSteps[currentStep].classList.add("active");
        });
    });

    //Back buttons
    backBtns.forEach((btn) => {
        btn.addEventListener("click", function() {
            formSteps[currentStep].classList.remove("active");
            currentStep = (currentStep - 1 + formSteps.length) % formSteps.length;
            formSteps[currentStep].classList.add("active");
        });
    });

    //Preview buttons
    previewBtns.forEach((btn) => {
    btn.addEventListener("click", function() {
        const lastIndex = formSteps.length - 1;
        generatePreview(lastIndex); 
    });
});

    //Save Resume button
    saveBtn.addEventListener("click", async function(event) {
        event.preventDefault();
        const formData = collectFormData();
        if (resumeId) {
            formData._id = resumeId;
            await updateResume(formData);
        } 
        else {
            await saveResume(formData);
        }
    });

    //Delete buttons
    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", deleteResume);
    });

});
