"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const user_route_1 = require("./routes/user.route");
const body_parser_1 = __importDefault(require("body-parser"));
const events_route_1 = require("./routes/events.route");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    methods: "*",
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use((0, body_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.json({ status: "All ok 😎" });
});
app.use("/api/user", user_route_1.userRoute);
app.use("/api/event", events_route_1.eventRoute);
app.listen(PORT, () => console.log(` 🟢 Running on PORT ${PORT}`));
