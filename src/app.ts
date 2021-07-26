
import express from "express";
import { Request, Response } from 'express';
import config from "./config/config";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import { User } from './models/User';

//???
declare global {
  namespace Express {
    interface Request {
      user: User,
      authData: any
    }
  }
}

//Init
const app = express()

//Config
app.set('port', config.PORT)

//Middelware
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded

//Routes
app.use(authRoutes)
app.use(userRoutes)

app.use((req: Request, res: Response) => {
  res.sendStatus(404);
});

export default app;
