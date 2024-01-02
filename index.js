import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import router from './server/src/routes/router.js';
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

// routes

app.use(router);

// server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});