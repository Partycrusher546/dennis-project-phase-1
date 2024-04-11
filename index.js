window.addEventListener('DOMContentLoaded', () => {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            displayJobListings(data);
            displayJobAlerts(data);
        })
        .catch(error => console.error('Error loading data:', error));
});

function displayJobListings(data) {
    const jobPostingsContainer = document.getElementById('job-postings');
    data.jobs.forEach(job => {
        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');
        jobCard.setAttribute('id', `job-${job.id}`); // Set unique ID for each job card
        jobCard.innerHTML = `
            <h2>${job.title}</h2>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Salary:</strong> ${job.salary}</p>
            <p><strong>Description:</strong> ${job.description}</p>
            <img src="${job.url}" alt="Job Image">
            <button onclick="applyForJob(${job.id})">Apply</button>
        `;
        jobPostingsContainer.appendChild(jobCard);
    });
}

function displayJobAlerts(data) {
    const jobAlertsContainer = document.getElementById('job-alerts');
    data.jobAlerts.forEach(alert => {
        const alertItem = document.createElement('div');
        alertItem.classList.add('job-alert');
        alertItem.innerHTML = `
            <p><strong>Title:</strong> ${alert.title}</p>
            <p><strong>Description:</strong> ${alert.description}</p>
            <p><strong>Location:</strong> ${alert.location}</p>
            <p><strong>Salary:</strong> ${alert.salary}</p>
        `;
        jobAlertsContainer.appendChild(alertItem);
    });
}

function applyForJob(jobId) {
    const jobCard = document.getElementById(`job-${jobId}`);
    const jobForm = `
        <form id="job-application-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br>
            <label for="resume">Resume:</label>
            <input type="file" id="resume" name="resume" accept=".pdf,.doc,.docx" required><br>
            <button type="submit">Submit Application</button>
        </form>
    `;
    jobCard.innerHTML = jobForm;

    const jobApplicationForm = document.getElementById('job-application-form');
    jobApplicationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(jobApplicationForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const resume = formData.get('resume');

        if (name && email && resume) {
            alert('Application submitted successfully!');
        } else {
            alert('Please fill out all fields.');
        }
    });
}
// Function to toggle between light and dark mode
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
}

// Add event listener to the theme toggle button
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', toggleTheme);
