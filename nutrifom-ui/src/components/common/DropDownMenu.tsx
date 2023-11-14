import React from "react";
import {
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

export interface DropDownProps {
  title: string;
  options: string[];
  defaultValue: string;
}

export default function DropDownMenu(props: DropDownProps) {
  const theme = useTheme();
  const [value, setValue] = React.useState(props.defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ width: "250px" }}>
      <InputLabel>{props.title}</InputLabel>
      <Select value={value} onChange={handleChange}>
        {props.options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
