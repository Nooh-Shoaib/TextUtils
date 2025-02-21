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

export default function TemperatureConverter() {
  const [value, setValue] = useState(0);
  const [fromUnit, setFromUnit] = useState("Celsius");
  const [toUnit, setToUnit] = useState("Fahrenheit");
  const [result, setResult] = useState(0);

  const convertTemperature = () => {
    let convertedValue;
    if (fromUnit === "Celsius") {
      convertedValue =
        toUnit === "Fahrenheit" ? (value * 9) / 5 + 32 : value + 273.15;
    } else if (fromUnit === "Fahrenheit") {
      convertedValue =
        toUnit === "Celsius"
          ? ((value - 32) * 5) / 9
          : ((value - 32) * 5) / 9 + 273.15;
    } else {
      convertedValue =
        toUnit === "Celsius" ? value - 273.15 : ((value - 273.15) * 9) / 5 + 32;
    }
    setResult(convertedValue);
  };

  const resetFields = () => {
    setValue(0);
    setFromUnit("Celsius");
    setToUnit("Fahrenheit");
    setResult(0);
  };

  return (
    <Container>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" href="/unit-converter">
          Unit Converter
        </Link>
        <Typography color="text.primary">Temperature Converter</Typography>
      </Breadcrumbs>

      <Typography variant="h5" gutterBottom>
        <SwapHorizIcon sx={{ verticalAlign: "middle", mr: 1 }} /> Temperature
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
        <option value="Celsius">Celsius</option>
        <option value="Fahrenheit">Fahrenheit</option>
        <option value="Kelvin">Kelvin</option>
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
        <option value="Celsius">Celsius</option>
        <option value="Fahrenheit">Fahrenheit</option>
        <option value="Kelvin">Kelvin</option>
      </TextField>
      <Button variant="contained" onClick={convertTemperature} sx={{ mr: 2 }}>
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
