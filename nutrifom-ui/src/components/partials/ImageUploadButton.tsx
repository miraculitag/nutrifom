  import { FileUpload } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
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

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const image = event.target.files && event.target.files[0];
      console.log(image);
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        try {
          await putAppUserImage(formData, auth());
        } catch (error) {
          console.error(error);
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
      </>
    );
  }
