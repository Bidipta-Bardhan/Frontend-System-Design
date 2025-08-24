import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const app=express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT=5111;
// Middleware
app.use(bodyParser.json());

app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Cache-Control', 'no-cache');
    res.write(`data:Welcome to Server Sent Event\n\n`);
    const intervalId = setInterval(() => {
      res.write(`data:Server Time ${new Date().toLocaleString()}\n\n`)  
    }, 5000)
    req.on('close', () => {
        clearInterval(intervalId);
    })
})

// Route to serve your HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT,()=>{
    console.log(`Server is listnening at ${PORT}`);
})