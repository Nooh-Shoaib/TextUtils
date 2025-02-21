import { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DateTime } from "luxon";
import { Country, State, City } from "country-state-city";

export default function WorldClock() {
  const [clocks, setClocks] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [currentTime, setCurrentTime] = useState(DateTime.now());

  const countries = Country.getAllCountries();
  const states = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.isoCode)
    : [];
  const cities = selectedState
    ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
    : [];

  // Set Pakistan as default country
  useEffect(() => {
    const pakistan = countries.find((country) => country.isoCode === "PK");
    if (pakistan) {
      setSelectedCountry(pakistan);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(DateTime.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeZoneForLocation = (country, state, city) => {
    // Mapping of major cities to their time zones
    const timeZoneMap = {
      PK: "Asia/Karachi", // Pakistan
      AE: "Asia/Dubai", // UAE
      IN: "Asia/Kolkata", // India
      BD: "Asia/Dhaka", // Bangladesh
      AF: "Asia/Kabul", // Afghanistan
      IR: "Asia/Tehran", // Iran
      SA: "Asia/Riyadh", // Saudi Arabia
      JP: "Asia/Tokyo", // Japan
      GB: "Europe/London", // UK
      US: "America/New_York", // USA
    };

    return timeZoneMap[country.isoCode] || "UTC";
  };

  const addClock = () => {
    if (selectedCountry) {
      const timeZone = getTimeZoneForLocation(
        selectedCountry,
        selectedState,
        selectedCity
      );
      const clockLabel = `${
        selectedCity?.name || selectedState?.name || selectedCountry.name
      }`;
      const newClock = {
        id: Date.now(),
        timeZone,
        label: clockLabel,
        countryCode: selectedCountry.isoCode,
        details: {
          country: selectedCountry.name,
          state: selectedState?.name || "",
          city: selectedCity?.name || "",
          flag: selectedCountry.flag,
        },
      };

      setClocks([...clocks, newClock]);
    }
  };

  const removeClock = (clockId) => {
    setClocks(clocks.filter((clock) => clock.id !== clockId));
  };

  const formatTime = (timeZone) => {
    return currentTime.setZone(timeZone).toFormat("dd LLL yyyy, HH:mm:ss");
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Add Location
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 }}
            >
              <TextField
                select
                label="Country"
                value={selectedCountry?.isoCode || ""}
                onChange={(e) => {
                  const country = countries.find(
                    (c) => c.isoCode === e.target.value
                  );
                  setSelectedCountry(country);
                  setSelectedState("");
                  setSelectedCity("");
                }}
                fullWidth
              >
                {countries.map((country) => (
                  <MenuItem key={country.isoCode} value={country.isoCode}>
                    {country.flag} {country.name}
                  </MenuItem>
                ))}
              </TextField>

              {states.length > 0 && (
                <TextField
                  select
                  label="State"
                  value={selectedState?.isoCode || ""}
                  onChange={(e) => {
                    const state = states.find(
                      (s) => s.isoCode === e.target.value
                    );
                    setSelectedState(state);
                    setSelectedCity("");
                  }}
                  fullWidth
                >
                  {states.map((state) => (
                    <MenuItem key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              {cities.length > 0 && (
                <TextField
                  select
                  label="City"
                  value={selectedCity?.name || ""}
                  onChange={(e) => {
                    const city = cities.find((c) => c.name === e.target.value);
                    setSelectedCity(city);
                  }}
                  fullWidth
                >
                  {cities.map((city) => (
                    <MenuItem key={city.name} value={city.name}>
                      {city.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}

              <Button
                variant="contained"
                onClick={addClock}
                disabled={!selectedCountry}
                fullWidth
              >
                Add Clock
              </Button>
            </Box>
          </Box>

          <List>
            {clocks.map((clock) => (
              <ListItem
                key={clock.id}
                sx={{
                  mb: 1,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <span>{clock.details.flag}</span>
                      <span>{clock.label}</span>
                    </Box>
                  }
                  secondary={formatTime(clock.timeZone)}
                  primaryTypographyProps={{
                    variant: "subtitle1",
                    fontWeight: "medium",
                  }}
                  secondaryTypographyProps={{
                    variant: "h6",
                    fontFamily: "monospace",
                    color: "text.primary",
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeClock(clock.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          {clocks.length === 0 && (
            <Typography color="text.secondary" textAlign="center">
              No clocks added. Select a location to begin.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
