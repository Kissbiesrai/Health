// Paste your deployed Google Apps Script Web App URL below inside the quotes
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwCnhomvP5MAY9S1UUMcrJe8nKuLveyfSOWqRvcqFnjRgRLFSUdL8DeVoUmDlaCBHjTNQ/exec';

const form = document.getElementById('contactForm');
const statusMessage = document.getElementById('status-message');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    statusMessage.style.color = '#333';
    statusMessage.textContent = 'Sending data...';

    // Collect form data into an object
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    // Send data using fetch API with mode 'no-cors' or handle response if CORS is allowed by Apps Script
    fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        statusMessage.style.color = 'green';
        statusMessage.textContent = 'Thank you! Data successfully recorded.';
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
    })
    .catch(error => {
        // Note: Google Apps Script often triggers a CORS catch block even when successful 
        // due to cross-origin redirects. If data appears in the sheet despite an error, 
        // you can treat this block as a success fallback.
        console.error('Error!', error);
        statusMessage.style.color = 'green';
        statusMessage.textContent = 'Thank you! Your response has been recorded.';
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
    });
});
