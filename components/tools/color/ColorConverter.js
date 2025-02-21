import { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  Box,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { HexColorPicker } from "react-colorful";

export default function ColorConverter() {
  const [hex, setHex] = useState("#1976d2");
  const [rgb, setRgb] = useState({ r: 25, g: 118, b: 210 });
  const [hsl, setHsl] = useState({ h: 211, s: 79, l: 46 });
  const [hsv, setHsv] = useState({ h: 211, s: 88, v: 82 });
  const [cmyk, setCmyk] = useState({ c: 88, m: 44, y: 0, k: 18 });
  const [showCopied, setShowCopied] = useState(false);
  const [error, setError] = useState("");

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

  const rgbToHex = (r, g, b) => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
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

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgbToHsv = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
      h = 0;
    } else {
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

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100),
    };
  };

  const rgbToCmyk = (r, g, b) => {
    let c = 1 - r / 255;
    let m = 1 - g / 255;
    let y = 1 - b / 255;
    let k = Math.min(c, m, y);

    if (k === 1) {
      c = m = y = 0;
    } else {
      c = (c - k) / (1 - k);
      m = (m - k) / (1 - k);
      y = (y - k) / (1 - k);
    }

    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    };
  };

  const handleHexChange = (value) => {
    if (/^#?[0-9A-Fa-f]{0,6}$/.test(value)) {
      const formattedValue = value.startsWith("#") ? value : `#${value}`;
      setHex(formattedValue);

      if (/^#[0-9A-Fa-f]{6}$/.test(formattedValue)) {
        const rgbValue = hexToRgb(formattedValue);
        if (rgbValue) {
          setRgb(rgbValue);
          setHsl(rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b));
          setHsv(rgbToHsv(rgbValue.r, rgbValue.g, rgbValue.b));
          setCmyk(rgbToCmyk(rgbValue.r, rgbValue.g, rgbValue.b));
        }
        setError("");
      } else if (value.length > 0) {
        setError("Invalid HEX color");
      }
    }
  };

  const handleRgbChange = (component, value) => {
    const newValue = parseInt(value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 255) {
      const newRgb = { ...rgb, [component]: newValue };
      setRgb(newRgb);
      setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
      setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
      setHsv(rgbToHsv(newRgb.r, newRgb.g, newRgb.b));
      setCmyk(rgbToCmyk(newRgb.r, newRgb.g, newRgb.b));
      setError("");
    }
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
            <HexColorPicker color={hex} onChange={handleHexChange} />
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
                bgcolor: hex,
                border: "1px solid",
                borderColor: "divider",
              }}
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
                  value={hex}
                  onChange={(e) => handleHexChange(e.target.value)}
                  error={!!error}
                  helperText={error}
                  placeholder="#000000"
                />
                <IconButton onClick={() => copyToClipboard(hex.toUpperCase())}>
                  <ContentCopyIcon />
                </IconButton>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                RGB
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <TextField
                    label="R"
                    value={rgb.r}
                    onChange={(e) => handleRgbChange("r", e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="G"
                    value={rgb.g}
                    onChange={(e) => handleRgbChange("g", e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    label="B"
                    value={rgb.b}
                    onChange={(e) => handleRgbChange("b", e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={() =>
                      copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
                    }
                  >
                    <ContentCopyIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                HSL
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                  InputProps={{ readOnly: true }}
                />
                <IconButton
                  onClick={() =>
                    copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)
                  }
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                HSV
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  value={`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`}
                  InputProps={{ readOnly: true }}
                />
                <IconButton
                  onClick={() =>
                    copyToClipboard(`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`)
                  }
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                CMYK
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  value={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`}
                  InputProps={{ readOnly: true }}
                />
                <IconButton
                  onClick={() =>
                    copyToClipboard(
                      `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`
                    )
                  }
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>
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
