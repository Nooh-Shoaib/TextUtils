import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Breadcrumbs,
  Link,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import SEO from "../../components/SEO";

const weightUnits = {
  grams: 1,
  kilograms: 1000,
  pounds: 453.592,
  ounces: 28.3495,
};

export default function WeightConverter() {
  const [value, setValue] = useState(0);
  const [fromUnit, setFromUnit] = useState("grams");
  const [toUnit, setToUnit] = useState("kilograms");
  const [result, setResult] = useState(0);

  const convertWeight = () => {
    const grams = value * weightUnits[fromUnit];
    const convertedValue = grams / weightUnits[toUnit];
    setResult(convertedValue);
  };

  const resetFields = () => {
    setValue(0);
    setFromUnit("grams");
    setToUnit("kilograms");
    setResult(0);
  };

  return (
    <Container>
      <SEO
        title="Weight Converter - Convert Between Grams, Kilograms, Pounds"
        description="Convert weight units between grams, kilograms, pounds, and ounces with our free online weight converter."
        keywords="weight converter, grams, kilograms, pounds, ounces, online tools"
      />
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" href="/unit-converter">
          Unit Converter
        </Link>
        <Typography color="text.primary">Weight Converter</Typography>
      </Breadcrumbs>

      <Typography variant="h5" gutterBottom>
        <SwapHorizIcon sx={{ verticalAlign: "middle", mr: 1 }} /> Weight
        Converter
      </Typography>
      <TextField
        label="Value"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="From Unit"
        select
        value={fromUnit}
        onChange={(e) => setFromUnit(e.target.value)}
        fullWidth
        margin="normal"
        SelectProps={{ native: true }}
      >
        {Object.keys(weightUnits).map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </TextField>
      <TextField
        label="To Unit"
        select
        value={toUnit}
        onChange={(e) => setToUnit(e.target.value)}
        fullWidth
        margin="normal"
        SelectProps={{ native: true }}
      >
        {Object.keys(weightUnits).map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </TextField>
      <Button variant="contained" onClick={convertWeight} sx={{ mr: 2 }}>
        Convert
      </Button>
      <Button variant="outlined" onClick={resetFields}>
        Reset
      </Button>
      <Box mt={2}>
        <Typography variant="h6">
          Result: {result} {toUnit}
        </Typography>
      </Box>
    </Container>
  );
}
