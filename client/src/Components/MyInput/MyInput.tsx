//  External Dependencies
import React from 'react';

//  Internal Dependencies
import { MyInputContainer } from './MyInputContainer.styled';
import { MyInputProps } from './MyInput.types';

const MyInput = ({ value, placeholder, onChange, type }: MyInputProps) => {
  return (
    <MyInputContainer
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
    />
  );
};

export default MyInput;
