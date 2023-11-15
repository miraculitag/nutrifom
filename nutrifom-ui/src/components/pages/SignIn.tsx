import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSignIn } from "react-auth-kit";
import {
  Button,
  Avatar,
  TextField,
  Link,
  Box,
  Typography,
  Container,
} from "@mui/material";
import BasicButton from "../common/BasicButton";

export default function SignIn() {
  const [onSignInPage, setOnSignInPage] = React.useState(true);
  const [isSignInButtonClicked, setIsSignInButtonClicked] =
    React.useState(false);
  const [isSignUpButtonClicked, setIsSignUpButtonClicked] =
    React.useState(false);

  /* const [isGoogleSignInButtonClicked, setIsGoogleSignInButtonClicked] =
    React.useState(false);
  const [isGoogleSignUpButtonClicked, setIsGoogleSignUpButtonClicked] =
    React.useState(false);*/ //tdb

  const signIn = useSignIn(); //tbd
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //tbd
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const handleSignInButtonClick = () => {};
  const handleSignUpButtonClick = () => {};
  const handleGoogleSignInButtonClick = () => {};
  const handleGoogleSignUpButtonClick = () => {};

  return (
    <Container sx={{ width: "30%", marginTop: "10%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ margin: "2%", bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {onSignInPage ? "Einloggen" : "Registrieren"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Box sx={{ marginTop: "5%" }}>
            <BasicButton
              label={onSignInPage ? "Einloggen" : "Registrieren"}
              width={"100%"}
              isButtonClicked={
                onSignInPage ? isSignInButtonClicked : isSignUpButtonClicked
              }
              onButtonClick={
                onSignInPage ? handleSignInButtonClick : handleSignUpButtonClick
              }
            />
            <Button
              variant="outlined"
              onClick={
                onSignInPage
                  ? handleGoogleSignInButtonClick
                  : handleGoogleSignUpButtonClick
              }
              sx={{
                color: "black",
                backgroundColor: "primary.light",
                marginTop: "5%",
              }}
            >
              <img
                src="./assets/img/googlelogo.png"
                alt="Google Logo"
                width="5%"
                height="5%"
              />
              <Typography sx={{ fontSize: "inherit", marginLeft: "5%" }}>
                Weiter mit Google
              </Typography>
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                marginTop: "5%",
              }}
            >
              <Typography>
                {onSignInPage ? "Noch keinen Account" : ""}
              </Typography>
              <Link
                onClick={() => setOnSignInPage(!onSignInPage)}
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <Typography>
                  {onSignInPage ? "Hier Registrieren" : "Einloggen"}
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
