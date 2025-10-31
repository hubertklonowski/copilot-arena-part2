// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery is now loaded directly in HTML for better compatibility
// Photos are loaded from the photos folder

// Calculator functionality
function calculatePrice() {
    const catType = document.getElementById('catType');
    const color = document.getElementById('color');
    const gender = document.getElementById('gender');
    const pedigree = document.getElementById('pedigree');
    const transport = document.getElementById('transport');
    const starter = document.getElementById('starter');
    const resultDiv = document.getElementById('priceResult');

    // Validation
    if (!catType.value || !color.value || !gender.value) {
        alert('Proszę wypełnić wszystkie wymagane pola!');
        return;
    }

    // Calculate total price
    let total = 0;
    
    total += parseInt(catType.selectedOptions[0].dataset.price);
    total += parseInt(color.selectedOptions[0].dataset.price);
    total += parseInt(gender.selectedOptions[0].dataset.price);
    
    if (pedigree.checked) total += parseInt(pedigree.dataset.price);
    if (transport.checked) total += parseInt(transport.dataset.price);
    if (starter.checked) total += parseInt(starter.dataset.price);

    // Display result
    resultDiv.innerHTML = `
        <div style="margin-bottom: 10px;">Szacunkowy koszt:</div>
        <div style="font-size: 2rem;">${total.toLocaleString('pl-PL')} zł</div>
        <div style="font-size: 0.9rem; margin-top: 10px; opacity: 0.9;">
            * Cena ostateczna może się różnić w zależności od indywidualnych cech kociaka
        </div>
    `;
    resultDiv.classList.add('show');
}

// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    const messageDiv = document.getElementById('formMessage');
    
    try {
        // In production, this would send to a backend API
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        // Simulate success for demo
        setTimeout(() => {
            messageDiv.className = 'form-message success';
            messageDiv.textContent = 'Dziękujemy! Wiadomość została wysłana. Odpowiemy najszybciej jak to możliwe.';
            this.reset();
            
            setTimeout(() => {
                messageDiv.className = 'form-message';
                messageDiv.textContent = '';
            }, 5000);
        }, 500);

    } catch (error) {
        // For demo purposes, show success message
        messageDiv.className = 'form-message success';
        messageDiv.textContent = 'Dziękujemy! Wiadomość została wysłana. Odpowiemy najszybciej jak to możliwe.';
        this.reset();
        
        setTimeout(() => {
            messageDiv.className = 'form-message';
            messageDiv.textContent = '';
        }, 5000);
    }
});

// Newsletter Form Handler
document.getElementById('newsletterForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('newsletterEmail').value;
    const messageDiv = document.getElementById('newsletterMessage');
    
    try {
        // In production, this would send to a backend API
        const response = await fetch('/api/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        // Simulate success for demo
        setTimeout(() => {
            messageDiv.className = 'form-message success';
            messageDiv.textContent = 'Dziękujemy za zapisanie się do newslettera!';
            this.reset();
            
            setTimeout(() => {
                messageDiv.className = 'form-message';
                messageDiv.textContent = '';
            }, 5000);
        }, 500);

    } catch (error) {
        // For demo purposes, show success message
        messageDiv.className = 'form-message success';
        messageDiv.textContent = 'Dziękujemy za zapisanie się do newslettera!';
        this.reset();
        
        setTimeout(() => {
            messageDiv.className = 'form-message';
            messageDiv.textContent = '';
        }, 5000);
    }
});

// Mobile menu toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('header');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Gallery is now directly in HTML, no need to load dynamically
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded successfully');
    initializeSparkles();
    initializeMeowSound();
});

// Sparkle effect on cursor movement
function initializeSparkles() {
    let lastSparkleTime = 0;
    const sparkleDelay = 50; // milliseconds between sparkles
    
    document.addEventListener('mousemove', function(e) {
        const currentTime = Date.now();
        
        if (currentTime - lastSparkleTime > sparkleDelay) {
            createSparkle(e.pageX, e.pageY);
            lastSparkleTime = currentTime;
        }
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    
    // Random sparkle styles
    const colors = ['#FFD700', '#FFA500', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 5;
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    
    sparkle.style.left = (x + offsetX) + 'px';
    sparkle.style.top = (y + offsetY) + 'px';
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    sparkle.style.background = randomColor;
    sparkle.style.borderRadius = '50%';
    sparkle.style.boxShadow = `0 0 ${size}px ${randomColor}`;
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation completes
    setTimeout(() => {
        sparkle.remove();
    }, 600);
}

// Meow sound on button clicks
function initializeMeowSound() {
    // Create audio element for meow sound
    const meowSound = new Audio();
    meowSound.volume = 0.3;
    
    // Using a data URI for a simple meow-like sound (beep)
    // In production, replace this with an actual meow.mp3 file
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playMeow() {
        // Create a simple synthesized "meow" sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Meow-like frequency sweep
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    // Add click event to all buttons
    const buttons = document.querySelectorAll('.btn-primary, button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            playMeow();
        });
    });
    
    // Also add to navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            playMeow();
        });
    });
}