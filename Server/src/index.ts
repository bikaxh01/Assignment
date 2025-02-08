import express, { Request, Response } from "express";
import { config } from "dotenv";
import { userRoute } from "./routes/user.route";
import bodyParser from "body-parser";
import { eventRoute } from "./routes/events.route";
import cookieParser from "cookie-parser";
import cors from "cors";
config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    methods: "*",
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response): void => {
  res.json({ status: "All ok 😎" });
});

app.use("/api/user", userRoute);
app.use("/api/event", eventRoute);

app.listen(PORT, () => console.log(` 🟢 Running on PORT ${PORT}`));
