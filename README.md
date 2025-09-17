# Gate 7 Coffee Roastery

A static coming soon page for Gate 7 Coffee Roastery, designed to be hosted on GitHub Pages.

## Project Structure

```
gate7-coffee/
├── index.html          # Landing page
└── css/               # Stylesheets
    └── style-gate7.css
```

## Features

- Modern, responsive landing page
- Clean, minimalist design
- Smooth animations and transitions
- Mobile-friendly
- Zero server dependencies - 100% static
- Simple email collection with todo.md tracking

## Managing Email Notifications

When someone submits their email:
1. The form will show a success message with the email entry
2. The entry is automatically copied to your clipboard
3. Paste the entry into `todo.md`
4. Check off each email `[x]` as you send notifications

Example todo.md entry:
```markdown
- [ ] Send opening notification to: example@email.com (added: 9/18/2025, 2:00:00 PM)
```

## Hosting on GitHub Pages

1. Create a new repository on GitHub
2. Push this code to your repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
3. Go to your repository's Settings > Pages
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/" (root) folder
6. Click Save and wait for deployment
7. Your site will be available at `https://YOUR_USERNAME.github.io/REPO_NAME`

## Development

This is a static website that can be served using any web server. For local development:

1. Using Python (Python 3):
   ```bash
   python -m http.server 8000
   ```
   Then visit http://localhost:8000

2. Using VS Code:
   - Install "Live Server" extension
   - Right click on index.html and select "Open with Live Server"

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

3. Access the website at http://localhost:3000

## Environment Variables

The following environment variables can be set:
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment (development/production)

## Technologies Used

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Google Fonts (Roboto, Playfair Display)

- Backend:
  - Node.js
  - Express
  - Nodemailer
  - CORS

## Development

The project uses nodemon for development to automatically restart the server when files change. Use `npm run dev` to start the development server.

## Switch to client-side email (remove Node.js)

This project originally used a small Node.js server (`server/`) with `nodemailer` to send subscription emails. If you'd prefer to remove the server and send emails directly from the browser (no Node.js required), follow these steps:

1. Sign up for EmailJS (https://www.emailjs.com) or another client-side email provider (Formspree, Getform, etc.).
2. Create a service and an email template in EmailJS. Add a template parameter for the user's email (for example `user_email`).
3. In `public/index.html` replace the placeholders:
  - `YOUR_PUBLIC_KEY` with your EmailJS public key (safe to include in client-side code).
  - `YOUR_SERVICE_ID` with the EmailJS service ID.
  - `YOUR_TEMPLATE_ID` with the EmailJS template ID.
4. Optionally test using EmailJS's testing tools or from your site.

To fully remove Node.js from this project (optional):

1. Delete the `server/` folder and its `package.json`.
2. Remove any deployment steps that rely on running the Node.js server.

Notes and security:
- Sending emails from the client requires a third-party service (EmailJS, Formspree, etc.). Client-side only solutions are easier to host (static sites) but may have limitations (rate limits, template control, and anti-spam rules).
- Do not put private SMTP credentials in client-side code. Use services designed for client-side usage.