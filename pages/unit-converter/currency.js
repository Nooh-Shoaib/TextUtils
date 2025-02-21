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

const currencyRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
  INR: 74.57,
};

export default function CurrencyConverter() {
  const [value, setValue] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [result, setResult] = useState(0);

  const convertCurrency = () => {
    const convertedValue =
      (value * currencyRates[toCurrency]) / currencyRates[fromCurrency];
    setResult(convertedValue);
  };

  const resetFields = () => {
    setValue(0);
    setFromCurrency("USD");
    setToCurrency("EUR");
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
        <Typography color="text.primary">Currency Converter</Typography>
      </Breadcrumbs>

      <Typography variant="h5" gutterBottom>
        <SwapHorizIcon sx={{ verticalAlign: "middle", mr: 1 }} /> Currency
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
        label="From Currency"
        select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        fullWidth
        margin="normal"
        SelectProps={{ native: true }}
      >
        {Object.keys(currencyRates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </TextField>
      <TextField
        label="To Currency"
        select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        fullWidth
        margin="normal"
        SelectProps={{ native: true }}
      >
        {Object.keys(currencyRates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </TextField>
      <Button variant="contained" onClick={convertCurrency} sx={{ mr: 2 }}>
        Convert
      </Button>
      <Button variant="outlined" onClick={resetFields}>
        Reset
      </Button>
      <Box mt={2}>
        <Typography variant="h6">
          Result: {result} {toCurrency}
        </Typography>
      </Box>
    </Container>
  );
}
