import { Alert, Box, Typography, useTheme } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { JustifiedTypography } from "./JustifiedTypography";

export interface InfoAlertProps {
  title: string;
  description: string;
  table?: JSX.Element;
}

export const InfoAlert = (props: InfoAlertProps) => {
  const theme = useTheme();

  return (
    <Alert
      sx={{
        backgroundColor: theme.palette.primary.light,
        paddingRight: "25px",
      }}
      icon={<InfoOutlined sx={{ color: theme.palette.primary.main }} />}
    >
      <Typography sx={{ fontWeight: "bold" }}>{props.title}</Typography>
      <JustifiedTypography text={props.description} />
      {props.table && <Box>{props.table}</Box>}
    </Alert>
  );
};
