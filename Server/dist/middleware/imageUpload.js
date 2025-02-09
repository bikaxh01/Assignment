"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = require("../config/cloudinary");
const response_1 = require("../config/response");
const uploadImage = (req, res, next) => {
    const userId = req.body.userId;
    cloudinary_1.upload.single("image")(req, res, (err) => {
        if (err) {
            return (0, response_1.sendResponse)(res, 500, "Something went wrong");
        }
        if (!req.file) {
            return (0, response_1.sendResponse)(res, 400, "No file uploaded");
        }
        req.body.userId = userId;
        next();
    });
};
exports.uploadImage = uploadImage;
