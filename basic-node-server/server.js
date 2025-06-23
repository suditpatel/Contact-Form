const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(__dirname + '/data/index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading file');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && req.url === '/submit') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const parsedData = new URLSearchParams(body);
      const name = parsedData.get('name');
      const message = parsedData.get('message');

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h1>Thank you, ${name}!</h1><p>Your message: ${message}</p>`);
    });
  } else {
    res.writeHead(404);
    res.end('Page not found');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


