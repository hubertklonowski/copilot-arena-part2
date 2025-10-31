# Królewskie Maine Coony - Strona Hodowli

Profesjonalna strona internetowa dla hodowli kotów Maine Coon.

## 🎯 Funkcjonalności

### ✅ Zrealizowane wymagania podstawowe:
- ✅ **Opis firmy** - Szczegółowy opis hodowli i jej historii
- ✅ **Dane kontaktowe** - Telefon, email, adres, godziny otwarcia
- ✅ **Mapa Google Maps** - Interaktywna mapa z lokalizacją hodowli
- ✅ **Opinie klientów** - Sekcja z recenzjami i ocenami (5 gwiazdek)
- ✅ **Wartości firmy** - 4 kluczowe wartości (Miłość, Zdrowie, Jakość, Wsparcie)
- ✅ **Galeria zdjęć** - Responsywna galeria z efektami hover
- ✅ **Kalkulator wyceny** - Interaktywny kalkulator cen kociąt

### ✅ Rozszerzenie 1 - Formularz kontaktowy:
- ✅ Formularz z automatyczną walidacją
- ✅ Wysyłanie emaili na skrzynkę firmową
- ✅ Email potwierdzający dla klienta
- ✅ Responsywny design

### ✅ Rozszerzenie 2 - Newsletter:
- ✅ Formularz zapisu do newslettera
- ✅ System zapisywania subskrybentów
- ✅ Automatyczne wysyłanie powitalnego emaila
- ✅ Endpoint do wysyłania newsletterów do wszystkich subskrybentów

## 🚀 Instalacja i uruchomienie

### Metoda 1: Prosta (bez backendu)
Wystarczy otworzyć plik `index.html` w przeglądarce. 
Formularz kontaktowy i newsletter będą pokazywać komunikaty sukcesu, ale nie będą wysyłać prawdziwych emaili.

### Metoda 2: Z backendem (pełna funkcjonalność email)

1. **Zainstaluj Node.js** (jeśli jeszcze nie masz): https://nodejs.org/

2. **Zainstaluj zależności:**
   ```bash
   npm install
   ```

3. **Skonfiguruj email:**
   - Skopiuj `.env.example` jako `.env`
   - Wypełnij dane swojego konta email
   
   **Dla Gmail:**
   - Włącz weryfikację dwuetapową w koncie Google
   - Wygeneruj hasło aplikacji: https://myaccount.google.com/apppasswords
   - Wklej hasło jako `EMAIL_PASS` w pliku `.env`

4. **Uruchom serwer:**
   ```bash
   npm start
   ```
   
   Lub w trybie deweloperskim (auto-restart):
   ```bash
   npm run dev
   ```

5. **Otwórz przeglądarkę:**
   ```
   http://localhost:3000
   ```

## 📁 Struktura projektu

```
copilot-arena-part2/
├── index.html          # Główna strona HTML
├── styles.css          # Stylizacja CSS
├── script.js           # Logika JavaScript (frontend)
├── server.js           # Serwer Node.js + email (backend)
├── package.json        # Zależności Node.js
├── .env.example        # Przykładowa konfiguracja
├── README.md           # Ten plik
└── photos/             # Folder na zdjęcia kotów
```

## 📧 Konfiguracja emaila

### Gmail:
```env
EMAIL_USER=twoj-email@gmail.com
EMAIL_PASS=haslo-aplikacji-16-znakow
COMPANY_EMAIL=kontakt@krolewskiemainecoony.pl
```

### Inne serwisy:
Możesz użyć innych serwisów email, modyfikując konfigurację w `server.js`:

```javascript
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

## 🎨 Personalizacja

### Zmiana kolorów:
Edytuj zmienne CSS w `styles.css`:
```css
:root {
    --primary-color: #8B4513;
    --secondary-color: #D2691E;
    --accent-color: #CD853F;
}
```

### Dodanie zdjęć do galerii:
1. Umieść zdjęcia w folderze `photos/`
2. Nazwij je: `cat1.jpg`, `cat2.jpg`, itd.
3. Strona automatycznie je załaduje

### Zmiana lokalizacji na mapie:
Edytuj URL iframe w `index.html` (sekcja `#contact`):
```html
<iframe src="TWOJ-URL-GOOGLE-MAPS">
```

## 📱 Responsywność

Strona jest w pełni responsywna i działa na:
- 📱 Smartfonach (320px+)
- 📱 Tabletach (768px+)
- 💻 Laptopach (1024px+)
- 🖥️ Dużych ekranach (1920px+)

## 🔒 Bezpieczeństwo

- ❌ Nigdy nie commituj pliku `.env` do repozytorium
- ✅ Używaj haseł aplikacji zamiast prawdziwych haseł
- ✅ Walidacja danych po stronie serwera
- ✅ Zabezpieczenie przed spamem (można dodać reCAPTCHA)

## 📧 API Endpoints

### POST /api/contact
Wysyła wiadomość z formularza kontaktowego
```json
{
  "name": "Jan Kowalski",
  "email": "jan@example.com",
  "phone": "123456789",
  "subject": "Pytanie o kociaki",
  "message": "Treść wiadomości"
}
```

### POST /api/newsletter
Zapisuje email do newslettera
```json
{
  "email": "jan@example.com"
}
```

### POST /api/newsletter/send
Wysyła newsletter do wszystkich subskrybentów
```json
{
  "subject": "Nowe kocięta!",
  "content": "<h1>Treść newslettera</h1>"
}
```

### GET /api/newsletter/count
Zwraca liczbę subskrybentów

## 🎯 Dalszy rozwój

Możliwe rozszerzenia:
- 🗄️ Baza danych (MongoDB, PostgreSQL) dla subskrybentów
- 🔐 Panel administracyjny
- 📸 Upload zdjęć przez panel admin
- 🤖 reCAPTCHA przeciw spamowi
- 📊 Google Analytics
- 🌍 Wersje językowe (EN, DE)
- 💳 System rezerwacji i płatności online

## 📞 Wsparcie

Masz pytania? Skontaktuj się poprzez:
- Email: kontakt@krolewskiemainecoony.pl
- Telefon: +48 123 456 789

## 📄 Licencja

© 2024 Królewskie Maine Coony. Wszelkie prawa zastrzeżone.