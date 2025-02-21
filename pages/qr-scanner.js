import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Alert,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
  Grid,
  Divider,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ImageIcon from "@mui/icons-material/Image";
import SEO from "@/components/SEO";
import jsQR from "jsqr";
import QrScanner from "react-qr-scanner";

// Dynamically import QrReader with correct configuration
const QrReader = dynamic(
  () => import("react-qr-reader").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    ),
  }
);

export default function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const [scannedResults, setScannedResults] = useState([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      addToResults(data);
      setScanning(false);
    }
  };

  const handleError = (err) => {
    setError("Error accessing camera: " + err.message);
    setScanning(false);
  };

  const addToResults = (data) => {
    setScannedResults((prev) => {
      if (!prev.includes(data)) {
        return [data, ...prev];
      }
      return prev;
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Create an image element
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        // Create canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw image to canvas
        ctx.drawImage(img, 0, 0);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Scan for QR code
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          addToResults(code.data);
        } else {
          setError("No QR code found in image");
        }

        // Clean up
        URL.revokeObjectURL(img.src);
      };

      img.onerror = () => {
        setError("Error loading image");
        URL.revokeObjectURL(img.src);
      };
    } catch (err) {
      setError("Error processing image");
    }
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  const handleDelete = (index) => {
    setScannedResults((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setScannedResults([]);
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <>
      <SEO
        title="QR Scanner | Text Utils Pro"
        description="Scan QR codes using your device's camera or upload images"
        keywords="qr scanner, qr code reader, qr code scanner, image qr scanner"
      />

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 600,
              textAlign: "center",
              mb: 4,
            }}
          >
            QR Code Scanner
          </Typography>

          <Grid container spacing={4}>
            {/* Scanner Section */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                {scanning ? (
                  <Box sx={{ position: "relative" }}>
                    <QrScanner
                      onScan={handleScan}
                      onError={handleError}
                      style={{ width: "100%" }}
                      facingMode="environment"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setScanning(false)}
                      sx={{ mt: 2 }}
                    >
                      Stop Scanning
                    </Button>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setScanning(true)}
                        startIcon={<CameraAltIcon />}
                      >
                        Start Camera
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => fileInputRef.current?.click()}
                        startIcon={<ImageIcon />}
                      >
                        Upload Image
                      </Button>
                      <input
                        type="file"
                        hidden
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Scan using camera or upload an image containing a QR code
                    </Typography>
                  </Box>
                )}

                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}
              </Paper>
            </Grid>

            {/* Results Section */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">Scan History</Typography>
                  {scannedResults.length > 0 && (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={handleClearAll}
                    >
                      Clear All
                    </Button>
                  )}
                </Box>

                {scannedResults.length === 0 ? (
                  <Typography color="text.secondary">
                    No scanned codes yet
                  </Typography>
                ) : (
                  <List>
                    {scannedResults.map((result, index) => (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <Box>
                            <Tooltip title="Copy">
                              <IconButton
                                edge="end"
                                onClick={() => handleCopy(result)}
                              >
                                <ContentCopyIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                edge="end"
                                onClick={() => handleDelete(index)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        }
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {isValidUrl(result) ? (
                                <>
                                  <LinkIcon sx={{ mr: 1 }} />
                                  <a
                                    href={result}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      color: "inherit",
                                      textDecoration: "none",
                                    }}
                                  >
                                    {result}
                                  </a>
                                </>
                              ) : (
                                result
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}

                {copied && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    Copied to clipboard!
                  </Alert>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
