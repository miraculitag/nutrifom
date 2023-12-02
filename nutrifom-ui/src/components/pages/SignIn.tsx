import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import {
  Button,
  Avatar,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import BasicButton from "../common/BasicButton";
import { authenticateAppUser, registerAppUser } from "../../api";
import { FloatInputField } from "../common/FloatInputField";
import { TextInputField } from "../common/TextInputField";
import DropDownMenu from "../common/DropDownMenu";
import InfoAlert from "../common/InfoAlert";
import PalTable from "../common/PalTable";
import { BasicDatePicker } from "../common/BasicDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { fieldErrorEnum } from "../../types";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [onSignInPage, setOnSignInPage] = React.useState(true);
  const [isSignInButtonClicked, setIsSignInButtonClicked] =
    React.useState(false);
  const [isSignUpButtonClicked, setIsSignUpButtonClicked] =
    React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [weight, setWeight] = React.useState(0);
  const [dob, setDob] = React.useState<Dayjs | null>(dayjs(new Date()));
  const [goal, setGoal] = React.useState("Bitte wählen");
  const [height, setHeight] = React.useState(0);
  const [gender, setGender] = React.useState("Bitte wählen");
  const [pal, setPal] = React.useState("Bitte wählen");
  const [wpa, setWpa] = React.useState(0);

  const [fieldErrors, setFieldErrors] = React.useState<fieldErrorEnum[]>([]);

  const [isPalInfoIconClicked, setIsPalInfoIconClicked] = React.useState(false);

  const palCatergories = [
    "Bitte wählen",
    "nicht aktiv",
    "eher nicht aktiv",
    "eher aktiv",
    "aktiv",
    "sehr aktiv",
  ];
  const goals = ["Bitte wählen", "Aufbauen", "Definieren", "Halten"];
  const genders = ["Bitte wählen", "Männlich", "Weiblich", "Divers"];
  /* const [isGoogleSignInButtonClicked, setIsGoogleSignInButtonClicked] =
    React.useState(false);
  const [isGoogleSignUpButtonClicked, setIsGoogleSignUpButtonClicked] =
    React.useState(false);*/ //tdb

  const signIn = useSignIn(); //tbd
  const navigate = useNavigate();
  /*const isAuthenticated = useIsAuthenticated();

  React.useEffect(() => {
    console.log("isAuthenticated" + isAuthenticated());
    if (isAuthenticated()) {
      navigate("/");
    }
  }, []);*/

  const handleSignInButtonClick = () => {
    authenticateAppUser({ email: email, password: password }).then(
      (response) => {
        console.log(response);
        signIn({
          token: response.data.token,
          tokenType: "Bearer",
          expiresIn: 3600,
        });
        navigate("/");
      }
    );
  };

  const handleSignUpButtonClick = () => {
    const formattedDob = dob!.format("YYYY-MM-DD");
    console.log(dob!.isValid());
    registerAppUser({
      name: name,
      weight: weight,
      dob: formattedDob,
      goal: goal,
      height: height,
      gender: gender,
      pal: pal,
      wpa: wpa,
      email: email,
      password: password,
    }).then((response) => {
      console.log(response);
      signIn({
        token: response.data.token,
        tokenType: "Bearer",
        expiresIn: 3600,
      });
      navigate("/");
    });
  };

  const handleGoogleSignInButtonClick = () => {};
  const handleGoogleSignUpButtonClick = () => {};

  const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFieldErrorsBeforeSignIn = () => {
    if (!validateEmail(email)) {
      setFieldErrors((error) => [...error, fieldErrorEnum.EMAIL]);
    }
    if (password === "") {
      setFieldErrors((error) => [...error, fieldErrorEnum.PASSWORD]);
    }
  };

  const handleFieldErrorsBeforeSignUp = () => {
    if (name === "") {
      setFieldErrors((error) => [...error, fieldErrorEnum.NAME]);
    }
    if (
      dob === null ||
      dob.isSame(dayjs(new Date()), "day") ||
      dob.isAfter(dayjs(new Date()), "day")
    ) {
      setFieldErrors((error) => [...error, fieldErrorEnum.DOB]);
    }
    if (height <= 0) {
      setFieldErrors((error) => [...error, fieldErrorEnum.HEIGHT]);
    }
    if (weight <= 0) {
      setFieldErrors((error) => [...error, fieldErrorEnum.WEIGHT]);
    }

    if (gender === "Bitte wählen") {
      setFieldErrors((error) => [...error, fieldErrorEnum.GENDER]);
    }
    if (goal === "Bitte wählen") {
      setFieldErrors((error) => [...error, fieldErrorEnum.GOAL]);
    }
    if (pal === "Bitte wählen") {
      setFieldErrors((error) => [...error, fieldErrorEnum.PAL]);
    }
    if (wpa < 0) {
      setFieldErrors((error) => [...error, fieldErrorEnum.WPA]);
    }
    if (!validateEmail(email)) {
      setFieldErrors((error) => [...error, fieldErrorEnum.EMAIL]);
    }
    if (password === "") {
      setFieldErrors((error) => [...error, fieldErrorEnum.PASSWORD]);
    }
  };

  return (
    <Container sx={{ width: "30%", marginTop: "5%" }}>
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
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Stack spacing="5%">
            {!onSignInPage && (
              <>
                <TextInputField
                  label="Name"
                  width="100%"
                  value={name}
                  setValue={setName}
                  hasError={fieldErrors.includes(fieldErrorEnum.NAME)}
                  errorText={"Pflichtfeld muss ausgefüllt werden."}
                  required={true}
                  autoFocus={!onSignInPage && true}
                />
                <BasicDatePicker
                  label="Geburtsdatum"
                  value={dob}
                  onChange={setDob}
                  width="100%"
                  hasError={fieldErrors.includes(fieldErrorEnum.DOB)}
                  errorText={
                    "Dein Geburtstag muss in der Vergangenheit liegen."
                  }
                  required={true}
                />
                <FloatInputField
                  label="Größe"
                  suffix="cm"
                  value={height}
                  setValue={setHeight}
                  hasError={fieldErrors.includes(fieldErrorEnum.HEIGHT)}
                  errorText="Deine Größe kann nicht negativ oder 0 sein."
                  width="100%"
                  required={true}
                />
                <FloatInputField
                  label="Gewicht"
                  suffix="kg"
                  value={weight}
                  setValue={setWeight}
                  hasError={fieldErrors.includes(fieldErrorEnum.WEIGHT)}
                  errorText="Dein Gewicht kann nicht negativ oder 0 sein."
                  width="100%"
                  required={true}
                />
                <DropDownMenu
                  title={"Geschlecht"}
                  width={"100%"}
                  options={genders}
                  value={gender}
                  setValue={setGender}
                  required={true}
                  hasError={fieldErrors.includes(fieldErrorEnum.GENDER)}
                />
                <DropDownMenu
                  title={"persönliches Ziel"}
                  width={"100%"}
                  options={goals}
                  value={goal}
                  setValue={setGoal}
                  required={true}
                  hasError={fieldErrors.includes(fieldErrorEnum.GOAL)}
                />
                <Box>
                  <DropDownMenu
                    title={"alltägliches körperliches Aktivitätslevel"}
                    width={"100%"}
                    options={palCatergories}
                    value={pal}
                    setValue={setPal}
                    infoIcon={true}
                    isInfoIconClicked={isPalInfoIconClicked}
                    setIsInfoIconClicked={setIsPalInfoIconClicked}
                    required={true}
                    hasError={fieldErrors.includes(fieldErrorEnum.PAL)}
                  />
                  {isPalInfoIconClicked && (
                    <Box
                      sx={{
                        width: "30%",
                        position: "absolute",
                        top: "50%",
                        right: "2%",
                      }}
                    >
                      <InfoAlert
                        title={"Kategorien des körperlichen Aktivitätslevels:"}
                        description={""}
                        table={<PalTable />}
                      />
                    </Box>
                  )}
                </Box>
                <FloatInputField
                  label={"sportliche Aktivität in Stunden/Woche"}
                  suffix={"h/w"}
                  width={"100%"}
                  value={wpa}
                  setValue={setWpa}
                  hasError={fieldErrors.includes(fieldErrorEnum.WPA)}
                  errorText={
                    "Deine sportliche Akivität kann nicht negativ sein."
                  }
                  required={false}
                />
              </>
            )}
            <TextInputField
              label="E-Mail-Addresse"
              width="100%"
              value={email}
              setValue={setEmail}
              required={true}
              autoComplete="email"
              autoFocus={onSignInPage && true}
              hasError={fieldErrors.includes(fieldErrorEnum.EMAIL)}
              errorText={"Gib eine gültige E-Mail-Adresse an."}
            />
            <TextInputField
              label="Passwort"
              width="100%"
              value={password}
              setValue={setPassword}
              required={true}
              type="password"
              autoComplete="current-password"
              hasError={fieldErrors.includes(fieldErrorEnum.PASSWORD)}
              errorText={"Pflichtfeld muss ausgefüllt werden."}
            />
          </Stack>
          <Box sx={{ marginTop: "5%" }}>
            <BasicButton
              label={onSignInPage ? "Einloggen" : "Registrieren"}
              width={"100%"}
              isButtonClicked={
                onSignInPage ? isSignInButtonClicked : isSignUpButtonClicked
              }
              onButtonClick={
                onSignInPage
                  ? () => {
                      setFieldErrors([]);
                      if (!validateEmail(email) || password === "") {
                        handleFieldErrorsBeforeSignIn();
                      } else {
                        handleSignInButtonClick();
                      }
                    }
                  : () => {
                      setFieldErrors([]);
                      if (
                        name === "" ||
                        dob === null ||
                        dob.isSame(dayjs(new Date()), "day") ||
                        dob.isAfter(dayjs(new Date()), "day") ||
                        height <= 0 ||
                        weight <= 0 ||
                        gender === "Bitte wählen" ||
                        goal === "Bitte wählen" ||
                        pal === "Bitte wählen" ||
                        wpa < 0 ||
                        !validateEmail(email) ||
                        password === ""
                      ) {
                        handleFieldErrorsBeforeSignUp();
                      } else {
                        handleSignUpButtonClick();
                      }
                    }
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
                width: "100%",
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
};
