import React from "react";
import { SearchField } from "../common/NutrilogSearchField";
import { Layout } from "../layout/Layout";
import { Box, Icon, TextField, useTheme } from "@mui/material";

export const FoodLog = (testParams: any) => {
  
  const [isButtonClicked, setIsButtonClicked] = React.useState(false);
  const handleSearchClick = () => {
    console.log(`Suchbutton geklickt. Eingegebener Text: `);

    // Schaltet den Klickstatus für eine kurze Zeit auf "true"
    setIsButtonClicked(true);

    // Setzt den Klickstatus nach 500 Millisekunden zurück (kann angepasst werden)
    setTimeout(() => {
      setIsButtonClicked(false);
    }, 500); // Zurücksetzen nach 0,5 Sekunden (500 Millisekunden)
  };

  const theme = useTheme();
  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.light,
          flex: 1,
          display: "flex",
          alignItems: "top",
          flexDirection: "column",
          boxShadow: '2',
        }}>
        <Box sx={{
          display: "inline-flex",
          height: "9%",
        }}>
          <TextField
            label="Lebensmittel hinzufügen"
            variant="standard"
            placeholder="Suche hier nach einem Lebensmittel..."
            focused
          >

          </TextField>
          <SearchField labelText="Lebensmittel hinzufügen" placeholderText="Suche hier nach einem Lebensmittel..." placeholderTextMenge="Menge eintragen" suffixText="" iconName="add_circle" /></Box>
        <Box sx={{
          display: "inline-flex",
          height: "9%",
        }}>
          <TextField
            label="Rezept hinzufügen"
            variant="standard"
            placeholder="Suche hier nach einem Rezept..."
            focused
          ></TextField>
          <Icon
              sx={{
                height: 'auto', // Automatische Höhe
                margin: '5px', // Abstand zum Textfeld
                color: isButtonClicked ? 'primary.secondary' : 'primary.main', // Ändert die Farbe bei Klick
              }}
              onClick={handleSearchClick} // Fügt die Klickfunktion hinzu
              >add_circle</Icon>
          <SearchField labelText="" placeholderText="Suche hier nach einem Rezept..." placeholderTextMenge="Portionen eintragen" suffixText="" iconName="add_circle" /></Box>
      </Box>
    </Layout>
  );
};
