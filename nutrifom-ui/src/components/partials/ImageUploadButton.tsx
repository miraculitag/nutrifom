import { FileUpload } from "@mui/icons-material";
import { IconButton, LinearProgress, Tooltip, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { getAppUser, putAppUserImage } from "../../api";
import { AppUser } from "../../types";
import { ErrorDialog } from "../common/ErrorDialog";

export interface ImageUploadButtonProps {
  setUser: (user: AppUser) => void;
}

export default function ImageUploadButton(props: ImageUploadButtonProps) {
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [openErrorDialog, setOpenErrorDialog] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const theme = useTheme();
  const auth = useAuthHeader();

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
        setOpenErrorDialog(true);
      } else {
        const formData = new FormData();
        formData.append("image", image);
        setIsUploading(true);
        try {
          await putAppUserImage(formData, auth());
          const updatedUser = await getAppUser(auth());
          props.setUser(updatedUser.data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsUploading(false);
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
        keepMounted
        open={openErrorDialog}
        setOpen={setOpenErrorDialog}
        heading={"Überschreitung der Bildgröße"}
        errorMessage={
          "Die Bilddatei ist zu groß. Bitte wähle eine Bilddatei, die maximal ein MB groß ist."
        }
      />
    </>
  );
}