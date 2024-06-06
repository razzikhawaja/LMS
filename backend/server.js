// In server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const borrowRoutes = require('./routes/borrow');
const authRoutes = require('./routes/auth');

app.use('/api', bookRoutes);
app.use('/api', userRoutes);
app.use('/api', borrowRoutes);
app.use('/api', authRoutes);

app.listen(port, () => {
    console.log(`Library management system running on http://localhost:${port}`);
});
