import { FileUpload } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  LinearProgress,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useAuthHeader } from "react-auth-kit";
import { getAppUser, putAppUserImage } from "../../api";
import { AppUser } from "../../types";

export interface ImageUploadButtonProps {
  setUser: (user: AppUser) => void;
}

export default function ImageUploadButton(props: ImageUploadButtonProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [isUploading, setIsUploading] = React.useState<boolean>(false);

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
    console.log(image);
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      setIsUploading(true);
      const config = {
        onUploadProgress: (progressEvent: ProgressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
        headers: {
          Authorization: auth() || "",
          "Content-Type": "multipart/form-data",
        },
      };
      try {
        await putAppUserImage(formData, auth()); //config tbd
        const updatedUser = await getAppUser(auth());
        props.setUser(updatedUser.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
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
      <IconButton onClick={handleIconClick}>
        <FileUpload
          sx={{ fontSize: "150%", color: theme.palette.primary.main }}
        />
      </IconButton>
      {isUploading && (
        <LinearProgress
          variant="determinate"
          value={uploadProgress}
          sx={{
            height: 10, // Höhe der Fortschrittsleiste
            borderRadius: 5, // Abrundung der Ecken
            backgroundColor: "rgba(0, 0, 0, 0.2)", // Hintergrundfarbe
            "& .MuiLinearProgress-bar": {
              borderRadius: 5, // Abrundung der Ecken des Fortschrittsbalkens
              backgroundColor: theme.palette.primary.main, // Farbe des Fortschrittsbalkens
            },
          }}
        />
      )}
    </>
  );
}
