import { styled, alpha } from '@mui/material/styles';
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField, Typography } from '@mui/material';
import nutrifomTheme from '../theme/nutrifomTheme';
import { Search } from '@mui/icons-material';


export const SearchField = (testParams: any) => {

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    height: '10%',
    display: 'flex', // Fügen Sie display: "flex" hinzu
    alignItems: 'center', // Zentrieren Sie die Elemente vertikal
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
    },
  }));

  return (
    <>
      <ThemeProvider theme={nutrifomTheme}>
        <Box
          sx={{
            backgroundColor: 'background.paper', // Hintergrundfarbe aus dem Thema
            width: '100%', // 100% der Breite
            maxHeight: '10%', // Maximal 10% der Höhe
            display: 'flex', // Verwenden Sie Flexbox, um Container nebeneinander anzuordnen
            justifyContent: 'space-between', // Verteilen Sie die Container horizontal
            alignItems: 'center', // Zentrieren Sie die Elemente vertikal
            margin: '10px',
            pl: "10px"
          }}
        >
          <Box sx={{ color: "inherit", fontSize: "inherit", width:"30%"}}>Lebensmittel hinzufügen</Box>
          <Box sx={{width:"70%", display: 'flex', alignItems: 'center'}}>
            <TextField 
              sx={{width:"90%"}}
              id="input-with-sx"
              variant="outlined"
              placeholder="Tippe dein Lebensmittel hier ein…"
              size="small"
              inputProps={{ 'aria-label': 'search' }} />
            <SearchIcon 
              sx={{ color: 'inherit', height: 'auto' , margin: '5px'}}
              onClick={() => console.log("Suchbutton geklickt")} />
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};





