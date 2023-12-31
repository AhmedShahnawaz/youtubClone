import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import { errorLog, successLog } from "../utils/logMessage.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        successLog("mongoDB connected", connectionInstance.connection.host);
    } catch (error) {
        errorLog("mongoDB connection FAILD!", error)
        process.exit(1)
    }
}

export default connectDB