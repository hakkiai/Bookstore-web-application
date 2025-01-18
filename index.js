import express from "express";
import {PORT, monoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoutes from './Routes/booksRoutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors())


app.use(cors({
    origin: 'http://127.0.0.1:5500', // or 'http://localhost:5500'
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.get('/', (request, response)=> {
    console.log(request)
    return response.status(234).send(`Welcome To my website`)
});

app.use('/books', booksRoutes);

mongoose
    .connect(monoDBURL)
    .then(() => {
        console.log('App connect to database');
        app.listen(PORT, ()=> {
            console.log(`App is Listening to port : ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
