// import mongoose from "mongoose";
// import app from "./app.js";
// import 'dotenv/config'

// const PORT = process.env.PORT || 3000;
// const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017";
// const connectDB = async () => {
//   await mongoose
//     .connect(MONGODB_URL)
//     .then(() => {
//       console.log("MongoDB connected");
//       app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//       });
//     })
//     .catch((error) => {
//       console.log('Some error occured in connecting to database- ',error);
//       process.exit(1);
//     });
// };


// connectDB();

import mongoose from "mongoose";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";
import app from "./app.js";
import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017";
const SSL_KEY_PATH = process.env.SSL_KEY_PATH || "/etc/letsencrypt/live/siddharthapro.in/privkey.pem";
const SSL_CERT_PATH = process.env.SSL_CERT_PATH || "/etc/letsencrypt/live/siddharthapro.in/fullchain.pem";

// Load SSL certificate and key
const sslOptions = {
  key: fs.readFileSync(path.resolve(SSL_KEY_PATH)),
  cert: fs.readFileSync(path.resolve(SSL_CERT_PATH)),
};

// Database connection function
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    // Start the HTTPS server
    const httpsServer = https.createServer(sslOptions, app);

    httpsServer.listen(443, () => {
      console.log("HTTPS server running on port 443");
    });

    // Optionally, start an HTTP server to redirect HTTP to HTTPS
    const httpServer = http.createServer((req, res) => {
      res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
      res.end();
    });

    httpServer.listen(PORT, () => {
      console.log(`HTTP server running on port ${PORT} and redirecting to HTTPS`);
    });

  } catch (error) {
    console.log('Error occurred while connecting to MongoDB:', error);
    process.exit(1);
  }
};

connectDB();
