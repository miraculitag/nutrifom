import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

export interface FilterDialogProps {
  keepMounted: boolean;
  heading: string;
  options: string[];
  valueFilter: string;
  open: boolean;
  onClose: (value?: string) => void;
}

export const FilterDialog = (props: FilterDialogProps) => {
  const [valueFilter, setValueFilter] = React.useState(props.valueFilter);

  const radioGroupRef = React.useRef<HTMLElement>(null);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    props.onClose();
  };

  const handleOk = () => {
    props.onClose(valueFilter);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueFilter(event.target.value);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={props.open}
    >
      <DialogTitle>{props.heading}</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          value={valueFilter}
          onChange={handleChange}
        >
          {props.options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk}>Ok</Button>
        <Button autoFocus onClick={handleCancel}>
          Abbrechen
        </Button>
      </DialogActions>
    </Dialog>
  );
};
