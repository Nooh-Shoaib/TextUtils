import { useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  Box,
  TextField,
  Slider,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { HexColorPicker } from "react-colorful";

export default function ColorPicker() {
  const [color, setColor] = useState("#1976d2");
  const [rgb, setRgb] = useState({ r: 25, g: 118, b: 210 });
  const [hsl, setHsl] = useState({ h: 211, s: 79, l: 46 });
  const [alpha, setAlpha] = useState(100);
  const [showCopied, setShowCopied] = useState(false);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    // Convert HEX to RGB
    const r = parseInt(newColor.slice(1, 3), 16);
    const g = parseInt(newColor.slice(3, 5), 16);
    const b = parseInt(newColor.slice(5, 7), 16);
    setRgb({ r, g, b });

    // Convert RGB to HSL
    const rNorm = r / 255;
    const gNorm = g / 255;
    const bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm);
    const min = Math.min(rNorm, gNorm, bNorm);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm:
          h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
          break;
        case gNorm:
          h = (bNorm - rNorm) / d + 2;
          break;
        case bNorm:
          h = (rNorm - gNorm) / d + 4;
          break;
      }
      h /= 6;
    }

    setHsl({
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setShowCopied(true);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Color Picker
            </Typography>
            <HexColorPicker color={color} onChange={handleColorChange} />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography gutterBottom>Opacity</Typography>
            <Slider
              value={alpha}
              onChange={(_, value) => setAlpha(value)}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Color Values
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                HEX
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  value={color.toUpperCase()}
                  InputProps={{ readOnly: true }}
                />
                <IconButton
                  onClick={() => copyToClipboard(color.toUpperCase())}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                RGB
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b}${
                    alpha !== 100 ? `, ${alpha}%` : ""
                  })`}
                  InputProps={{ readOnly: true }}
                />
                <IconButton
                  onClick={() =>
                    copyToClipboard(
                      `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}${
                        alpha !== 100 ? `, ${alpha}%` : ""
                      })`
                    )
                  }
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                HSL
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%${
                    alpha !== 100 ? `, ${alpha}%` : ""
                  })`}
                  InputProps={{ readOnly: true }}
                />
                <IconButton
                  onClick={() =>
                    copyToClipboard(
                      `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%${
                        alpha !== 100 ? `, ${alpha}%` : ""
                      })`
                    )
                  }
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Preview
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  height: 100,
                  borderRadius: 1,
                  bgcolor: color,
                  opacity: alpha / 100,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Snackbar
        open={showCopied}
        autoHideDuration={2000}
        onClose={() => setShowCopied(false)}
        message="Copied to clipboard!"
      />
    </Paper>
  );
}
