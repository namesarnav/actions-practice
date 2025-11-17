const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send(`
        <!doctype html>
        <html>
            <head><meta charset="utf-8"><title>Express App</title></head>
            <body>
                <h1>Hello from Express</h1>
                <p><a href="/health">/health</a></p>
            </body>
        </html>
    `);
});

app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now()
    });
});

const port = process.env.PORT || 3000;


module.exports = app;

const server = app.listen(port, () => {
    console.log(`Listening on http://0.0.0.0:${port}`);
});

// graceful shutdown
const shutdown = (signal) => {
    console.log(`Received ${signal}, shutting down...`);
    server.close(() => process.exit(0));
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
