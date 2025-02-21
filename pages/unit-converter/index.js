import { Container, Typography, Grid, Button, Box } from "@mui/material";
import Link from "next/link";

const unitCategories = {
  Length: "/unit-converter/length",
  Weight: "/unit-converter/weight",
  Volume: "/unit-converter/volume",
  Temperature: "/unit-converter/temperature",
  Speed: "/unit-converter/speed",
  Time: "/unit-converter/time",
  // "Currency Converter": "/unit-converter/currency",
};

export default function UnitConverterPage() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Unit Converter
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4 }}>
        Convert between various units of measurement.
      </Typography>

      <Grid container spacing={4}>
        {Object.entries(unitCategories).map(([category, link]) => (
          <Grid item xs={12} md={6} key={category}>
            <Box>
              <Button
                component={Link}
                href={link}
                variant="outlined"
                sx={{ mb: 1, textTransform: "none", width: "100%" }}
              >
                {category}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
