"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middleware/auth");
exports.userRoute = (0, express_1.Router)();
exports.userRoute.get("/", (req, res) => {
    res.status(200).json({ status: "User route OK" });
});
exports.userRoute.post("/register", user_controller_1.registerUser);
exports.userRoute.post("/login", user_controller_1.loginUserController);
exports.userRoute.get("/get-user", auth_1.protectedRoute, user_controller_1.getUserData);
