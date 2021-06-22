import "reflect-metadata"; 
import express, { request, response } from "express";
import { router } from "./routes";

import "./database";

const app = express();

app.use(express.json());

app.use(router);

// request = input
// response = output
//localhost:3000

app.listen(3000, () => console.log("Server is running!"));