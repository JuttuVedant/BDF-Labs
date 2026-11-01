// Lab 1, Task 3: A basic server using Node.js' built-in http module.
const http = require('http');

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Hello');
});

server.listen(3000, () => {
  console.log('Basic HTTP server running at http://localhost:3000');
});
