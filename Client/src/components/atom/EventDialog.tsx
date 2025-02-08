import { useState } from "react";
import { Button } from "../ui/button";
import { useStore } from "../../../store/user.store";
import { useNavigate } from "react-router";

function EventDialog({ eventData }: { eventData: Record<string, string> }) {
  const [image, setImage] = useState(eventData.imageUrl);
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  if (!user) {
    navigate("sign-in");
  }

  const handleUpdate=()=>{
    navigate(`/update?eventId=${eventData.id}`)
  }
  
  return (
    <div className=" p-5 w-full overflow-x-auto ">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="rounded-lg bg-cover bg-center flex flex-col font-bold text-6xl items-end justify-end p-4 border text-white h-[32rem]"
      >
        <div className=" bg-white flex flex-col  w-[18rem]  p-6 rounded-md gap-2 justify-around text-black ">
          <h2 className=" text-lg font-bold">{eventData.name}</h2>
          <span className=" text-xs">{eventData.location}</span>
          <p className=" text-xs text-[#7848F4]">
            {eventData.time} {eventData.date}
          </p>
          <div className=" flex flex-col gap-2">
            {user.type == "ADMIN" ? (
              <>
                <Button onClick={handleUpdate} className=" bg-[#7848F4] text-white hover:bg-[#845de6]">
                  Update
                </Button>
                <Button className=" bg-white text-black border hover:bg-red-600">
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button className=" bg-[#7848F4] text-white hover:bg-[#845de6]">
                  Book Now
                </Button>
                <Button className=" bg-white text-black border hover:bg-red-600">
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className=" flex  gap-14 p-6">
        <div className="  w-[37rem] p-1">
          <h1 className=" font-bold text-lg">Description</h1>
          <p className=" text-xs">{eventData.description || " "}</p>
        </div>
        <div className="  w-[37rem] p-1">
          <h2 className="font-bold text-lg">Location</h2>
          <p>{eventData.location}</p>
        </div>
      </div>
    </div>
  );
}

export default EventDialog;
