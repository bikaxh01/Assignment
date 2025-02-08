import React, { ChangeEvent } from "react";
import SelectDropdown from "../atom/SelectDropdown";
import { Search } from "lucide-react";

function FilterComponent() {
  const handleLocationSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(
      "🚀 ~ handleLocationChSelect ~ handleLocationChSelect:",
      e.target.value
    );
  };

  const handleCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(
      "🚀 ~ handleCategorySelect ~ handleCategorySelect:",
      e.target.value
    );
  };

  const handleDateSelect = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("🚀 ~ handleDateSelect ~ handleDateSelect:", e.target.value);
  };

  return (
    <div className=" h-[10rem] bg-[#10107B] w-[80rem]  flex items-center justify-center  rounded-lg">
      <div className=" p-4 flex items-center  text-white   justify-around">
        <SelectDropdown
          title="Location"
          options={Locations}
          onSelect={handleLocationSelect}
        />
        <SelectDropdown
          title="Event Type"
          options={EventCategories}
          onSelect={handleCategorySelect}
        />
        <div className=" flex flex-col p-2  gap-2">
          <span>Date</span>

          <input
            onChange={handleDateSelect}
            type="date"
            max={Date.now()}
            className=" w-[15rem] h-[2.5rem] rounded-md p-2 text-black"
          />
        </div>
        <div className=" pt-7 ">
          <button className="bg-[#7848F4] flex  items-center justify-center gap-1 h-9 w-[128px] rounded-lg  text-sm text-white">
            <span>search</span>
            <Search className=" size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export const Locations: string[] = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
];
export const EventCategories: string[] = [
  "Conference",
  "Workshop",
  "Seminar",
  "Webinar",
  "Concert",
  "Sports",
  "Festival",
  "Exhibition",
  "Networking",
  "Charity",
];

export default FilterComponent;
