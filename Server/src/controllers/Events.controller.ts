import { Request, Response } from "express";
import { prisma_client } from "../config/prismaClient";
import { sendResponse } from "../config/response";
import {
  CreateEventInterface,
  updateEventInterface,
} from "../types/Event.types";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      name,
      description,
      category,
      date,
      time,
      location,
    }: CreateEventInterface = req.body;

    // image Url
    const imageUrl = (req.file as any).path;

    const event = await prisma_client.events.create({
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

    return sendResponse(res, 200, "successfully created", event);
  } catch (error) {
    console.log("🚀 ~ createEvent ~ error:", error);
    return sendResponse(res, 500, "something went wrong");
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const data: updateEventInterface = req.body();

    if (!data.id) {
      return sendResponse(res, 404, "Invalid Event ID");
    }

    const updatedEvent = await prisma_client.events.update({
      where: {
        id: data.id,
        userId: req.body.userId,
      },
      data: {
        ...data,
      },
    });

    return sendResponse(res, 200, "successfully updated", updatedEvent);
  } catch (error) {
    return sendResponse(res, 200, "something went wrong");
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id, userId } = req.body;

    if (!id) {
      return sendResponse(res, 403, "Invalid delete Request");
    }

    const event = await prisma_client.events.delete({
      where: {
        id: id,
        userId,
      },
    });

    return sendResponse(res, 200, "Deleted Successfully", event);
  } catch (error) {
    return sendResponse(res, 500, "Something went wrong");
  }
};

export const getAllAdminEvent = async (req: Request, res: Response) => {
  try {
    const allEvents = await prisma_client.events.findMany({
      where: {
        userId: req.body.userId,
      },
    });

    return sendResponse(res, 200, "successfully fetched all events", allEvents);
  } catch (error) {
    return sendResponse(
      res,
      500,
      "something went wrong while  fetched all events"
    );
  }
};

export const getGuestEvents = async (req: Request, res: Response) => {
  try {
    const allEvents = await prisma_client.events.findMany();

    sendResponse(res, 200, "Events fetched successfully", allEvents);
  } catch (error) {
    return sendResponse(res, 500, "something went wrong");
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return sendResponse(res, 404, "Invalid Event Id");
    }

    const event = await prisma_client.events.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      return sendResponse(res, 404, "Event not found");
    }

    return sendResponse(res, 200, "Successfully fetched event data", event);
  } catch (error) {
    return sendResponse(res, 500, "something went wrong");
  }
};
