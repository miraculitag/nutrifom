import React from "react";
import { FileUpload } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { useAuthHeader } from "react-auth-kit";
import { putAppUserImage } from "../../api";

export default function ImageUploadButton() {
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files && event.target.files[0];
    if (image) {
      putAppUserImage(image, auth()); //tbd
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
    </>
  );
}
