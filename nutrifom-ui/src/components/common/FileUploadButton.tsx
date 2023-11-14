import React from "react";
import { IconButton, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { FileUpload } from "@mui/icons-material";
//import axios from "axios"; tbd

export default function FileUploadButton() {
  const theme = useTheme();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const StyledInput = styled("input")({
    display: "none",
  });

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <StyledInput ref={inputRef} type="file" accept="image/*" />
      <IconButton onClick={handleIconClick}>
        <FileUpload
          sx={{ fontSize: "150%", color: theme.palette.primary.main }}
        />
      </IconButton>
    </>
  );
}
