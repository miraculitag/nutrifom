import {
  DatePicker,
  LocalizationProvider,
  PickersShortcutsItem,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { deDE } from "@mui/x-date-pickers/locales";
import dayjs, { Dayjs } from "dayjs";

export interface BasicDatePickerProps {
  label: string;
  width: string;
  required: boolean;
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
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
