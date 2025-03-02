import express from "express";
import cors from "cors";
import { bugsRouter } from "./api/bug/bug.routes.js";
import { authRouter } from "./api/auth/auth.routes.js";
import { userRouter } from "./api/user/user.routes.js";

const app = express();

const corsOptions = {
  origin: [
    'http://127.0.0.1:5174', // Corrected to use singular 'origin'
    'http://localhost:5174',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.static('public'))
app.use("/api/bugs", bugsRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
