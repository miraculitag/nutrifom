import { Box } from "@mui/material";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = (props: any) => {
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Box sx={{ flex: "1 0 auto" }}>
          <Header />
          <Box sx={{ width: "80%", margin: "auto" }}>{props.children}</Box>
        </Box>
        <Box sx={{ mt: "auto" }}>
          <Footer />
        </Box>
      </Box>
    </>
  );
};
