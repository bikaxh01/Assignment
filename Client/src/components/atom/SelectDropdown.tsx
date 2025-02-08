import React, { ChangeEvent } from "react";

function SelectDropdown({
  title,
  options,
  onSelect,
}: {
  title: string;
  options: string[];
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className=" flex flex-col p-2  gap-2">
      <span>{title || ""}</span>
      <select
        className=" w-[15rem] h-[2.5rem] rounded-md p-2 text-black"
        onChange={onSelect}
      >
        <option>Select {title.toLowerCase()}</option>
        {options.map((item) => (
          <option value={item.toLowerCase()} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectDropdown;
