import express from 'express';
import 'dotenv/config';
import userRouter from "./routes/user.routes.js"
const app = express();

const PORT = 3000 ?? process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    return res.json({message: "server is running fine"})
})

app.use('/user', userRouter);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
