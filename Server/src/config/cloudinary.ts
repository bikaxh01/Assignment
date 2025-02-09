import { config } from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import multer from "multer";
config();
// Configure Cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: process.env.CLOUDINARY_FOLDER_NAME,
    format: async (req: Request, file) => "png",
    public_id: (req, file) => file.originalname.split(".")[0],
  } as {
    folder: string;
    format: (req: any, file: any) => Promise<string>;
    public_id: (req: any, file: any) => string;
  },
});

const upload = multer({ storage });

export { upload };
