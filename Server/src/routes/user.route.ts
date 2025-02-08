import { Request, Response, Router } from "express";
import {
  getUserData,
  loginUserController,
  registerUser,
} from "../controllers/user.controller";
import { protectedRoute } from "../middleware/auth";

export const userRoute = Router();

userRoute.get("/", (req: Request, res: Response): void => {
  res.status(200).json({ status: "User route OK" });
});

userRoute.post("/register", registerUser);
userRoute.post("/login", loginUserController);
userRoute.get("/get-user", protectedRoute, getUserData);
