import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/questions.js";
import answerRoutes from "./routes/Answers.js";
dotenv.config();
const app = express();
app.use(express.json({ limit: "30mb", extended: true })); //.json() called as middleware, recognize incoming REQUEST object as JSON object
app.use(express.urlencoded({ limit: "30mb", extended: true })); //.urlencoded():called as middleware, recognize incoming REQUEST object as string/array object
// Enable CORS for a specific origin (in this case, allowing requests from 'https://stack-over-flow-clone-8z10.onrender.com')
const corsOptions = {
  origin: "http://localhost:3000",
  // origin: "https://stack-over-flow-clone-8z10.onrender.com",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); //cross origin resource sharing

app.get("/", (req, res) => {
  res.send("This is a stack overflow app!!");
});

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.CONNECTION_URL;
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));

//useNewUrlParser: The underlying MongoDB driver has deprecated their current connection string parser. Because this is a major change, they added the useNewUrlParser flag to allow users to fall back to the old parser if they find a bug in the new parser.

//Set to true to opt in to using the MongoDB driver's new connection management engine. You should set this option to true , except for the unlikely case that it prevents you from maintaining a stable connection.

//Middleware: those functons that are called between processing the request and sendin the response.
