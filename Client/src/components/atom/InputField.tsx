import React, { ChangeEvent } from "react";

function InputField({
  title,
  placeholder,
  onchange,
  type,
}: {
  title: string;
  type: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className=" flex flex-col gap-1">
      <div>
        <span className=" text-lg  ">{title || ""}</span>
      </div>
      <input
        type={type}
        className=" w-full h-[2.5rem] border rounded-md p-2 text-black"
        placeholder={placeholder}
        onChange={onchange}
      />
    </div>
  );
}

export default InputField;
