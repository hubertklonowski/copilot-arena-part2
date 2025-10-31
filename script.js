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

// Contact Form Handler (EmailJS) with extended error logging & fallback
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const messageDiv = document.getElementById('formMessage');
    messageDiv.className = 'form-message';
    messageDiv.textContent = '';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Walidacja
    const errors = [];
    if(!name) errors.push('Imię i nazwisko');
    if(!email) errors.push('Email');
    if(!subject) errors.push('Temat');
    if(!message) errors.push('Wiadomość');
    if(errors.length) {
        messageDiv.className = 'form-message error';
        messageDiv.textContent = 'Uzupełnij: ' + errors.join(', ');
        return;
    }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        messageDiv.className = 'form-message error';
        messageDiv.textContent = 'Niepoprawny email.';
        return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Wysyłanie...';

    try {
        const templateParams = {
            to_email: email,
            from_name: name,
            from_email: 'emailsendertosendemails@gmail.com',
            phone: phone || 'Nie podano',
            subject: subject,
            message: message,
            current_date: new Date().toLocaleString('pl-PL')
        };

        // Use config for EmailJS
        let sendSucceeded = false;
        try {
                       emailjs.init('<SECRET_KEY>');
            await emailjs.send('<SERVICE_ID>', '<TEMPLATE_ID>', templateParams);
            sendSucceeded = true;
        } catch(errPrimary) {
            console.error('EmailJS primary send error:', {
                status: errPrimary?.status,
                text: errPrimary?.text,
                raw: errPrimary
            });
            // Fallback tylko jeśli błąd klucza lub 400
            if (errPrimary?.status === 400 || errPrimary?.status === 422) {
                console.warn('Attempting fallback fetch to EmailJS REST API...');
                try {
                    const resp = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            service_id: '<SERVICE_ID>',
                            template_id: '<TEMPLATE_ID>',
                            template_params: templateParams
                        })
                    });
                    if (!resp.ok) {
                        const txt = await resp.text();
                        throw new Error('Fallback response not ok: ' + txt);
                    }
                    sendSucceeded = true;
                } catch(errFallback) {
                    console.error('Fallback REST API failed:', errFallback);
                }
            }
        }

        if (sendSucceeded) {
            messageDiv.className = 'form-message success';
            messageDiv.textContent = 'Dziękujemy! Wiadomość została wysłana.';
            this.reset();
        } else {
            throw new Error('Brak powodzenia wysyłki');
        }
    } catch(err) {
        console.error('Final send error:', err);
        messageDiv.className = 'form-message error';
        messageDiv.textContent = 'Nie udało się wysłać wiadomości. Sprawdź klucz EmailJS.';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Wyślij wiadomość';
        setTimeout(()=>{
            messageDiv.className = 'form-message';
            messageDiv.textContent = '';
        }, 6000);
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

// Interactive Gallery Carousel
let currentSlideIndex = 0;

// Initialize gallery
function initGallery() {
    const slides = document.querySelectorAll('.gallery-slide');
    const totalSlides = slides.length;
    
    // Create dots
    const dotsContainer = document.getElementById('galleryDots');
    if (dotsContainer) {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            dot.onclick = () => goToSlide(i);
            dotsContainer.appendChild(dot);
        }
    }
    
    // Update counter
    updateCounter();
}

// Change slide
function changeSlide(direction) {
    const slides = document.querySelectorAll('.gallery-slide');
    const totalSlides = slides.length;
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlideIndex].classList.remove('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.remove('active');
    }
    
    currentSlideIndex += direction;
    
    // Loop around
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
    updateCounter();
}

// Go to specific slide
function goToSlide(index) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides[currentSlideIndex].classList.remove('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.remove('active');
    }
    
    currentSlideIndex = index;
    
    slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
    updateCounter();
}

// Update counter
function updateCounter() {
    const slides = document.querySelectorAll('.gallery-slide');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlidesEl = document.getElementById('totalSlides');
    
    if (currentSlideEl && totalSlidesEl) {
        currentSlideEl.textContent = currentSlideIndex + 1;
        totalSlidesEl.textContent = slides.length;
    }
}

// Keyboard navigation for gallery
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

// Initialize gallery on page load
window.addEventListener('load', function() {
    initGallery();
});