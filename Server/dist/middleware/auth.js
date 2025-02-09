"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoute = void 0;
const response_1 = require("../config/response");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const prismaClient_1 = require("../config/prismaClient");
(0, dotenv_1.config)();
const protectedRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookie = req.cookies;
        if (!cookie.token) {
            return (0, response_1.sendResponse)(res, 401, "Invalid Token");
        }
        const token = jsonwebtoken_1.default.verify(cookie.token, process.env.JWT_SECRET);
        if (!token) {
            (0, response_1.sendResponse)(res, 401, "Unauthorized");
        }
        //@ts-ignore
        const userId = token.id;
        const user = yield prismaClient_1.prisma_client.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user) {
            return (0, response_1.sendResponse)(res, 401, "user not found");
        }
        // add userId in req.bod
        req.body.userId = user.id;
        next();
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 401, "something went wrong");
    }
});
exports.protectedRoute = protectedRoute;
