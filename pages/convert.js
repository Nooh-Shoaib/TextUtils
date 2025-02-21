import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  MenuItem,
  Paper,
} from "@mui/material";
import SEO from "@/components/SEO";

const unitTypes = {
  length: {
    name: "Length",
    units: {
      meter: { name: "Meters (m)", factor: 1 },
      kilometer: { name: "Kilometers (km)", factor: 1000 },
      centimeter: { name: "Centimeters (cm)", factor: 0.01 },
      millimeter: { name: "Millimeters (mm)", factor: 0.001 },
      mile: { name: "Miles (mi)", factor: 1609.344 },
      yard: { name: "Yards (yd)", factor: 0.9144 },
      foot: { name: "Feet (ft)", factor: 0.3048 },
      inch: { name: "Inches (in)", factor: 0.0254 },
    },
  },
  weight: {
    name: "Weight",
    units: {
      kilogram: { name: "Kilograms (kg)", factor: 1 },
      gram: { name: "Grams (g)", factor: 0.001 },
      milligram: { name: "Milligrams (mg)", factor: 0.000001 },
      pound: { name: "Pounds (lb)", factor: 0.45359237 },
      ounce: { name: "Ounces (oz)", factor: 0.028349523125 },
    },
  },
  temperature: {
    name: "Temperature",
    units: {
      celsius: { name: "Celsius (°C)", factor: 1 },
      fahrenheit: { name: "Fahrenheit (°F)", factor: 1 },
      kelvin: { name: "Kelvin (K)", factor: 1 },
    },
  },
  area: {
    name: "Area",
    units: {
      squareMeter: { name: "Square Meters (m²)", factor: 1 },
      squareKilometer: { name: "Square Kilometers (km²)", factor: 1000000 },
      hectare: { name: "Hectares (ha)", factor: 10000 },
      acre: { name: "Acres", factor: 4046.8564224 },
      squareFoot: { name: "Square Feet (ft²)", factor: 0.09290304 },
    },
  },
  volume: {
    name: "Volume",
    units: {
      liter: { name: "Liters (L)", factor: 1 },
      milliliter: { name: "Milliliters (mL)", factor: 0.001 },
      cubicMeter: { name: "Cubic Meters (m³)", factor: 1000 },
      gallon: { name: "Gallons (gal)", factor: 3.78541178 },
      quart: { name: "Quarts (qt)", factor: 0.946352946 },
    },
  },
};

const convert = (value, fromUnit, toUnit, type) => {
  if (type === "temperature") {
    // Handle temperature conversions separately
    if (fromUnit === "celsius" && toUnit === "fahrenheit") {
      return (value * 9) / 5 + 32;
    } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
      return ((value - 32) * 5) / 9;
    } else if (fromUnit === "celsius" && toUnit === "kelvin") {
      return value + 273.15;
    } else if (fromUnit === "kelvin" && toUnit === "celsius") {
      return value - 273.15;
    } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
      return ((value - 32) * 5) / 9 + 273.15;
    } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
      return ((value - 273.15) * 9) / 5 + 32;
    } else {
      return value; // Same unit
    }
  }

  // For other unit types, use the factor-based conversion
  const fromFactor = unitTypes[type].units[fromUnit].factor;
  const toFactor = unitTypes[type].units[toUnit].factor;
  return (value * fromFactor) / toFactor;
};

export default function Convert() {
  const [unitType, setUnitType] = useState("length");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");

  const handleFromValueChange = (event) => {
    const value = event.target.value;
    setFromValue(value);
    if (value === "") {
      setToValue("");
    } else {
      const result = convert(parseFloat(value), fromUnit, toUnit, unitType);
      setToValue(result.toFixed(8).replace(/\.?0+$/, ""));
    }
  };

  const handleToValueChange = (event) => {
    const value = event.target.value;
    setToValue(value);
    if (value === "") {
      setFromValue("");
    } else {
      const result = convert(parseFloat(value), toUnit, fromUnit, unitType);
      setFromValue(result.toFixed(8).replace(/\.?0+$/, ""));
    }
  };

  return (
    <>
      <SEO
        title="Unit Converter | Text Utils Pro"
        description="Convert between different units of measurement including length, weight, temperature, area, and volume."
        keywords="unit converter, measurement converter, length converter, weight converter, temperature converter"
      />

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Unit Converter
          </Typography>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Select Unit Type"
                  value={unitType}
                  onChange={(e) => {
                    setUnitType(e.target.value);
                    setFromUnit(
                      Object.keys(unitTypes[e.target.value].units)[0]
                    );
                    setToUnit(Object.keys(unitTypes[e.target.value].units)[1]);
                    setFromValue("");
                    setToValue("");
                  }}
                >
                  {Object.entries(unitTypes).map(([key, { name }]) => (
                    <MenuItem key={key} value={key}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={5}>
                <TextField
                  select
                  fullWidth
                  label="From Unit"
                  value={fromUnit}
                  onChange={(e) => {
                    setFromUnit(e.target.value);
                    if (fromValue !== "") {
                      const result = convert(
                        parseFloat(fromValue),
                        e.target.value,
                        toUnit,
                        unitType
                      );
                      setToValue(result.toFixed(8).replace(/\.?0+$/, ""));
                    }
                  }}
                >
                  {Object.entries(unitTypes[unitType].units).map(
                    ([key, { name }]) => (
                      <MenuItem key={key} value={key}>
                        {name}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </Grid>

              <Grid item xs={12} md={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Typography variant="h5">=</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={5}>
                <TextField
                  select
                  fullWidth
                  label="To Unit"
                  value={toUnit}
                  onChange={(e) => {
                    setToUnit(e.target.value);
                    if (fromValue !== "") {
                      const result = convert(
                        parseFloat(fromValue),
                        fromUnit,
                        e.target.value,
                        unitType
                      );
                      setToValue(result.toFixed(8).replace(/\.?0+$/, ""));
                    }
                  }}
                >
                  {Object.entries(unitTypes[unitType].units).map(
                    ([key, { name }]) => (
                      <MenuItem key={key} value={key}>
                        {name}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </Grid>

              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Value"
                  type="number"
                  value={fromValue}
                  onChange={handleFromValueChange}
                  placeholder="Enter value"
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Typography variant="h5">=</Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label="Result"
                  type="number"
                  value={toValue}
                  onChange={handleToValueChange}
                  placeholder="Result"
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
