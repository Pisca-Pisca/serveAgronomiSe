import express from "express";
import cors from 'cors';
import {router} from "./routes";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(port);