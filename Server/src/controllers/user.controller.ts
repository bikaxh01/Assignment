import { Request, Response, Router } from "express";
import { getUser } from "../../utils/user.utils";
import { sendResponse } from "../config/response";
import bcrypt from "bcryptjs";
import { prisma_client } from "../config/prismaClient";
import { USER_TYPE } from "@prisma/client";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import cookies from "cookie-parser";
config();

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      email,
      password,
      userType,
    }: { email: string; password: string; userType: USER_TYPE } = req.body;

    if (!email || !password || !userType) {
      return sendResponse(res, 400, "Invalid Inputs");
    }

    const user = await getUser({ email });
    if (user) {
      return sendResponse(res, 409, "email already exists");
    }
    // hash pw
    const hashedPW = bcrypt.hashSync(password, 10);

    //save to DB
    const createdUser = await prisma_client.user.create({
      data: {
        email,
        password: hashedPW,
        type: userType,
      },
      select: {
        id: true,
        email: true,
        type: true,
      },
    });

    return sendResponse(res, 200, "user Created successfully", createdUser);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return sendResponse(
      res,
      500,
      "something went wrong while registering user"
    );
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    // get email password and user type
    const {
      email,
      password,
      userType,
    }: { email: string; password: string; userType: USER_TYPE } = req.body;

    // get user
    if (!email || !password || !userType) {
      return sendResponse(res, 400, "Invalid Inputs");
    }

    const user = await getUser({ email });

    if (!user || user.type !== userType) {
      return sendResponse(res, 404, "User not Found");
    }

    // compare password
    const matchPw = bcrypt.compareSync(password, user.password);

    if (!matchPw) {
      return sendResponse(res, 403, "Incorrect password");
    }

    // generate jwt
    const payload = {
      id: user.id,
      email: user.email,
      type: user.type,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: 18000000,
    });

    res.cookie("token", token, { httpOnly: true, secure: true });

    return sendResponse(res, 200, "successfully login");
  } catch (error) {
    return sendResponse(res, 404, "User not Found");
  }
};

export const getUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    const user = await prisma_client.user.findUnique({
      where: {
        id: userId,
      },select:{
        id:true,
        email:true,
        type:true
      }
    });

    return sendResponse(res, 200, "user fetched successfully", user);
  } catch (error) {
    return sendResponse(res, 500, "something went wrong");
  }
};
