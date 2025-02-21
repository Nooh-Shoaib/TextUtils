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

const lengthUnits = {
  meters: 1,
  kilometers: 1000,
  miles: 1609.34,
  feet: 0.3048,
};

export default function LengthConverter() {
  const [value, setValue] = useState(0);
  const [fromUnit, setFromUnit] = useState("meters");
  const [toUnit, setToUnit] = useState("kilometers");
  const [result, setResult] = useState(0);

  const convertLength = () => {
    const meters = value * lengthUnits[fromUnit];
    const convertedValue = meters / lengthUnits[toUnit];
    setResult(convertedValue);
  };

  const resetFields = () => {
    setValue(0);
    setFromUnit("meters");
    setToUnit("kilometers");
    setResult(0);
  };

  return (
    <Container>
      <SEO
        title="Length Converter - Convert Between Meters, Kilometers, Miles"
        description="Convert length units between meters, kilometers, miles, and feet with our free online length converter."
        keywords="length converter, meters, kilometers, miles, feet, online tools"
      />
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" href="/unit-converter">
          Unit Converter
        </Link>
        <Typography color="text.primary">Length Converter</Typography>
      </Breadcrumbs>

      <Typography variant="h5" gutterBottom>
        <SwapHorizIcon sx={{ verticalAlign: "middle", mr: 1 }} /> Length
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
        {Object.keys(lengthUnits).map((unit) => (
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
        {Object.keys(lengthUnits).map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </TextField>
      <Button variant="contained" onClick={convertLength} sx={{ mr: 2 }}>
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
