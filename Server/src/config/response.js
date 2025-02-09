"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        status: statusCode >= 200 && statusCode < 300, // true for success, false for errors
        message,
        data,
    });
};
exports.sendResponse = sendResponse;
