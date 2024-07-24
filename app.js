// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const cupomRoutes = require('./routes/cupom.routes');
const recoveryRoutes = require('./routes/recovery.routes');
const connectToDatabase = require('./config/db.config');

const app = express();

connectToDatabase();

// Configuração do CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins === '*' || allowedOrigins.split(',').includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', userRoutes, cupomRoutes, recoveryRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});

module.exports = app;
