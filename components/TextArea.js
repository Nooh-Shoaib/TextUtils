import { useState } from "react";
import { TextField, IconButton, Snackbar, Box, Alert } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

export default function TextArea({
  value,
  onChange,
  placeholder = "Enter your text here...",
  className = "",
  showCopy = true,
  error = false,
  helperText = "",
  label = "",
  disabled = false,
  sx,
  ...props
}) {
  const [copied, setCopied] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setSnackbarOpen(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <TextField
        multiline
        fullWidth
        minRows={8}
        maxRows={20}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        variant="outlined"
        className={className}
        error={error}
        helperText={helperText}
        label={label}
        disabled={disabled}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "background.paper",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          },
          ...sx,
        }}
        {...props}
      />
      {showCopy && value && (
        <IconButton
          onClick={copyToClipboard}
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            backgroundColor: "background.paper",
            "&:hover": {
              backgroundColor: "action.hover",
            },
            zIndex: 1,
          }}
          color={copied ? "success" : "primary"}
          size="small"
        >
          {copied ? <CheckIcon /> : <ContentCopyIcon />}
        </IconButton>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Copied to clipboard
        </Alert>
      </Snackbar>
    </Box>
  );
}
