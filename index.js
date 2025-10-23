import express from 'express';
import 'dotenv/config';
import userRouter from "./routes/user.routes.js"
import urlRouter from './routes/url.routes.js'
import { authenticationMiddleware } from './middlewares/auth.middleware.js';
const app = express();

const PORT = 3000 ?? process.env.PORT;

app.use(express.json());
app.use(authenticationMiddleware);

app.get('/', (req, res) => {
    return res.json({message: "server is running fine"})
})

app.use('/user', userRouter);
app.use(urlRouter)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
