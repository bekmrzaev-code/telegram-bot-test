import express from 'express';
import './bot/index.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Bot is running 🚀');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});