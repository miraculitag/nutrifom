import * as React from 'react';
import { Box, Icon, TextField } from '@mui/material';
import { Typography } from "@mui/material";


// Komponente für die Suchleiste
export const SearchField = ({ labelText, placeholderText, suffixText, iconName }: { labelText: string; placeholderText: string, suffixText: string, iconName: string }) => {

  // Zustand, um den eingegebenen Text zu speichern
  const [searchText, setSearchText] = React.useState('');
  // Zustand, um den Klickstatus des Buttons zu verfolgen
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);

  // Funktion, die beim Klicken auf den Suchbutton ausgeführt wird
  const handleSearchClick = () => {
    console.log(`Suchbutton geklickt. Eingegebener Text: ${searchText}`);

    // Schaltet den Klickstatus für eine kurze Zeit auf "true"
    setIsButtonClicked(true);

    // Setzt den Klickstatus nach 500 Millisekunden zurück (kann angepasst werden)
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 500); // Zurücksetzen nach 0,5 Sekunden (500 Millisekunden)
  };

  // Funktion, die aufgerufen wird, wenn die Enter-Taste gedrückt wird
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchClick(); // Löst das Suchereignis aus, wenn Enter gedrückt wird
    }
  };

  return (
    <>

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
        <Box sx={{ color: "inherit", width: "20%" }}><Typography>{labelText}</Typography></Box>
        <Box sx={{ width: "80%", display: 'flex', alignItems: 'center' }}>
          <TextField
            sx={{ width: "90%", bgcolor: "White" }}
            id="input-with-sx"
            variant="outlined"
            placeholder={placeholderText}
            size="small"
            value={searchText} // Zeigt den aktuellen Wert des Zustands an
            onChange={(e) => setSearchText(e.target.value)} // Aktualisiert den Zustand bei Eingabe
            onKeyPress={handleKeyPress} // Fügt das Tastaturereignis hinzu
          />
          <Box sx={{ margin: '5px', }}><Typography>{suffixText}</Typography></Box>
          <Icon
            sx={{
              height: 'auto', // Automatische Höhe
              margin: '5px', // Abstand zum Textfeld
              color: isButtonClicked ? 'primary.secondary' : 'primary.main', // Ändert die Farbe bei Klick
            }}
            onClick={handleSearchClick} // Fügt die Klickfunktion hinzu
          >{iconName}</Icon>
        </Box>
      </Box>
    </>
  );
};