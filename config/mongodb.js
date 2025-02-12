import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const { URL } = process.env
mongoose.connect(URL)

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error in connecting mongodb"))

db.once('open', () => {
    console.log("Connected to MongoDB");
})

export default db