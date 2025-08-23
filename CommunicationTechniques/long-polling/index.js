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
const waitingClients=[];
app.get('/getData',(req,res)=>{
    if(data!==req.query.lastData){
    res.status(200).send({
        data
    })
}else{
    waitingClients.push(res);
}
})
app.get('/updateData',(req,res)=>{
    data=req.query.data;
    while(waitingClients.length>0)
    {
        const client=waitingClients.pop();
        client.status(200).send({data});
    }
    res.status(200).send({
        data
    })
    
})
app.listen(PORT,()=>{
    console.log(`Server is listnening at ${PORT}`);
})