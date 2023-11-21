import { Typography } from "@mui/material";

interface JustifiedTypographyProps {
  text: string;
}

export default function JustifiedTypography(props: JustifiedTypographyProps) {
  return <Typography sx={{ textAlign: "justify" }}>{props.text}</Typography>;
}
