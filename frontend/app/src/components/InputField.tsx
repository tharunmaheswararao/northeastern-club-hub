import React from 'react';
import { TextField } from '@mui/material';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  fullWidth = true,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth={fullWidth}
      variant="outlined"
      margin="normal"
    />
  );
};

export default InputField;
