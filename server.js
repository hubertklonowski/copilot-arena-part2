// Simple Node.js server with email functionality
// To use this, you need to install dependencies: npm install express nodemailer dotenv

const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // lub inny serwis email
    auth: {
        user: process.env.EMAIL_USER, // Twój email
        pass: process.env.EMAIL_PASS  // Hasło aplikacji
    }
});

// Newsletter subscribers storage (in production, use a database)
const newsletterSubscribers = [];

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.COMPANY_EMAIL || 'kontakt@krolewskiemainecoony.pl',
        subject: `Nowa wiadomość: ${subject}`,
        html: `
            <h2>Nowa wiadomość z formularza kontaktowego</h2>
            <p><strong>Imię i nazwisko:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Telefon:</strong> ${phone || 'Nie podano'}</p>
            <p><strong>Temat:</strong> ${subject}</p>
            <p><strong>Wiadomość:</strong></p>
            <p>${message}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        
        // Send confirmation email to sender
        const confirmationMail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Potwierdzenie otrzymania wiadomości - Królewskie Maine Coony',
            html: `
                <h2>Dziękujemy za kontakt!</h2>
                <p>Szanowny/a ${name},</p>
                <p>Otrzymaliśmy Twoją wiadomość i odpowiemy najszybciej jak to możliwe.</p>
                <p>Treść Twojej wiadomości:</p>
                <p><strong>Temat:</strong> ${subject}</p>
                <p>${message}</p>
                <br>
                <p>Pozdrawiamy,<br>Zespół Królewskie Maine Coony</p>
            `
        };
        
        await transporter.sendMail(confirmationMail);
        
        res.json({ success: true, message: 'Wiadomość została wysłana' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, message: 'Błąd wysyłania wiadomości' });
    }
});

// Newsletter subscription endpoint
app.post('/api/newsletter', async (req, res) => {
    const { email } = req.body;

    // Check if already subscribed
    if (newsletterSubscribers.includes(email)) {
        return res.status(400).json({ 
            success: false, 
            message: 'Ten adres email jest już zapisany do newslettera' 
        });
    }

    // Add to subscribers
    newsletterSubscribers.push(email);

    // Send welcome email
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Witamy w newsletterze - Królewskie Maine Coony',
        html: `
            <h2>Dziękujemy za zapisanie się do newslettera!</h2>
            <p>Od teraz będziesz otrzymywać informacje o:</p>
            <ul>
                <li>Dostępnych kociętkach Maine Coon</li>
                <li>Nadchodzących miotach</li>
                <li>Poradach dotyczących opieki nad Maine Coonami</li>
                <li>Wydarzeniach i wystawach</li>
            </ul>
            <p>Możesz wypisać się z newslettera w każdej chwili.</p>
            <br>
            <p>Pozdrawiamy,<br>Zespół Królewskie Maine Coony</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Dziękujemy za subskrypcję!' });
    } catch (error) {
        console.error('Error sending newsletter confirmation:', error);
        res.status(500).json({ success: false, message: 'Błąd zapisywania do newslettera' });
    }
});

// Newsletter blast endpoint (for sending newsletters to all subscribers)
app.post('/api/newsletter/send', async (req, res) => {
    const { subject, content } = req.body;

    if (newsletterSubscribers.length === 0) {
        return res.status(400).json({ 
            success: false, 
            message: 'Brak subskrybentów newslettera' 
        });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        bcc: newsletterSubscribers, // Send to all subscribers
        subject: subject,
        html: `
            ${content}
            <br><br>
            <p style="font-size: 12px; color: #888;">
                Otrzymujesz tę wiadomość, ponieważ zapisałeś się do newslettera Królewskie Maine Coony.
                <br>Aby wypisać się z newslettera, kliknij tutaj.
            </p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ 
            success: true, 
            message: `Newsletter wysłany do ${newsletterSubscribers.length} subskrybentów` 
        });
    } catch (error) {
        console.error('Error sending newsletter:', error);
        res.status(500).json({ success: false, message: 'Błąd wysyłania newslettera' });
    }
});

// Get newsletter subscribers count
app.get('/api/newsletter/count', (req, res) => {
    res.json({ count: newsletterSubscribers.length });
});

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});