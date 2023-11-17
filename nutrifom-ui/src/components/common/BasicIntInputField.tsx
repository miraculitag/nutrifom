import { Box, InputAdornment, TextField } from '@mui/material';

export interface BasicIntInputFieldProps {
  label: string;
  suffix: string;
  width: string;
  hasError: boolean;
  value: number;
  onChange: (value: number) => void;
}


// Komponente für die Suchleiste
export const BasicIntInputField = (props: BasicIntInputFieldProps) => {
  return (
    <>
          <Box>
            <TextField
              sx={{ background:"white", width:props.width}}
              id="input-with-sx"
              type="number"
              required
              variant="standard"
              label={props.label}
              value={props.value}
              onChange={(e) => props.onChange(parseFloat(e.target.value))}
              InputProps={{
                endAdornment: <InputAdornment position="end">{props.suffix}</InputAdornment>,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              error={props.hasError}
              helperText={props.hasError ? 'Ungültiger Wert: Der Wert muss positiv sein.' : ''}
            />
          </Box>
    </>
  );
};