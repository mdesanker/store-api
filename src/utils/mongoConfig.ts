import "dotenv/config";
import { connect } from "mongoose";

const mongoDB =
  (process.env.MONGODB_URI as string) ||
  (process.env.MONGODB_URI_DEV as string);

const connectDB = async () => {
  try {
    await connect(mongoDB);
    console.log("MongoDB connected");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};

export default connectDB;
