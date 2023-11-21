import { Box } from "@mui/material";
import { Header } from "./Header";

export const Layout = (props: any) => {
  return (
    <>
      <Header />
      <Box sx={{ margin: "auto", width: "80%" }}>{props.children}</Box>
    </>
  );
};
