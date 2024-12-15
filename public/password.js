function checkPassword() {
    document.getElementById('passwordModal').style.display = "block";
}

document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    if (password === 'jfg') {
        document.getElementById('passwordModal').style.display = "none";
    } else {
        alert('Incorrect password. Please try again.');
    }
});

// Close modal with close button or pressing escape now redirects to google.com
document.querySelector('.close').addEventListener('click', function() {
    window.location.href = 'https://www.google.com';
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        window.location.href = 'https://www.google.com';
    }
});

// Handle modal click outside form (assuming user wants to cancel)
window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('passwordModal')) {
        window.location.href = 'https://www.google.com';
    }
});

// Prevent accessing content without authentication
document.getElementById('app').style.display = 'none';

// Show content if correct password is entered
document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    if (password === 'jfg') {
        document.getElementById('passwordModal').style.display = "none";
        document.getElementById('app').style.display = 'block';
    } else {
        alert('Incorrect password. Please try again.');
    }
});