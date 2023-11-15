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
  value: string;
  setValue: (value: string) => void;
}

export default function DropDownMenu(props: DropDownProps) {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent) => {
    props.setValue(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ width: "250px" }}>
      <InputLabel>{props.title}</InputLabel>
      <Select value={props.value} onChange={handleChange}>
        {props.options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
