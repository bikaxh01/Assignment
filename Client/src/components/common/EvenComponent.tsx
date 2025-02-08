import { EventInterface } from "../../types/events.type";
import EventCard from "../atom/EventCard";
import { Loader2 } from "lucide-react";

function EvenComponent({
  data,
  isLoading,
}: {
  data: EventInterface[];
  isLoading: boolean;
}) {
 
  return (
    <div className=" mt-[8rem] ">
      <div className="  flex justify-between  p-1 items-center">
        <div className=" font-bold flex gap-1  text-3xl ">
          <span className="  text-[#7848F4]">Event's</span>
        </div>
      </div>

      <div className=" flex flex-wrap  gap-6 items-center justify-center">
        {isLoading ? (
          <div>
            <Loader2 className=" animate-spin" />
          </div>
        ) : data.data.length > 0 ? (
          data.data.map((event: EventInterface) => <EventCard eventData={event} />)
        ) : (
          "No Events Found"
        )}
      </div>
    </div>
  );
}

export default EvenComponent;
