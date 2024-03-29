import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import { IconButton, LinearProgress, Tooltip, useTheme } from "@mui/material";
import { FileUpload } from "@mui/icons-material";
import { styled } from "@mui/system";
import {
  getAppUser,
  handleTokenExpiration,
  isTokenExpired,
  putAppUserImage,
} from "../../api";
import { useUser } from "../../userContext";
import { ErrorDialog } from "../dialogs/ErrorDialog";

export const ImageUploadButton = () => {
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] =
    React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const theme = useTheme();
  const auth = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const StyledInput = styled("input")({
    display: "none",
  });

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const image = event.target.files && event.target.files[0];
    if (image) {
      const fileSizeInMB = image.size / (1024 * 1024);

      if (fileSizeInMB > 1) {
        setIsErrorDialogOpen(true);
      } else {
        const formData = new FormData();
        formData.append("image", image);
        setIsUploading(true);
        if (isTokenExpired(auth())) {
          handleTokenExpiration(signOut, navigate);
        } else {
          putAppUserImage(formData, auth())
            .then(() => getAppUser(auth()))
            .then((updatedUser) => {
              updateUser(updatedUser.data);
            })
            .finally(() => {
              setIsUploading(false);
            });
        }
      }
    }
  };

  return (
    <>
      <StyledInput
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <Tooltip title="Profilbild hochladen (max. 1 MB groß)">
        <IconButton onClick={handleIconClick}>
          <FileUpload
            sx={{ fontSize: "150%", color: theme.palette.primary.main }}
          />
        </IconButton>
      </Tooltip>
      {isUploading && (
        <LinearProgress
          sx={{
            height: 5,
            borderRadius: 5,
            backgroundColor: theme.palette.primary.light,
            "& .MuiLinearProgress-bar": {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        />
      )}
      <ErrorDialog
        open={isErrorDialogOpen}
        setOpen={setIsErrorDialogOpen}
        heading={"Überschreitung der Bildgröße"}
        errorMessage={
          "Die Bilddatei ist zu groß. Bitte wähle eine Bilddatei, die maximal ein MB groß ist."
        }
      />
    </>
  );
};
