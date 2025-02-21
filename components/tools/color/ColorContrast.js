import { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  Box,
  TextField,
  Alert,
  AlertTitle,
  Divider,
} from "@mui/material";
import { HexColorPicker } from "react-colorful";

export default function ColorContrast() {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#FFFFFF");
  const [contrast, setContrast] = useState(21);
  const [wcagAA, setWcagAA] = useState({
    normal: true,
    large: true,
  });
  const [wcagAAA, setWcagAAA] = useState({
    normal: true,
    large: true,
  });

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const getLuminance = (r, g, b) => {
    let [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return rs * 0.2126 + gs * 0.7152 + bs * 0.0722;
  };

  const calculateContrast = (fg, bg) => {
    const fgRgb = hexToRgb(fg);
    const bgRgb = hexToRgb(bg);

    if (!fgRgb || !bgRgb) return 1;

    const fgLuminance = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
    const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

    const lighter = Math.max(fgLuminance, bgLuminance);
    const darker = Math.min(fgLuminance, bgLuminance);

    return (lighter + 0.05) / (darker + 0.05);
  };

  const checkWCAG = (ratio) => {
    setWcagAA({
      normal: ratio >= 4.5,
      large: ratio >= 3,
    });
    setWcagAAA({
      normal: ratio >= 7,
      large: ratio >= 4.5,
    });
  };

  useEffect(() => {
    const ratio = calculateContrast(foreground, background);
    setContrast(Math.round(ratio * 100) / 100);
    checkWCAG(ratio);
  }, [foreground, background]);

  const getContrastLevel = (ratio) => {
    if (ratio >= 7) return "Excellent";
    if (ratio >= 4.5) return "Good";
    if (ratio >= 3) return "Fair";
    return "Poor";
  };

  const getContrastColor = (ratio) => {
    if (ratio >= 7) return "success";
    if (ratio >= 4.5) return "info";
    if (ratio >= 3) return "warning";
    return "error";
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Foreground Color
          </Typography>
          <Box sx={{ mb: 3 }}>
            <HexColorPicker color={foreground} onChange={setForeground} />
            <TextField
              fullWidth
              value={foreground.toUpperCase()}
              onChange={(e) => setForeground(e.target.value)}
              sx={{ mt: 2 }}
            />
          </Box>

          <Typography variant="h6" gutterBottom>
            Background Color
          </Typography>
          <Box>
            <HexColorPicker color={background} onChange={setBackground} />
            <TextField
              fullWidth
              value={background.toUpperCase()}
              onChange={(e) => setBackground(e.target.value)}
              sx={{ mt: 2 }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Preview
          </Typography>

          <Box
            sx={{
              p: 3,
              mb: 3,
              bgcolor: background,
              borderRadius: 1,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="h4" sx={{ color: foreground, mb: 2 }}>
              Large Text (24px)
            </Typography>
            <Typography sx={{ color: foreground }}>
              Normal text (16px) - The quick brown fox jumps over the lazy dog.
            </Typography>
          </Box>

          <Alert severity={getContrastColor(contrast)} sx={{ mb: 3 }}>
            <AlertTitle>Contrast Ratio: {contrast}:1</AlertTitle>
            Contrast Level: {getContrastLevel(contrast)}
          </Alert>

          <Typography variant="h6" gutterBottom>
            WCAG 2.1 Compliance
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Level AA Requirements
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography
                color={wcagAA.normal ? "success.main" : "error.main"}
                gutterBottom
              >
                • Normal Text (4.5:1) - {wcagAA.normal ? "Pass" : "Fail"}
              </Typography>
              <Typography
                color={wcagAA.large ? "success.main" : "error.main"}
                gutterBottom
              >
                • Large Text (3:1) - {wcagAA.large ? "Pass" : "Fail"}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Level AAA Requirements
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Typography
                color={wcagAAA.normal ? "success.main" : "error.main"}
                gutterBottom
              >
                • Normal Text (7:1) - {wcagAAA.normal ? "Pass" : "Fail"}
              </Typography>
              <Typography
                color={wcagAAA.large ? "success.main" : "error.main"}
                gutterBottom
              >
                • Large Text (4.5:1) - {wcagAAA.large ? "Pass" : "Fail"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              * Large text is defined as 14 point (18.66px) and bold or larger,
              or 18 point (24px) or larger
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
