import dotenv from "dotenv"
import connectDB from "./src/db/index.js"
import { errorLog, successLog } from "./src/utils/logMessage.js"
import { app } from "./src/app.js"

dotenv.config({ path: ".env" })

connectDB()
.then(() => {
    app.listen(() => {
        successLog("server is running on port = ", process.env.PORT || 8000)
    })
})
.catch((error) => {
    errorLog("MongoDB connection Faild !!", error)
})