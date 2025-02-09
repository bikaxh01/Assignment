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
exports.getUserData = exports.loginUserController = exports.registerUser = void 0;
const user_utils_1 = require("../../utils/user.utils");
const response_1 = require("../../config/response");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prismaClient_1 = require("../../config/prismaClient");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, userType, } = req.body;
        if (!email || !password || !userType) {
            return (0, response_1.sendResponse)(res, 400, "Invalid Inputs");
        }
        const user = yield (0, user_utils_1.getUser)({ email });
        if (user) {
            return (0, response_1.sendResponse)(res, 409, "email already exists");
        }
        // hash pw
        const hashedPW = bcryptjs_1.default.hashSync(password, 10);
        //save to DB
        const createdUser = yield prismaClient_1.prisma_client.user.create({
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
        return (0, response_1.sendResponse)(res, 200, "user Created successfully", createdUser);
    }
    catch (error) {
        console.log("🚀 ~ error:", error);
        return (0, response_1.sendResponse)(res, 500, "something went wrong while registering user");
    }
});
exports.registerUser = registerUser;
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get email password and user type
        const { email, password, userType, } = req.body;
        // get user
        if (!email || !password || !userType) {
            return (0, response_1.sendResponse)(res, 400, "Invalid Inputs");
        }
        const user = yield (0, user_utils_1.getUser)({ email });
        if (!user || user.type !== userType) {
            return (0, response_1.sendResponse)(res, 404, "User not Found");
        }
        // compare password
        const matchPw = bcryptjs_1.default.compareSync(password, user.password);
        if (!matchPw) {
            return (0, response_1.sendResponse)(res, 403, "Incorrect password");
        }
        // generate jwt
        const payload = {
            id: user.id,
            email: user.email,
            type: user.type,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 18000000,
        });
        res.cookie("token", token, { httpOnly: true, secure: true });
        return (0, response_1.sendResponse)(res, 200, "successfully login");
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 404, "User not Found");
    }
});
exports.loginUserController = loginUserController;
const getUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const user = yield prismaClient_1.prisma_client.user.findUnique({
            where: {
                id: userId,
            }, select: {
                id: true,
                email: true,
                type: true
            }
        });
        return (0, response_1.sendResponse)(res, 200, "user fetched successfully", user);
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, "something went wrong");
    }
});
exports.getUserData = getUserData;
