import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/de';
import { deDE } from '@mui/x-date-pickers/locales';
import {
  PickersShortcutsItem,
} from '@mui/x-date-pickers/PickersShortcuts';
import { useTheme } from "@mui/material";

export interface BasicDatePickerProps {
  label: string;
  width: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
}

export const BasicDatePicker = (props: BasicDatePickerProps) => {
  const theme = useTheme();

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
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de" localeText={germanLocale}>
          <DatePicker
            sx={{ bgcolor: "White", width:props.width }}
            value={props.value}
            label={props.label}
            onChange={props.onChange}
            disablePast
            slotProps={{
              shortcuts: {
                items: shortcutsItems
              },
              textField: {
                variant: 'standard',
              },
              openPickerButton: {
                color: 'primary',
              }
            }}
          />
        </LocalizationProvider>
    </>
  );
};

