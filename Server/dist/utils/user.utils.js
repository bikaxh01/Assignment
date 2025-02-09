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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const prismaClient_1 = require("../src/config/prismaClient");
const getUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.email && !data.id) {
        throw new Error("Invalid user Id or Email");
    }
    try {
        const user = yield prismaClient_1.prisma_client.user.findUnique({
            where: data.id ? { id: data.id } : { email: data.email },
        });
        return user;
    }
    catch (error) {
        throw new Error("Something went wrong while fetching user");
    }
});
exports.getUser = getUser;
