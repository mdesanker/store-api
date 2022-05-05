import { connect } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const initializeTestServer = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await connect(uri);
    console.log(`MongoDB connected to ${uri}`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
};

export default initializeTestServer;
