import { useState } from "react";
import { Container, Tabs, Tab, Box, Typography, Paper } from "@mui/material";
import ColorPicker from "@/components/tools/color/ColorPicker";
import ColorPalette from "@/components/tools/color/ColorPalette";
import ColorConverter from "@/components/tools/color/ColorConverter";
import ColorContrast from "@/components/tools/color/ColorContrast";
import SEO from "@/components/SEO";

export default function ColorTools() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`color-tabpanel-${index}`}
      aria-labelledby={`color-tab-${index}`}
      sx={{ py: 3 }}
    >
      {value === index && children}
    </Box>
  );

  return (
    <>
      <SEO
        title="Color Tools - Color Picker, Palette Generator, Converter, and Contrast Checker"
        description="Free online color tools including color picker, palette generator, color converter, and contrast checker. Create beautiful color schemes and ensure accessibility."
        keywords="color picker, color palette generator, color converter, color contrast checker, color tools, hex color, rgb color, hsl color"
      />

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Color Tools
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            A collection of tools to help you work with colors - pick colors,
            generate palettes, convert between formats, and check contrast
            ratios.
          </Typography>

          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="color tools tabs"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                px: 2,
                background: "background.paper",
              }}
            >
              <Tab
                label="Color Picker"
                id="color-tab-0"
                aria-controls="color-tabpanel-0"
                sx={{ textTransform: "none" }}
              />
              <Tab
                label="Palette Generator"
                id="color-tab-1"
                aria-controls="color-tabpanel-1"
                sx={{ textTransform: "none" }}
              />
              <Tab
                label="Color Converter"
                id="color-tab-2"
                aria-controls="color-tabpanel-2"
                sx={{ textTransform: "none" }}
              />
              <Tab
                label="Contrast Checker"
                id="color-tab-3"
                aria-controls="color-tabpanel-3"
                sx={{ textTransform: "none" }}
              />
            </Tabs>
          </Paper>

          <TabPanel value={activeTab} index={0}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Color Picker
              </Typography>
              <Typography color="text.secondary">
                Pick colors using an interactive color picker and get values in
                HEX, RGB, and HSL formats.
              </Typography>
            </Box>
            <ColorPicker />
          </TabPanel>

          <TabPanel value={activeTab} index={1}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Palette Generator
              </Typography>
              <Typography color="text.secondary">
                Generate color palettes using different color harmony rules -
                analogous, monochromatic, complementary, and triadic.
              </Typography>
            </Box>
            <ColorPalette />
          </TabPanel>

          <TabPanel value={activeTab} index={2}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Color Converter
              </Typography>
              <Typography color="text.secondary">
                Convert colors between different formats including HEX, RGB,
                HSL, HSV, and CMYK.
              </Typography>
            </Box>
            <ColorConverter />
          </TabPanel>

          <TabPanel value={activeTab} index={3}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Contrast Checker
              </Typography>
              <Typography color="text.secondary">
                Check color contrast ratios for accessibility compliance with
                WCAG 2.1 guidelines.
              </Typography>
            </Box>
            <ColorContrast />
          </TabPanel>
        </Box>
      </Container>
    </>
  );
}
