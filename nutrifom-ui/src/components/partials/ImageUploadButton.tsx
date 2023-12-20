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
    </>
  );
}
