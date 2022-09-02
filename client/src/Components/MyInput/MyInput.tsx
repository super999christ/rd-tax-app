//  External Dependencies
import React from "react";

//  Internal Dependencies
import { MyInputContainer } from "./MyInputContainer.styled";
import { MyInputProps } from "./MyInput.types";

const MyInput = ({ value, placeholder, onChange }: MyInputProps) => {
  return (
    <MyInputContainer
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
    />
  );
};

export default MyInput;
