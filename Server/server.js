import express from "express";
import dotenv from "dotenv";
import database from "./database/connection.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;
database();
app.listen(PORT, () => console.log(`Server is Running: ${PORT}`));
