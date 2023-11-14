import { Alert, Typography, useTheme } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import JustifiedTypography from "./JustifiedTypography";

export interface InfoAlertProps {
  title: string;
  description: string;
}

export default function InfoAlert(props: InfoAlertProps) {
  const theme = useTheme();

  return (
    <Alert
      sx={{
        backgroundColor: theme.palette.primary.light,
      }}
      icon={<InfoOutlined sx={{ color: theme.palette.primary.main }} />}
    >
      <Typography sx={{ fontWeight: "bold" }}>{props.title}</Typography>
      <JustifiedTypography text={props.description} />
    </Alert>
  );
}
