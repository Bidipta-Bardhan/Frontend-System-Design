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

// Route to serve your HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
let data="Initial Data";
app.get('/getData',(req,res)=>{
    res.status(200).send({
        data
    })
})
app.get('/updateData',(req,res)=>{
    data="Updated Data"
    res.status(200).send({
        data
    })
})
app.listen(PORT,()=>{
    console.log(`Server is listnening at ${PORT}`);
})