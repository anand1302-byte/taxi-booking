import express from "express";
import db from "./config/mongodb.js";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
import user from "./routes/user.js";
db

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: '*', // Allows all origins; you can restrict this to specific origins if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));

app.use('/', user);

app.listen(4000, () => {
    console.log("Server is live")
})