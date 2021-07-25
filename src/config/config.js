// Read environment variables
import { config } from "dotenv";
config();

const configurations = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://<username>:<password>@firstcluster.4rc4s.mongodb.net/<dbname>?",
};

export default configurations;