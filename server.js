// Lab 1, Tasks 4-6: Express server with the required routes.
const express = require('express');

const app = express();
const PORT = 3000;

// GET / - welcome message
app.get('/', (request, response) => {
  response.status(200).send('Welcome to my Node.js and Express server!');
});

// GET /about - name and section as JSON
app.get('/about', (request, response) => {
  response.status(200).json({
    name: 'Juttu Vedant',
    section: 'Gen AI 2A(304)'
  });
});

// GET /time - current date and time
app.get('/time', (request, response) => {
  response.status(200).json({
    currentDateTime: new Date().toString()
  });
});

// 404 handler for every unknown route
app.use((request, response) => {
  response.status(404).json({
    message: '404 - Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
