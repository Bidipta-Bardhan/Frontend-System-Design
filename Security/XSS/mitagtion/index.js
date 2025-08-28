import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app=express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000;
app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      "default-src 'self';" + "script-src 'self' 'nonce-randomKey' 'unsafe-inline' http://unsecure.com; "
    );
    next();
})
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
})