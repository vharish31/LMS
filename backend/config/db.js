import mongoose from "mongoose";
import dns from "node:dns";

/**
 * Fix for querySrv ECONNREFUSED on Windows / restrictive networks.
 * Uses public DNS servers (Google, Cloudflare) to resolve MongoDB Atlas SRV records.
 */
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);

    if (error.message?.includes("querySrv")) {
      console.error(`
Troubleshooting:
1. Ensure your IP is whitelisted in MongoDB Atlas (Network Access → Add IP)
2. Try the standard connection string (mongodb://) instead of SRV (mongodb+srv://)
   Get it from: Atlas → Connect → Drivers → Use a connection string
3. Check if firewall/corporate network blocks DNS or MongoDB ports
`);
    }

    process.exit(1);
  }
};

export default connectDB;
