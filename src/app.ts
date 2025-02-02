import express, { Application, Request, Response } from 'express';
import { handleErrors } from './errors/handlingErrors';
import router from './app/routes';
import cors from 'cors';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors({ origin: 'https://gear-node.vercel.app', credentials: true }));
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


// home route
app.get('/', (_req: Request, res: Response) => {
    res.send('Welcome to 🏍🏍🏍 GearNode 🏍🏍🏍');
});

// App routes
app.use('/', router);


// global error handler
app.use(handleErrors);

export default app;
