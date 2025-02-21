import { useState } from "react";
import {
  Paper,
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { DateTime, Duration } from "luxon";

export default function DateCalculator() {
  const [startDate, setStartDate] = useState(
    DateTime.now().toFormat("yyyy-MM-dd")
  );
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = DateTime.fromISO(startDate);
    const end = DateTime.fromISO(endDate);
    const diff = end.diff(start, ["years", "months", "days"]).toObject();

    setDuration({
      years: Math.floor(diff.years) || 0,
      months: Math.floor(diff.months) || 0,
      days: Math.floor(diff.days) || 0,
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Typography variant="h6">Date Range</Typography>
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="contained"
              onClick={calculateDifference}
              disabled={!startDate || !endDate}
            >
              Calculate
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Duration
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1">
              {duration.years} years, {duration.months} months, and{" "}
              {duration.days} days
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Total days:{" "}
              {DateTime.fromISO(endDate)
                .diff(DateTime.fromISO(startDate), "days")
                .days.toFixed(0)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
