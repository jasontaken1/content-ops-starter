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

// Close modal with close button or pressing escape
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('passwordModal').style.display = "none";
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.getElementById('passwordModal').style.display = "none";
    }
});