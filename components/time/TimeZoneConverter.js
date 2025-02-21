import { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { DateTime } from "luxon";
import { timeZonesByCountry } from "./timeZoneData";

const popularTimezones = [
  "Asia/Lahore", // Pakistan
  "Asia/Dubai", // UAE
  "Asia/Islamabad", // Pakistan
  "Asia/Kolkata", // India
  "Asia/Dhaka", // Bangladesh
  "Asia/Kabul", // Afghanistan
  "Asia/Delhi", // India (fixed spelling)
  "Asia/Tehran", // Iran
  "Asia/Riyadh", // Saudi Arabia
  "Asia/Tokyo", // Japan
  "Asia/Karachi", // Pakistan
  "Asia/Mumbai", // India
  "Europe/London", // UK
  "America/New_York", // USA
  "Australia/Sydney", // Australia
  "Pacific/Auckland", // New Zealand
];

export default function TimeZoneConverter() {
  const [sourceTime, setSourceTime] = useState(DateTime.now());
  const [sourceZone, setSourceZone] = useState("Asia/Karachi"); // Default to Pakistan
  const [targetZone, setTargetZone] = useState("UTC");
  const [convertedTime, setConvertedTime] = useState(null);
  const [timeZones, setTimeZones] = useState([]);

  useEffect(() => {
    // Get list of time zones and organize them
    const allZones = Intl.supportedValuesOf("timeZone");
    const organizedZones = [
      ...popularTimezones,
      "-------------------",
      ...allZones.filter((zone) => !popularTimezones.includes(zone)),
    ];
    setTimeZones(organizedZones);
  }, []);

  useEffect(() => {
    // Convert time when any input changes
    if (sourceTime && sourceZone && targetZone) {
      const converted = sourceTime.setZone(targetZone);
      setConvertedTime(converted);
    }
  }, [sourceTime, sourceZone, targetZone]);

  const renderTimeZoneSelect = (value, onChange, label) => (
    <TextField select label={label} value={value} onChange={onChange} fullWidth>
      {Object.entries(timeZonesByCountry)
        .map(([region, countries]) => {
          if (typeof countries === "object" && !Array.isArray(countries)) {
            return [
              <MenuItem
                key={region}
                disabled
                sx={{ opacity: 0.7, fontWeight: "bold" }}
              >
                {region}
              </MenuItem>,
              ...Object.entries(countries)
                .map(([country, zones]) => [
                  <MenuItem key={country} disabled sx={{ opacity: 0.7, pl: 4 }}>
                    {country}
                  </MenuItem>,
                  ...zones.map((zone) => (
                    <MenuItem key={zone} value={zone} sx={{ pl: 6 }}>
                      {zone.split("/").pop().replace("_", " ")}
                    </MenuItem>
                  )),
                ])
                .flat(),
            ];
          }
        })
        .flat()}
    </TextField>
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Source Time
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              type="datetime-local"
              value={sourceTime.toFormat("yyyy-MM-dd'T'HH:mm")}
              onChange={(e) => {
                setSourceTime(DateTime.fromISO(e.target.value));
              }}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            {renderTimeZoneSelect(
              sourceZone,
              setSourceZone,
              "Source Time Zone"
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Converted Time
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              disabled
              value={
                convertedTime
                  ? convertedTime.toFormat("yyyy-MM-dd HH:mm:ss")
                  : ""
              }
              fullWidth
            />
            {renderTimeZoneSelect(
              targetZone,
              setTargetZone,
              "Target Time Zone"
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
