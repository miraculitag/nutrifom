import {
  Avatar,
  Box,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const User = (testParams: any) => {
  const testUser = {
    id: 1,
    name: "Username",
    dob: "01.01.2000",
    height: 170,
    gender: "weiblich",
    image: "",
    email: "x@testmail.de",
  };

  const userData = [
    { label: "Username", data: testUser.name },
    { label: "E-Mail", data: testUser.email },
    { label: "Geburtstag", data: testUser.dob },
    { label: "Geschlecht", data: testUser.gender },
    { label: "Größe", data: testUser.height },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: "80%",
      }}
    >
      <Box
        sx={{
          margin: "auto",
          width: "20%",
        }}
      >
        <Avatar
          src={testUser.image}
          sx={{ margin: "auto", width: "200px", height: "200px" }}
        />
        <IconButton sx={{ float: "right" }}>
          <EditIcon sx={{ fontSize: "150%" }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          margin: "auto",
          width: "35%",
          paddingTop: "3%",
        }}
      >
        <Typography sx={{ fontSize: "150%", paddingBottom: "5%" }}>
          Profildetails
        </Typography>
        {userData.map((field, index) => (
          <TextField
            key={index}
            label={field.label}
            variant="standard"
            value={field.data}
            inputProps={{ readOnly: true }}
            sx={{
              paddingBottom: "5%",
              paddingRight: index % 2 === 0 ? "5%" : "0%",
              float: index % 2 === 0 ? "" : "right",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
