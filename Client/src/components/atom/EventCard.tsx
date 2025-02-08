import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EventDialog from "./EventDialog";
function EventCard({ eventData }: { eventData: Record<string, string> }) {
  console.log("🚀 ~ EventCard ~ eventData:", eventData);
  return (
    <Dialog>
      <DialogTrigger>
        <div className=" h-[25rem] w-[21rem]  rounded-xl p-2 flex  flex-col gap-1 border hover:bg-[#9384df80] ">
          <img
            src={eventData.imageUrl}
            alt="Event image"
            className=" h-[14rem] bg-cover rounded-lg"
          />
          <h2 className=" font-semibold">{eventData.category}</h2>
          <p className=" text-xs text-black">{eventData.description}</p>
          <span className=" text-[#7848F4] text-sm">
            {eventData.date} {eventData.time}
          </span>
        </div>
      </DialogTrigger>
      <DialogContent className="h-[36rem] !p-0 !border-none    max-w-[60rem]">
        <EventDialog eventData={eventData} />
      </DialogContent>
    </Dialog>
  );
}

export default EventCard;
