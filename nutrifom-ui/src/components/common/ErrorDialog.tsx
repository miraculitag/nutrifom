import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

export interface ErrorDialogProps {
  keepMounted: boolean;
  heading: string;
  errorMessage: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ErrorDialog = (props: ErrorDialogProps) => {
  const handleOk = () => {
    props.setOpen(false);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={props.open}
    >
      <DialogTitle>{props.heading}</DialogTitle>
      <DialogContent>
        <Typography>{props.errorMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};
