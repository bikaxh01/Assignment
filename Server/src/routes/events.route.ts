import { Request, Response, Router } from "express";
import { createEvent, deleteEvent, getAllAdminEvent, getEvent, getGuestEvents, updateEvent } from "../controllers/Events.controller";
import { uploadImage } from "../middleware/imageUpload";
import { protectedRoute } from "../middleware/auth";

export const eventRoute = Router();

eventRoute.post("/create",protectedRoute,uploadImage ,createEvent);
eventRoute.delete("/delete",protectedRoute,deleteEvent);
eventRoute.patch("/update",protectedRoute ,updateEvent);
eventRoute.get("/admin/events",protectedRoute,getAllAdminEvent);
eventRoute.get("/events",getGuestEvents);
eventRoute.get("/get-event/:id",protectedRoute,getEvent)
