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

const timeUnits = {
  seconds: 1,
  minutes: 60,
  hours: 3600,
};

export default function TimeConverter() {
  const [value, setValue] = useState(0);
  const [fromUnit, setFromUnit] = useState("seconds");
  const [toUnit, setToUnit] = useState("minutes");
  const [result, setResult] = useState(0);

  const convertTime = () => {
    const seconds = value * timeUnits[fromUnit];
    const convertedValue = seconds / timeUnits[toUnit];
    setResult(convertedValue);
  };

  const resetFields = () => {
    setValue(0);
    setFromUnit("seconds");
    setToUnit("minutes");
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
        <Typography color="text.primary">Time Converter</Typography>
      </Breadcrumbs>

      <Typography variant="h5" gutterBottom>
        <SwapHorizIcon sx={{ verticalAlign: "middle", mr: 1 }} /> Time Converter
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
        {Object.keys(timeUnits).map((unit) => (
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
        {Object.keys(timeUnits).map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </TextField>
      <Button variant="contained" onClick={convertTime} sx={{ mr: 2 }}>
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
