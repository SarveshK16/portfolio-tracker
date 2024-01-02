import connectDB from "./db/dataBase.js"
import dotenv from "dotenv"

dotenv.config({
    path:'./.env'
})

connectDB()
