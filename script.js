const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;

// Configurez le transporteur de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Vous pouvez utiliser un autre service de messagerie si nécessaire
    auth: {
        user: 'votre-email@gmail.com',
        pass: 'votre-mot-de-passe'
    }
});

// Fonction pour envoyer un email
function sendEmail(ipAddress) {
    const mailOptions = {
        from: 'votre-email@gmail.com',
        to: 'stalaxofficiel@gmail.com.com', // Adresse où vous souhaitez recevoir les emails
        subject: 'Nouvelle requête reçue',
        text: `Une nouvelle requête a été reçue depuis l'adresse IP : ${ipAddress}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erreur lors de l’envoi de l’email:', error);
        } else {
            console.log('Email envoyé:', info.response);
        }
    });
}

// Endpoint de suivi
app.get('/track', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    sendEmail(ip);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});