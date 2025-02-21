import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Alert,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ImageIcon from "@mui/icons-material/Image";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import NumbersIcon from "@mui/icons-material/Numbers";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import SEO from "@/components/SEO";
import TabPanel from "@/components/TabPanel";

export default function QRCode() {
  const [tabValue, setTabValue] = useState(0);
  const [text, setText] = useState("");
  const [number, setNumber] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [level, setLevel] = useState("L");
  const [copied, setCopied] = useState(false);
  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const fileInputRef = useRef(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getCurrentValue = () => {
    switch (tabValue) {
      case 0: // Text
        return text || "Enter text or URL";
      case 1: // Number
        return number || "Enter number";
      case 2: // Image
        return selectedImageUrl || imageUrl || "Enter image URL";
      default:
        return "";
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectedImageUrl(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setSelectedImageUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDownload = () => {
    const value = getCurrentValue();
    if (
      value === "Enter text or URL" ||
      value === "Enter number" ||
      value === "Enter image URL"
    )
      return;

    const canvas = document.querySelector("canvas");
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleCopy = async () => {
    const value = getCurrentValue();
    if (
      value === "Enter text or URL" ||
      value === "Enter number" ||
      value === "Enter image URL"
    )
      return;

    try {
      const canvas = document.querySelector("canvas");
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setShowCopyAlert(true);
      setTimeout(() => {
        setCopied(false);
        setShowCopyAlert(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy QR code:", err);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setNumber(value);
    }
  };

  return (
    <>
      <SEO
        title="QR Code Generator | Text Utils Pro"
        description="Generate customizable QR codes for text, numbers, and images"
        keywords="qr code, qr generator, qr code maker, image qr code, number qr code"
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
            QR Code Generator
          </Typography>

          <Grid container spacing={4}>
            {/* Controls */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{ mb: 3 }}
                >
                  <Tab icon={<TextFieldsIcon />} label="Text" />
                  <Tab icon={<NumbersIcon />} label="Number" />
                  <Tab icon={<ImageIcon />} label="Image" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  <TextField
                    fullWidth
                    label="Text or URL"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    multiline
                    rows={4}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <TextField
                    fullWidth
                    label="Number"
                    value={number}
                    onChange={handleNumberChange}
                    type="text"
                    inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                  />
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <Box sx={{ mb: 2 }}>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                      ref={fileInputRef}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<UploadIcon />}
                      onClick={() => fileInputRef.current.click()}
                      fullWidth
                      sx={{ mb: 2 }}
                    >
                      Upload Image
                    </Button>

                    {selectedImageUrl && (
                      <Box sx={{ position: "relative", mb: 2 }}>
                        <img
                          src={selectedImageUrl}
                          alt="Selected"
                          style={{
                            width: "100%",
                            maxHeight: "200px",
                            objectFit: "contain",
                          }}
                        />
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            bgcolor: "background.paper",
                          }}
                          onClick={handleRemoveImage}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    )}

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Or enter image URL:
                    </Typography>
                    <TextField
                      fullWidth
                      label="Image URL"
                      value={imageUrl}
                      onChange={handleImageUrlChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </Box>
                </TabPanel>

                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography gutterBottom>
                        Size: {size}x{size}
                      </Typography>
                      <Slider
                        value={size}
                        onChange={(_, value) => setSize(value)}
                        min={128}
                        max={512}
                        step={32}
                        marks={[
                          { value: 128, label: "128" },
                          { value: 256, label: "256" },
                          { value: 384, label: "384" },
                          { value: 512, label: "512" },
                        ]}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Error Correction Level</InputLabel>
                        <Select
                          value={level}
                          label="Error Correction Level"
                          onChange={(e) => setLevel(e.target.value)}
                        >
                          <MenuItem value="L">Low (7%)</MenuItem>
                          <MenuItem value="M">Medium (15%)</MenuItem>
                          <MenuItem value="Q">Quartile (25%)</MenuItem>
                          <MenuItem value="H">High (30%)</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          type="color"
                          label="Foreground Color"
                          value={fgColor}
                          onChange={(e) => setFgColor(e.target.value)}
                          sx={{ mt: 2 }}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          type="color"
                          label="Background Color"
                          value={bgColor}
                          onChange={(e) => setBgColor(e.target.value)}
                          sx={{ mt: 2 }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>

            {/* QR Code Display */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    bgcolor: "background.default",
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <QRCodeCanvas
                    value={getCurrentValue()}
                    size={size}
                    level={level}
                    fgColor={fgColor}
                    bgColor={bgColor}
                    includeMargin
                  />
                </Box>

                {showCopyAlert && (
                  <Alert severity="success">QR code copied to clipboard!</Alert>
                )}

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownload}
                    disabled={!getCurrentValue()}
                  >
                    Download PNG
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ContentCopyIcon />}
                    onClick={handleCopy}
                    disabled={!getCurrentValue()}
                  >
                    Copy to Clipboard
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
