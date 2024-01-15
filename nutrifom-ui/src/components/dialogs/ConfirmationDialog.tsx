import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export interface ConfirmationDialogProps {
  dialogMessage: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
}

export const ConfirmationDialog = (props: ConfirmationDialogProps) => {
  return (
    <Dialog open={props.open}>
      <DialogContent>
        <DialogContentText>{props.dialogMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.onClose();
            props.setOpen(false);
          }}
          autoFocus
        >
          OK
        </Button>
        <Button
          onClick={() => {
            props.setOpen(false);
          }}
        >
          ABBRECHEN
        </Button>
      </DialogActions>
    </Dialog>
  );
};
