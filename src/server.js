import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRouter from "./routes/auth.js";
import booksRouter from "./routes/books.js"

const PORTA = 3000;
const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/books', booksRouter);
    
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});
