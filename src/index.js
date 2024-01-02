import connectDB from "./db/dataBase.js"
import dotenv from "dotenv"
import {app} from "./app.js"

dotenv.config({
    path:'./.env'
})

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERROR: ", error);
        throw error
    })
})
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`The server is running at port: ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("MongoDB connection failed !", error)
})