import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/de';
import { deDE } from '@mui/x-date-pickers/locales';
import {
  PickersShortcutsItem,
} from '@mui/x-date-pickers/PickersShortcuts';

// Komponente für die Suchleiste
export const BasicDatePicker = ({ labelText }: { labelText: string }) => {

  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs(new Date()));
  const germanLocale = deDE.components.MuiLocalizationProvider.defaultProps.localeText;

  const shortcutsItems: PickersShortcutsItem<Dayjs | null>[] = [
    {
      label: "Heute",
      getValue: () => {
        return dayjs(new Date());
      },
    }
  ];



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
        <Box sx={{ color: "inherit", fontSize: "inherit", width: "20%" }}><Typography>{labelText}</Typography></Box>
        <Box sx={{ width: "80%", display: 'flex', alignItems: 'center' }}        >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de" localeText={germanLocale}>
            <DatePicker
              sx={{ width: "20%", bgcolor: "White"}}
              value={selectedDate}
              onChange={(value) => setSelectedDate(value)}
              disablePast //Vergangenehit ausschließen
              slotProps={{
                shortcuts: {
                  items: shortcutsItems
                },
                textField: { size: 'small' }
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </>
  );
};

