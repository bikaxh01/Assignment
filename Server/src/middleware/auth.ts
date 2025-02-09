import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../config/response";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { prisma_client } from "../config/prismaClient";
config();
export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const cookie = req.cookies;


    if (!cookie.token) {
      return sendResponse(res, 401, "Invalid Token");
    }

    const token = jwt.verify(cookie.token, process.env.JWT_SECRET as string);

    if (!token) {
      sendResponse(res, 401, "Unauthorized");
    }
    //@ts-ignore
    const userId = token.id;

    const user = await prisma_client.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
        return  sendResponse(res, 401, "user not found");
    }
    

    // add userId in req.bod
    req.body.userId = user.id;

    next();

  
  } catch (error) {
    return sendResponse(res, 401, "something went wrong");
  }
};
