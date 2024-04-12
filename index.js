window.addEventListener('DOMContentLoaded', () => {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            displayJobListings(data.jobs);
            displayJobAlerts(data.jobAlerts);
        })
        .catch(error => console.error('Error loading data:', error));
});

function displayJobListings(jobs) {
    const jobPostingsContainer = document.getElementById('job-postings');
    jobPostingsContainer.innerHTML = ''; 

    jobs.forEach(job => {
        const jobCard = createJobCard(job);
        jobPostingsContainer.appendChild(jobCard);
    });
}

function createJobCard(job) {
    const jobCard = document.createElement('div');
    jobCard.classList.add('job-card');
    jobCard.setAttribute('id', `job-${job.id}`); 
    jobCard.innerHTML = `
        <h2>${job.title}</h2>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p><strong>Salary:</strong> ${job.salary}</p>
        <p><strong>Description:</strong> ${job.description}</p>
        <img src="${job.url}" alt="Job Image">
        <button onclick="applyForJob(${job.id})">Apply</button>
    `;
    return jobCard;
}

function displayJobAlerts(alerts) {
    const jobAlertsContainer = document.getElementById('job-alerts');
    jobAlertsContainer.innerHTML = ''; // Clear previous alerts

    alerts.forEach(alert => {
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
            window.location.reload();
        } else {
            alert('Please fill out all fields.');
        }
    });
}

function filterJobListings() {
    const salaryFilter = document.getElementById('salary-filter').value;
    const locationFilter = document.getElementById('location-filter').value;

    function filterJobListings() {
        const salaryFilter = document.getElementById('salary-filter').value;
        const locationFilter = document.getElementById('location-filter').value;
    
        fetch('db.json')
            .then(response => response.json())
            .then(data => {
                let filteredJobs = data.jobs;
    
                if (salaryFilter !== 'Any') {
                    filteredJobs = filteredJobs.filter(job => job.salary.includes(salaryFilter));
                }
    
                if (locationFilter !== 'Any') {
                    filteredJobs = filteredJobs.filter(job => job.location === locationFilter);
                }
    
                displayJobListings(filteredJobs);
            })
            .catch(error => console.error('Error loading data:', error));
    }
}    
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
}


const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', toggleTheme);


const filterBtn = document.getElementById('filter-btn');
filterBtn.addEventListener('click', filterJobListings);
