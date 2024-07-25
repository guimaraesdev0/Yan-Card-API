// app.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');
const cupomRoutes = require('./routes/cupom.routes');
const recoveryRoutes = require('./routes/recovery.routes');
const connectToDatabase = require('./config/db.config');

const app = express();

connectToDatabase();


app.use(bodyParser.json());
app.use('/api', userRoutes, cupomRoutes, recoveryRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});

module.exports = app;
