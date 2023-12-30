import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersShortcutsItem } from "@mui/x-date-pickers/PickersShortcuts";
import { deDE } from "@mui/x-date-pickers/locales";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/de";

export interface BasicDatePickerProps {
  label: string;
  width: string;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  required: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
  hasError?: boolean;
  errorText?: string;
}

export const BasicDatePicker = (props: BasicDatePickerProps) => {

  const germanLocale =
    deDE.components.MuiLocalizationProvider.defaultProps.localeText;

  const shortcutsItems: PickersShortcutsItem<Dayjs | null>[] = [
    {
      label: "Heute",
      getValue: () => {
        return dayjs(new Date());
      },
    },
  ];

  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="de"
        localeText={germanLocale}
      >
        <DatePicker
          sx={{ bgcolor: "White", width: props.width }}
          value={props.value}
          label={props.label}
          onChange={props.onChange}
          disablePast={props.disablePast}
          disableFuture={props.disableFuture}
          slotProps={{
            shortcuts: {
              items: shortcutsItems,
            },
            textField: {
              error: props.hasError,
              helperText: props.hasError && props.errorText,
              variant: "standard",
              required: props.required,
            },
            openPickerButton: {
              color: "primary",
            },
          }}
        />
      </LocalizationProvider>
    </>
  );
};
