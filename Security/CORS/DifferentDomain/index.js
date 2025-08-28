import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 5111;
const allowedOrigin = ["http://127.0.0.1:5500"];
const corsOption = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigin.indexOf(origin) != -1)
        {
            callback(null, true);
        } else {
             callback(new Error("Not allowed by CORS"));
        }
    }
}
app.use(cors(corsOption))
app.get('/', (req, res) => {
    res.send({
        id: '1',
        data: 'Frontend System Design'
    })
})
app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`)
})
