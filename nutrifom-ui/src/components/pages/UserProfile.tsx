import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { useUser } from "../../userContext";
import { deleteAppUser } from "../../api";
import { ConfirmationDialog } from "../dialogs/ConfirmationDialog";
import { ImageUploadButton } from "../partials/ImageUploadButton";
import { Layout } from "../layout/Layout";

export const UserProfile = () => {
  const [avatarBlob, setAvatarBlob] = React.useState<Blob>(new Blob());
  const [openConfirmationDialog, setOpenConfirmationDialog] =
    React.useState<boolean>(false);

  const theme = useTheme();
  const auth = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const { user } = useUser();

  React.useEffect(() => {
    if (user) {
      if (user.image && user.image.length > 0) {
        const processImage = () => {
          //Structure from ChatGPT 3.5
          const byteCharacters = atob(user.image);
          const byteNumbers = new Array(byteCharacters.length);

          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: "image/jpeg" });

          setAvatarBlob(blob);
        };

        processImage();
      }
    }
  }, [user?.image, user]);

  const userData = [
    { label: "Username", data: user?.name },
    { label: "E-Mail", data: user?.email },
    { label: "Geburtstag", data: dayjs(user?.dob).format("DD.MM.YYYY") },
    { label: "Geschlecht", data: user?.gender },
    { label: "Größe", data: user?.height + " cm" },
  ];

  const handleDeleteButtonClick = () => {
    setOpenConfirmationDialog(true);
  };

  const deleteUserProfile = () => {
    deleteAppUser(auth(), signOut, navigate).then(() => navigate("/signin"));
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            margin: "auto",
            width: "20%",
          }}
        >
          <Avatar
            src={URL.createObjectURL(avatarBlob)}
            sx={{ margin: "auto", width: "200px", height: "200px" }}
          />
          <Box sx={{ float: "right" }}>
            <ImageUploadButton />
          </Box>
        </Box>
        <Box
          sx={{
            margin: "auto",
            width: "50%",
            paddingTop: "3%",
          }}
        >
          <Typography sx={{ fontSize: "150%", paddingBottom: "5%" }}>
            Profildetails
          </Typography>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Grid container spacing={3} alignItems="flex-end">
              {userData.map((field, index) => (
                <Grid item xs={6} key={index}>
                  <TextField
                    label={field.label}
                    variant="standard"
                    value={field.data || ""}
                    inputProps={{ readOnly: true, title: field.data || "" }}
                    InputLabelProps={{ shrink: true }}
                    sx={{ paddingBottom: "5%", width: "100%" }}
                  />
                </Grid>
              ))}
              <Grid item xs={6}>
                <Button
                  onClick={handleDeleteButtonClick}
                  sx={{
                    color: theme.palette.warning.main,
                    "&:hover": {
                      backgroundColor: theme.palette.warning.light,
                    },
                  }}
                >
                  Account löschen
                  <DeleteIcon
                    sx={{
                      fontSize: "125%",
                      marginLeft: "10px",
                    }}
                  />
                </Button>
              </Grid>
            </Grid>
            <ConfirmationDialog
              dialogMessage={"Möchtest du deinen Account wirklich löschen?"}
              open={openConfirmationDialog}
              setOpen={setOpenConfirmationDialog}
              onClose={deleteUserProfile}
            />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};
