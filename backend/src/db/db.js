import mongoose from 'mongoose';

export const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log("DB ok")
    } catch (error) {
        console.error("Error occured in DB", error);
        process.exit(1)
    }
}