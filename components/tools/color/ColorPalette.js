import { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  Snackbar,
  ToggleButtonGroup,
  ToggleButton,
  Tooltip,
} from "@mui/material";
import { HexColorPicker } from "react-colorful";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import RefreshIcon from "@mui/icons-material/Refresh";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ShuffleIcon from "@mui/icons-material/Shuffle";

export default function ColorPalette() {
  const [baseColor, setBaseColor] = useState("#1976d2");
  const [paletteType, setPaletteType] = useState("analogous");
  const [palette, setPalette] = useState([]);
  const [lockedColors, setLockedColors] = useState([]);
  const [showCopied, setShowCopied] = useState(false);

  // Convert hex to HSL
  const hexToHSL = (hex) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  };

  // Convert HSL to hex
  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const generatePalette = () => {
    const [h, s, l] = hexToHSL(baseColor);
    let newPalette = [];

    switch (paletteType) {
      case "analogous":
        newPalette = [
          hslToHex(h - 30, s, l),
          hslToHex(h - 15, s, l),
          baseColor,
          hslToHex(h + 15, s, l),
          hslToHex(h + 30, s, l),
        ];
        break;
      case "monochromatic":
        newPalette = [
          hslToHex(h, s, l - 30),
          hslToHex(h, s, l - 15),
          baseColor,
          hslToHex(h, s, l + 15),
          hslToHex(h, s, l + 30),
        ];
        break;
      case "complementary":
        newPalette = [
          hslToHex(h, s, l - 15),
          baseColor,
          hslToHex(h, s, l + 15),
          hslToHex((h + 180) % 360, s, l - 15),
          hslToHex((h + 180) % 360, s, l + 15),
        ];
        break;
      case "triadic":
        newPalette = [
          baseColor,
          hslToHex((h + 120) % 360, s, l),
          hslToHex((h + 240) % 360, s, l),
          hslToHex(h, s - 20, l),
          hslToHex(h, s + 20, l),
        ];
        break;
      case "random":
        newPalette = Array(5)
          .fill(0)
          .map(
            () =>
              `#${Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0")}`
          );
        break;
    }

    // Preserve locked colors
    const finalPalette = newPalette.map((color, index) =>
      lockedColors.includes(index) ? palette[index] : color
    );
    setPalette(finalPalette);
  };

  const toggleLock = (index) => {
    setLockedColors((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
  };

  // Generate initial palette on component mount
  useEffect(() => {
    generatePalette();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Base Color
            </Typography>
            <HexColorPicker
              color={baseColor}
              onChange={(color) => {
                setBaseColor(color);
                generatePalette();
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Palette Type
            </Typography>
            <ToggleButtonGroup
              value={paletteType}
              exclusive
              onChange={(_, value) => {
                if (value) {
                  setPaletteType(value);
                  generatePalette();
                }
              }}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                "& .MuiToggleButton-root": {
                  flex: "1 1 auto",
                  minWidth: "120px",
                  textTransform: "capitalize",
                  borderRadius: 1,
                  p: 1,
                  border: "1px solid",
                  borderColor: "divider",
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "primary.contrastText",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                  },
                },
              }}
            >
              <ToggleButton value="analogous">Analogous</ToggleButton>
              <ToggleButton value="monochromatic">Monochromatic</ToggleButton>
              <ToggleButton value="complementary">Complementary</ToggleButton>
              <ToggleButton value="triadic">Triadic</ToggleButton>
              <ToggleButton value="random">Random</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={generatePalette}
            fullWidth
            sx={{
              p: 1.5,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Generate Palette
          </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Generated Palette
          </Typography>

          <Box
            sx={{
              minHeight: "300px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              overflow: "hidden",
            }}
          >
            {palette.length > 0 ? (
              <>
                {palette.map((color, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 1,
                      borderRadius: 1,
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "background.paper",
                      width: "100%",
                      minWidth: 0,
                    }}
                  >
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        bgcolor: color,
                        borderRadius: 1,
                        border: "1px solid",
                        borderColor: "divider",
                        flexShrink: 0,
                      }}
                    />
                    <TextField
                      value={color.toUpperCase()}
                      size="small"
                      InputProps={{
                        readOnly: true,
                        sx: { width: "100%", minWidth: 0 },
                      }}
                      sx={{
                        flexGrow: 1,
                        minWidth: 0,
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        flexShrink: 0,
                      }}
                    >
                      <IconButton
                        onClick={() => copyToClipboard(color.toUpperCase())}
                        size="small"
                      >
                        <ContentCopyIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => toggleLock(index)}
                        size="small"
                      >
                        {lockedColors.includes(index) ? (
                          <LockIcon />
                        ) : (
                          <LockOpenIcon />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                ))}

                <Box
                  sx={{
                    mt: 2,
                    p: 2,
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    gap: 1,
                    height: 100,
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  {palette.map((color, index) => (
                    <Box
                      key={index}
                      sx={{
                        flexGrow: 1,
                        bgcolor: color,
                        borderRadius: 1,
                        border: "1px solid",
                        borderColor: "divider",
                        minWidth: 0,
                      }}
                    />
                  ))}
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "text.secondary",
                }}
              >
                <Typography>
                  Click "Generate Palette" to create a color palette
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={showCopied}
        autoHideDuration={2000}
        onClose={() => setShowCopied(false)}
        message="Color copied to clipboard!"
      />
    </Paper>
  );
}
