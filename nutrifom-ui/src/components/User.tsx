import { Avatar, Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const User = (testParams: any) => {
  const userProfilePicture = ""; //tbd
  const realName = "Testname"; //tbd
  const userName = "Username"; //tbd
  const birthday = "01.01.2000"; //tbd
  const sex = "weiblich"; //tbd
  const height = "170cm"; //tbd
  const email = "x@testmail.de"; //tbd

  const labels =
    "Name:\r\nUsername:\r\n\r\nGeburtstag:\r\nGeschlecht:\r\nGröße:\r\n\r\nEmail:";
  const values =
    realName +
    "\r\n" +
    userName +
    "\r\n\r\n" +
    birthday +
    "\r\n" +
    sex +
    "\r\n" +
    height +
    "\r\n\r\n" +
    email;

  return (
    <>
      <Box
        sx={{
          margin: "auto",
          width: "30%",
        }}
      >
        <Box
          sx={{
            margin: "auto",
            width: "50%",
          }}
        >
          <Avatar
            src={userProfilePicture}
            sx={{ margin: "auto", width: "150px", height: "150px" }}
          />
          <IconButton sx={{ float: "right" }}>
            <EditIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            margin: "auto",
            width: "100%",
            fontSize: 20,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <pre style={{ fontFamily: "Poppins" }}>{labels}</pre>
          <pre
            style={{ position: "relative", left: "10%", fontFamily: "Poppins" }}
          >
            {values}
          </pre>
        </Box>
      </Box>
    </>
  );
};
