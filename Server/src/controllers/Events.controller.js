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
exports.getEvent = exports.getGuestEvents = exports.getAllAdminEvent = exports.deleteEvent = exports.updateEvent = exports.createEvent = void 0;
const prismaClient_1 = require("../../config/prismaClient");
const response_1 = require("../../config/response");
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, name, description, category, date, time, location, } = req.body;
        // image Url
        const imageUrl = req.file.path;
        const event = yield prismaClient_1.prisma_client.events.create({
            data: {
                userId,
                name,
                category,
                date,
                location,
                description,
                imageUrl,
                time,
            },
        });
        return (0, response_1.sendResponse)(res, 200, "successfully created", event);
    }
    catch (error) {
        console.log("🚀 ~ createEvent ~ error:", error);
        return (0, response_1.sendResponse)(res, 500, "something went wrong");
    }
});
exports.createEvent = createEvent;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body();
        if (!data.id) {
            return (0, response_1.sendResponse)(res, 404, "Invalid Event ID");
        }
        const updatedEvent = yield prismaClient_1.prisma_client.events.update({
            where: {
                id: data.id,
                userId: req.body.userId,
            },
            data: Object.assign({}, data),
        });
        return (0, response_1.sendResponse)(res, 200, "successfully updated", updatedEvent);
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 200, "something went wrong");
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, userId } = req.body;
        if (!id) {
            return (0, response_1.sendResponse)(res, 403, "Invalid delete Request");
        }
        const event = yield prismaClient_1.prisma_client.events.delete({
            where: {
                id: id,
                userId,
            },
        });
        return (0, response_1.sendResponse)(res, 200, "Deleted Successfully", event);
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, "Something went wrong");
    }
});
exports.deleteEvent = deleteEvent;
const getAllAdminEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEvents = yield prismaClient_1.prisma_client.events.findMany({
            where: {
                userId: req.body.userId,
            },
        });
        return (0, response_1.sendResponse)(res, 200, "successfully fetched all events", allEvents);
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, "something went wrong while  fetched all events");
    }
});
exports.getAllAdminEvent = getAllAdminEvent;
const getGuestEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEvents = yield prismaClient_1.prisma_client.events.findMany();
        (0, response_1.sendResponse)(res, 200, "Events fetched successfully", allEvents);
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, "something went wrong");
    }
});
exports.getGuestEvents = getGuestEvents;
const getEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            return (0, response_1.sendResponse)(res, 404, "Invalid Event Id");
        }
        const event = yield prismaClient_1.prisma_client.events.findUnique({
            where: {
                id,
            },
        });
        if (!event) {
            return (0, response_1.sendResponse)(res, 404, "Event not found");
        }
        return (0, response_1.sendResponse)(res, 200, "Successfully fetched event data", event);
    }
    catch (error) {
        return (0, response_1.sendResponse)(res, 500, "something went wrong");
    }
});
exports.getEvent = getEvent;
