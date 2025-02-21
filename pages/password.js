import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  IconButton,
  Tooltip,
  Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import ActionButton from "@/components/ActionButton";
import SEO from "@/components/SEO";

const generatePassword = (length, options) => {
  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  // Ensure at least one character set is selected
  if (!Object.values(options).some((value) => value)) {
    return "";
  }

  // Create the character pool based on selected options
  let chars = "";
  Object.entries(options).forEach(([key, value]) => {
    if (value) chars += charSets[key];
  });

  // Generate the password
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Ensure at least one character from each selected set is included
  let finalPassword = password.split("");
  Object.entries(options).forEach(([key, value]) => {
    if (value) {
      const randomChar = charSets[key].charAt(
        Math.floor(Math.random() * charSets[key].length)
      );
      const randomPosition = Math.floor(Math.random() * length);
      finalPassword[randomPosition] = randomChar;
    }
  });

  return finalPassword.join("");
};

const calculatePasswordStrength = (password) => {
  if (!password) return { score: 0, label: "No Password" };

  let score = 0;
  const checks = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[!@#$%^&*()_+\-=[\]{};:,.<>?]/.test(password),
    noRepeating: !/(.)\1{2,}/.test(password),
  };

  Object.values(checks).forEach((passed) => {
    if (passed) score++;
  });

  const strengthLevels = [
    { score: 0, label: "Very Weak", color: "error" },
    { score: 2, label: "Weak", color: "error" },
    { score: 3, label: "Moderate", color: "warning" },
    { score: 4, label: "Strong", color: "info" },
    { score: 6, label: "Very Strong", color: "success" },
  ];

  return strengthLevels.reduce((acc, level) => {
    if (score >= level.score) return level;
    return acc;
  });
};

export default function Password() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(length, options);
    setPassword(newPassword);
    setCopied(false);
  };

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setShowCopyAlert(true);
      setTimeout(() => {
        setCopied(false);
        setShowCopyAlert(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy password:", err);
    }
  };

  const passwordStrength = calculatePasswordStrength(password);

  return (
    <>
      <SEO
        title="Password Generator | Text Utils Pro"
        description="Generate secure passwords with customizable length and character types. Includes password strength checker and copy functionality."
        keywords="password generator, secure password, random password, password strength, password creator"
      />

      <Container maxWidth="md">
        <Box sx={{ py: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Password Generator
          </Typography>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                value={password}
                placeholder="Generated password will appear here"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <Box>
                      <Tooltip title={copied ? "Copied!" : "Copy password"}>
                        <IconButton
                          onClick={handleCopyPassword}
                          color={copied ? "success" : "default"}
                        >
                          <ContentCopyIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Generate new password">
                        <IconButton onClick={handleGeneratePassword}>
                          <RefreshIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  ),
                }}
              />
            </Box>

            {showCopyAlert && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Password copied to clipboard!
              </Alert>
            )}

            {password && (
              <Alert severity={passwordStrength.color} sx={{ mb: 3 }}>
                Password Strength: {passwordStrength.label}
              </Alert>
            )}

            <Typography gutterBottom>Password Length: {length}</Typography>
            <Slider
              value={length}
              onChange={(_, value) => setLength(value)}
              min={8}
              max={32}
              marks={[
                { value: 8, label: "8" },
                { value: 16, label: "16" },
                { value: 24, label: "24" },
                { value: 32, label: "32" },
              ]}
              sx={{ mb: 3 }}
            />

            <FormGroup>
              <Typography gutterBottom>Character Types:</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.uppercase}
                    onChange={(e) =>
                      setOptions({ ...options, uppercase: e.target.checked })
                    }
                  />
                }
                label="Uppercase Letters (A-Z)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.lowercase}
                    onChange={(e) =>
                      setOptions({ ...options, lowercase: e.target.checked })
                    }
                  />
                }
                label="Lowercase Letters (a-z)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.numbers}
                    onChange={(e) =>
                      setOptions({ ...options, numbers: e.target.checked })
                    }
                  />
                }
                label="Numbers (0-9)"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={options.symbols}
                    onChange={(e) =>
                      setOptions({ ...options, symbols: e.target.checked })
                    }
                  />
                }
                label="Special Characters (!@#$%^&*)"
              />
            </FormGroup>

            <Box sx={{ mt: 3 }}>
              <ActionButton onClick={handleGeneratePassword} fullWidth>
                Generate Password
              </ActionButton>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
