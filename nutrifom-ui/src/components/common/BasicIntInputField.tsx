import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Icon, InputAdornment, TextField } from '@mui/material';
import nutrifomTheme from '../../theme/nutrifomTheme';
import { PropaneSharp } from '@mui/icons-material';

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
      <ThemeProvider theme={nutrifomTheme}>
        <Box
          sx={{
            //backgroundColor: 'background.paper', // Hintergrundfarbe aus dem Thema
            backgroundColor: 'primary.light',
            width: '100%', // 100% der Breite
            display: 'flex', // Verwenden Sie Flexbox, um Container nebeneinander anzuordnen
            justifyContent: 'space-between', // Verteilen Sie die Container horizontal
            alignItems: 'center', // Zentrieren Sie die Elemente vertikal

          }}
        >
          <Box sx={{ width: "100%", display: 'flex', alignItems: 'center' }}>
            <TextField
              sx={{ width: "100%", bgcolor: "White" }}
              id="input-with-sx"
              type="number"
              required
              variant="filled"
              size="small"
              label={props.label}
              value={props.value} // Zeigt den aktuellen Wert des Zustands an
              onChange={(e) => props.onChange(parseFloat(e.target.value))}
               // Aktualisiert den Zustand bei Eingabe
              InputProps={{
                endAdornment: <InputAdornment position="end">{props.suffix}</InputAdornment>,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              // Setzen Sie die error-Props basierend auf dem Fehlerzustand
              error={props.hasError}
              // Wenn ein Fehler auftritt, können Sie auch eine Fehlermeldung anzeigen
              helperText={props.hasError ? 'Ungültiger Wert: Das Gewicht muss positiv sein.' : ''}
            />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};