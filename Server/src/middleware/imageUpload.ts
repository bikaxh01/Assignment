import { NextFunction, Request, Response } from "express";
import { upload } from "../config/cloudinary";
import { sendResponse } from "../config/response";

export const uploadImage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const userId =  req.body.userId
  
  upload.single("image")(req, res, (err) => {
    if (err) {
      return sendResponse(res, 500, "Something went wrong");
    }
    
    if (!req.file) {
      return sendResponse(res, 400, "No file uploaded");
    }
    req.body.userId = userId ;

    next();
  });
};
