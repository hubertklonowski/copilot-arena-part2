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

// Gallery - Load photos from photos folder
function loadGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    // Sample data - in production, this would come from a backend
    const photos = [
        { name: 'Maine Coon 1', description: 'Piękny rudy Maine Coon' },
        { name: 'Maine Coon 2', description: 'Majestatyczny samiec' },
        { name: 'Maine Coon 3', description: 'Urocze kocięta' },
        { name: 'Maine Coon 4', description: 'Srebrny tabby' },
        { name: 'Maine Coon 5', description: 'Czarny Maine Coon' },
        { name: 'Maine Coon 6', description: 'Biały Maine Coon' },
        { name: 'Maine Coon 7', description: 'Rodzina Maine Coonów' },
        { name: 'Maine Coon 8', description: 'Młody Maine Coon' }
    ];

    // Try to load photos from the photos folder
    photos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = `photos/cat${index + 1}.jpg`;
        img.alt = photo.name;
        
        // Fallback to placeholder if image doesn't exist
        img.onerror = function() {
            this.src = `https://placekitten.com/400/30${index}`;
        };
        
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.innerHTML = `<h3>${photo.name}</h3><p>${photo.description}</p>`;
        
        item.appendChild(img);
        item.appendChild(overlay);
        galleryGrid.appendChild(item);
    });
}

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

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', function() {
    loadGallery();
});