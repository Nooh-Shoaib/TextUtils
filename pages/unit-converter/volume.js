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

const volumeUnits = {
  liters: 1,
  milliliters: 0.001,
  gallons: 3.78541,
  pints: 0.473176,
};

export default function VolumeConverter() {
  const [value, setValue] = useState(0);
  const [fromUnit, setFromUnit] = useState("liters");
  const [toUnit, setToUnit] = useState("milliliters");
  const [result, setResult] = useState(0);

  const convertVolume = () => {
    const liters = value * volumeUnits[fromUnit];
    const convertedValue = liters / volumeUnits[toUnit];
    setResult(convertedValue);
  };

  const resetFields = () => {
    setValue(0);
    setFromUnit("liters");
    setToUnit("milliliters");
    setResult(0);
  };

  return (
    <Container>
      <SEO
        title="Volume Converter - Convert Between Liters, Milliliters, Gallons"
        description="Convert volume units between liters, milliliters, gallons, and pints with our free online volume converter."
        keywords="volume converter, liters, milliliters, gallons, pints, online tools"
      />
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" href="/unit-converter">
          Unit Converter
        </Link>
        <Typography color="text.primary">Volume Converter</Typography>
      </Breadcrumbs>

      <Typography variant="h5" gutterBottom>
        <SwapHorizIcon sx={{ verticalAlign: "middle", mr: 1 }} /> Volume
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
        {Object.keys(volumeUnits).map((unit) => (
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
        {Object.keys(volumeUnits).map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </TextField>
      <Button variant="contained" onClick={convertVolume} sx={{ mr: 2 }}>
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
