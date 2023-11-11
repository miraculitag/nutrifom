import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Icon, InputAdornment, TextField, Typography } from '@mui/material';
import nutrifomTheme from '../../theme/nutrifomTheme';


// Komponente für die Suchleiste
export const WeightInputField = ({ labelText, placeholderText, suffixText, iconName }: { labelText: string; placeholderText: string, suffixText: string, iconName: string }) => {
  // Stildefinition für das Suchfeld (verwendet in einem späteren Schritt)

  // Zustand, um den eingegebenen Text zu speichern
  const [currentWeight, setCurrentWeight] = React.useState('');
  // Zustand, um den Klickstatus des Buttons zu verfolgen
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  // Neuer Zustand für den Fehlerzustand
  const [hasError, setHasError] = React.useState(false);

  // Funktion, die beim Klicken auf den Suchbutton ausgeführt wird
  const handleAddWeightClick = () => {
    const numericWeight = parseFloat(currentWeight);
    if (numericWeight >= 0) {
      console.log(`Suchbutton geklickt. Eingegebener Text: ${numericWeight}`);
      setIsButtonClicked(true);
      setTimeout(() => {
        setIsButtonClicked(false);
      }, 500);
      // Reset des Fehlerzustands im Erfolgsfall
      setHasError(false);
    } else {
      // Fehlerfall: Setzen Sie den Fehlerzustand auf "true"
      setHasError(true);
    }
  };

  // Funktion, die aufgerufen wird, wenn die Enter-Taste gedrückt wird
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleAddWeightClick(); // Löst das Suchereignis aus, wenn Enter gedrückt wird
    }
  };

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
            backgroundColor: "darkgray",
            width: '100%', // 100% der Breite
            display: 'flex', // Verwenden Sie Flexbox, um Container nebeneinander anzuordnen
            justifyContent: 'space-between', // Verteilen Sie die Container horizontal
            alignItems: 'center', // Zentrieren Sie die Elemente vertikal
            margin: '10px', // Außenabstand
            pl: '10px', // Linker Innenabstand
            boxShadow: '2', // Hinzugefügter Schatten
          }}
        >
          <Box sx={{ color: "inherit", fontSize: "inherit", width: "20%" }}><Typography>{labelText}</Typography></Box>
          <Box sx={{ width: "80%", display: 'flex', alignItems: 'center' }}>
            <TextField
              sx={{ width: "90%", bgcolor: "White" }}
              id="input-with-sx"
              type="number"
              required
              variant="outlined"
              placeholder={placeholderText}
              size="small"
              value={currentWeight} // Zeigt den aktuellen Wert des Zustands an
              onChange={(e) => setCurrentWeight(e.target.value)} // Aktualisiert den Zustand bei Eingabe
              onKeyPress={handleKeyPress} // Fügt das Tastaturereignis hinzu
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
            <Icon
              sx={{
                height: 'auto', // Automatische Höhe
                margin: '5px', // Abstand zum Textfeld
                color: isButtonClicked ? 'primary.secondary' : 'primary.main', // Ändert die Farbe bei Klick
              }}
              onClick={handleAddWeightClick} // Fügt die Klickfunktion hinzu
            >{iconName}</Icon>
          </Box>
        </Box>

      </ThemeProvider>
    </>
  );
};