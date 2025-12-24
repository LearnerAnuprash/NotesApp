import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

// Configuring environment variables using dotenv
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//Middlewares
// This must be used before actually calling the routes
// else , error of 'title' or 'content' being undefined
// appears
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use((req, _, next) => {
  // in this middleware, 'res' is never used , so replace with '_'
  console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  next();
});

app.use(rateLimiter);

//Use notesRoutes.js as notesRoutes
app.use("/api/notes", notesRoutes);

// This ensures that the database is connected before the server starts listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started at port:", PORT);
  });
});
