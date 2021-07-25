
import express from "express";
import config from "./config/config.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

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

app.use((req, res) => {
  res.sendStatus(404);
});

export default app;
