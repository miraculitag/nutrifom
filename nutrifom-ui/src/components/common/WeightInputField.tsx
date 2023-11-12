import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Icon, InputAdornment, TextField } from '@mui/material';
import nutrifomTheme from '../../theme/nutrifomTheme';


// Komponente für die Suchleiste
export const WeightInputField = ({ labelText, placeholderText, suffixText, iconName }: { labelText: string; placeholderText: string, suffixText: string, iconName: string }) => {
  // Stildefinition für das Suchfeld (verwendet in einem späteren Schritt)

  // Zustand, um den eingegebenen Text zu speichern
  const [currentWeight, setCurrentWeight] = React.useState('');
  // Neuer Zustand für den Fehlerzustand
  const [hasError, setHasError] = React.useState(false);


  // Überprüfen Sie die Länge des aktuellen Gewichts und aktualisieren Sie den Fehlerzustand entsprechend
  React.useEffect(() => {
    setHasError(currentWeight.length > 0 && parseFloat(currentWeight) < 0);
  }, [currentWeight]);

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
              label={placeholderText}
              value={currentWeight} // Zeigt den aktuellen Wert des Zustands an
              onChange={(e) => setCurrentWeight(e.target.value)} // Aktualisiert den Zustand bei Eingabe
              InputProps={{
                endAdornment: <InputAdornment position="end">{suffixText}</InputAdornment>,
              }}
              InputLabelProps={{
                shrink: true,
              }}
              // Setzen Sie die error-Props basierend auf dem Fehlerzustand
              error={hasError}
              // Wenn ein Fehler auftritt, können Sie auch eine Fehlermeldung anzeigen
              helperText={hasError ? 'Ungültiger Wert: Das Gewicht muss positiv sein.' : ''}
            />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};