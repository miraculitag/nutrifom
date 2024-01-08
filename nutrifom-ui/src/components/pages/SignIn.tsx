import React from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import { GoogleLogin } from "@react-oauth/google";
import { Avatar, Box, Container, Link, Stack, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import dayjs, { Dayjs } from "dayjs";
import { jwtDecode } from "jwt-decode";
import { authenticateAppUser, registerAppUser } from "../../api";
import { RegisterRequest, fieldErrorEnum } from "../../types";
import { BasicButton } from "../common/BasicButton";
import { BasicDatePicker } from "../common/BasicDatePicker";
import { DropDownMenu } from "../common/DropDownMenu";
import { FloatInputField } from "../common/FloatInputField";
import { InfoAlert } from "../common/InfoAlert";
import { PalTable } from "../common/PalTable";
import { TextInputField } from "../common/TextInputField";

export const SignIn = () => {
  const [onSignInPage, setOnSignInPage] = React.useState<boolean>(true);
  const [isPalInfoIconClicked, setIsPalInfoIconClicked] =
    React.useState<boolean>(false);
  const [emailSignIn, setEmailSignIn] = React.useState<string>("");
  const [emailSignUp, setEmailSignUp] = React.useState<string>("");
  const [passwordSignIn, setPasswordSignIn] = React.useState<string>("");
  const [passwordSignUp, setPasswordSignUp] = React.useState<string>("");
  const [googleIDTokenSignUp, setGoogleIDTokenSignUp] =
    React.useState<string>("");
  const [isPasswordSignUpHidden, setIsPasswordSignUpHidden] =
    React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [initialWeight, setWeight] = React.useState<number>(0);
  const [dob, setDob] = React.useState<Dayjs | null>(dayjs(new Date()));
  const [goal, setGoal] = React.useState<string>("Bitte wählen");
  const [height, setHeight] = React.useState<number>(0);
  const [gender, setGender] = React.useState<string>("Bitte wählen");
  const [pal, setPal] = React.useState<string>("Bitte wählen");
  const [wpa, setWpa] = React.useState<number>(0);

  const [emailSignUpError, setEmailSignUpError] = React.useState<string>(
    "Gib eine gültige E-Mail-Adresse an."
  );
  const [passwordSignInError, setPasswordSignInError] = React.useState<string>(
    "Gib ein Passwort an."
  );
  const [fieldErrors, setFieldErrors] = React.useState<fieldErrorEnum[]>([]);

  const signIn = useSignIn();
  const navigate = useNavigate();

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

  const handleSignInButtonClick = () => {
    authenticateAppUser({ email: emailSignIn, password: passwordSignIn })
      .then((response) => {
        signIn({
          token: response.data.token,
          tokenType: "Bearer",
          expiresIn: 36000,
          authState: {},
        });
        navigate("/");
        window.scrollTo({
          top: 0,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setFieldErrors((error) => [...error, fieldErrorEnum.EMAILSIGNIN]);
        } else if (error.response.status === 401) {
          setFieldErrors((error) => [...error, fieldErrorEnum.PASSWORDSIGNIN]);
          setPasswordSignInError("Das Passwort ist falsch.");
        }
      });
  };

  const handleSignUpButtonClick = () => {
    const formattedDob = dob!.format("YYYY-MM-DD");
    let signUpData: RegisterRequest = {
      name: name,
      initialWeight: initialWeight,
      dob: formattedDob,
      goal: goal,
      height: height,
      gender: gender,
      pal: pal,
      wpa: wpa,
      email: emailSignUp,
    };

    if (googleIDTokenSignUp) {
      signUpData.googleIDToken = googleIDTokenSignUp;
    } else {
      signUpData.password = passwordSignUp;
    }

    registerAppUser(signUpData)
      .then((response) => {
        signIn({
          token: response.data.token,
          tokenType: "Bearer",
          expiresIn: 36000,
          authState: {},
        });
        navigate("/");
        window.scrollTo({
          top: 0,
        });
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setFieldErrors((error) => [...error, fieldErrorEnum.EMAILSIGNUP]);
          setEmailSignUpError(
            "Es gibt bereits einen Account zu dieser E-Mail-Adresse."
          );
        }
      });
  };

  const handleGoogleSignIn = (response: any) => {
    const googleIDToken = response.credential;

    const customizedPayload: { email: string } = jwtDecode(response.credential);

    const googleEmail = customizedPayload.email;

    authenticateAppUser({
      email: googleEmail,
      googleIDToken: googleIDToken,
    })
      .then((response) => {
        const decodedToken = jwtDecode(response.data.token);
        const time = decodedToken.exp || 36000;
        signIn({
          token: response.data.token,
          tokenType: "Bearer",
          expiresIn: time,
          authState: {},
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 404) {
          alert(
            "Es gibt noch keinen nutrifom Account zu deinem Google Account."
          );
        }
      });
  };

  const handleGoogleSignUp = (response: any) => {
    const googleIDToken = response.credential;

    const customizedPayload: { email: string } = jwtDecode(response.credential);

    const googleEmail = customizedPayload.email;

    setGoogleIDTokenSignUp(googleIDToken);
    setEmailSignUp(googleEmail);
    setIsPasswordSignUpHidden(true);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Regex from ChatGPT 3.5
    return emailRegex.test(email);
  };

  const handleFieldErrorsBeforeSignIn = () => {
    if (!validateEmail(emailSignIn)) {
      setFieldErrors((error) => [...error, fieldErrorEnum.EMAILSIGNIN]);
    }
    if (passwordSignIn === "") {
      setFieldErrors((error) => [...error, fieldErrorEnum.PASSWORDSIGNIN]);
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
    if (initialWeight <= 0) {
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
    if (!validateEmail(emailSignUp)) {
      setFieldErrors((error) => [...error, fieldErrorEnum.EMAILSIGNUP]);
    }
    if (!isPasswordSignUpHidden && passwordSignUp === "") {
      setFieldErrors((error) => [...error, fieldErrorEnum.PASSWORDSIGNUP]);
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
                  errorText={"Gib einen Namen an."}
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
                  value={initialWeight}
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
              value={onSignInPage ? emailSignIn : emailSignUp}
              setValue={onSignInPage ? setEmailSignIn : setEmailSignUp}
              required={true}
              autoComplete="email"
              autoFocus={onSignInPage && true}
              hasError={
                onSignInPage
                  ? fieldErrors.includes(fieldErrorEnum.EMAILSIGNIN)
                  : fieldErrors.includes(fieldErrorEnum.EMAILSIGNUP)
              }
              errorText={
                onSignInPage
                  ? "Es gibt keinen Account zu dieser E-Mail-Adresse."
                  : emailSignUpError
              }
            />
            {onSignInPage && (
              <TextInputField
                label="Passwort"
                width="100%"
                value={passwordSignIn}
                setValue={setPasswordSignIn}
                required={true}
                type="password"
                autoComplete="current-password"
                hasError={fieldErrors.includes(fieldErrorEnum.PASSWORDSIGNIN)}
                errorText={passwordSignInError}
              />
            )}
            {!onSignInPage && !isPasswordSignUpHidden && (
              <TextInputField
                label="Passwort"
                width="100%"
                value={passwordSignUp}
                setValue={setPasswordSignUp}
                required={true}
                type="password"
                autoComplete="current-password"
                hasError={fieldErrors.includes(fieldErrorEnum.PASSWORDSIGNUP)}
                errorText={"Gib ein Passwort an."}
              />
            )}
          </Stack>
          <Box sx={{ marginTop: "5%" }}>
            <BasicButton
              label={onSignInPage ? "Einloggen" : "Registrieren"}
              width={"100%"}
              onButtonClick={
                onSignInPage
                  ? () => {
                      setFieldErrors([]);
                      if (
                        !validateEmail(emailSignIn) ||
                        passwordSignIn === ""
                      ) {
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
                        initialWeight <= 0 ||
                        gender === "Bitte wählen" ||
                        goal === "Bitte wählen" ||
                        pal === "Bitte wählen" ||
                        wpa < 0 ||
                        !validateEmail(emailSignUp) ||
                        (!isPasswordSignUpHidden && passwordSignUp === "")
                      ) {
                        handleFieldErrorsBeforeSignUp();
                      } else {
                        handleSignUpButtonClick();
                      }
                    }
              }
            />
            <Box
              sx={{
                marginTop: "5%",
                width: "100%",
              }}
            >
              <GoogleLogin
                onSuccess={
                  onSignInPage ? handleGoogleSignIn : handleGoogleSignUp
                }
                theme="outline"
                text="continue_with"
                width="1000"
                type="standard"
                locale="de"
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                marginTop: "5%",
              }}
            >
              <Typography>
                {onSignInPage ? "Noch keinen Account?" : ""}
              </Typography>
              <Link
                onClick={() => {
                  setOnSignInPage(!onSignInPage);
                }}
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
