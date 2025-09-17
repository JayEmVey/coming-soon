const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Notification file path
const notificationFile = path.join(__dirname, '..', 'notification-coming-soon.md');

// Save notification endpoint
app.post('/save-notification', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    // Format the new entry with timestamp
    const entry = `\n- ${email} (added: ${new Date().toISOString()})`;

    // Append to the markdown file
    await fs.appendFile(notificationFile, entry, 'utf8');
    
    res.json({ message: 'Notification saved successfully' });
  } catch (error) {
    console.error('Error saving notification:', error);
    res.status(500).json({ message: 'Error saving notification' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
    
    res.json({ message: 'Notification saved successfully' });
  } catch (error) {
    console.error('Error saving notification:', error);
    res.status(500).json({ message: 'Error saving notification' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

    res.json({ message: 'Thank you for subscribing! Check your email for confirmation.' });
  } catch (error) {
    console.error('Error:', error);
    let errorMessage = 'Error sending email. Please try again later.';
    
    if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Unable to connect to email server. Please try again later.';
    } else if (error.code === 'ETIMEDOUT') {
      errorMessage = 'Connection to email server timed out. Please try again later.';
    } else if (error.responseCode >= 500) {
      errorMessage = 'Email server error. Please try again later.';
    }

    res.status(500).json({ message: errorMessage });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});