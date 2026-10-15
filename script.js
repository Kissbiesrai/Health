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

    // Prepare parameters using URLSearchParams
    const formData = new URLSearchParams();
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('message', document.getElementById('message').value);

    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Bypasses CORS restrictions on GitHub Pages
        body: formData
    })
    .then(() => {
        statusMessage.style.color = 'green';
        statusMessage.textContent = 'Thank you! Your response has been recorded.';
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
    })
    .catch(error => {
        console.error('Error!', error);
        statusMessage.style.color = 'red';
        statusMessage.textContent = 'Something went wrong. Please try again.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
    });
});
