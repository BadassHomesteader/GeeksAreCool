/**
 * Main JavaScript file for GeeksAreCool website
 * Implements dark mode toggle and smooth scrolling
 */

// Dark Mode Functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved user preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the current theme
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    // Toggle dark/light mode when button is clicked
    darkModeToggle.addEventListener('click', function() {
        let theme;
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            theme = 'light';
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            theme = 'dark';
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL without jumping
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                location.hash = targetId;
            }
        }
    });
});

// Contact Form Submission
document.getElementById('contactForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const form = event.target;
    const messageDiv = document.getElementById('form-message');
    
    // Show sending state
    messageDiv.textContent = 'Sending message...';
    messageDiv.style.color = 'var(--text-color)';

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
        .then(function() {
            messageDiv.textContent = 'Message sent successfully!';
            messageDiv.style.color = 'green';
            form.reset();
        }, function(error) {
            messageDiv.textContent = 'Failed to send message. Please try again.';
            messageDiv.style.color = 'red';
            console.error('EmailJS error:', error);
        });
});

// TODO: Add animations for scroll-triggered elements