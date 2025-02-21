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

const speedUnits = {
  "m/s": 1,
  "km/h": 0.277778,
  mph: 0.44704,
};

export default function SpeedConverter() {
  const [value, setValue] = useState(0);
  const [fromUnit, setFromUnit] = useState("m/s");
  const [toUnit, setToUnit] = useState("km/h");
  const [result, setResult] = useState(0);

  const convertSpeed = () => {
    const metersPerSecond = value * speedUnits[fromUnit];
    const convertedValue = metersPerSecond / speedUnits[toUnit];
    setResult(convertedValue);
  };

  const resetFields = () => {
    setValue(0);
    setFromUnit("m/s");
    setToUnit("km/h");
    setResult(0);
  };

  return (
    <Container>
      <SEO
        title="Speed Converter - Convert Between m/s, km/h, mph"
        description="Convert speed units between meters per second, kilometers per hour, and miles per hour with our free online speed converter."
        keywords="speed converter, m/s, km/h, mph, online tools"
      />
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" href="/unit-converter">
          Unit Converter
        </Link>
        <Typography color="text.primary">Speed Converter</Typography>
      </Breadcrumbs>

      <Typography variant="h5" gutterBottom>
        <SwapHorizIcon sx={{ verticalAlign: "middle", mr: 1 }} /> Speed
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
        {Object.keys(speedUnits).map((unit) => (
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
        {Object.keys(speedUnits).map((unit) => (
          <option key={unit} value={unit}>
            {unit}
          </option>
        ))}
      </TextField>
      <Button variant="contained" onClick={convertSpeed} sx={{ mr: 2 }}>
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
