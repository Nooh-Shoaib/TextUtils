import { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Stack,
} from "@mui/material";
import { DateTime } from "luxon";

export default function CountdownTimer() {
  const [targetDate, setTargetDate] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && targetDate) {
      const updateTimer = () => {
        const now = DateTime.now();
        const target = DateTime.fromISO(targetDate);
        const diff = target.diff(now);

        if (diff.milliseconds <= 0) {
          setIsRunning(false);
          setTimeLeft(null);
          clearInterval(timer);
        } else {
          const days = Math.floor(diff.as("days"));
          const hours = Math.floor(diff.as("hours") % 24);
          const minutes = Math.floor(diff.as("minutes") % 60);
          const seconds = Math.floor(diff.as("seconds") % 60);

          setTimeLeft({ days, hours, minutes, seconds });
        }
      };

      // Update immediately and then every second
      updateTimer();
      timer = setInterval(updateTimer, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, targetDate]);

  const handleStart = () => {
    const selectedDate = DateTime.fromISO(targetDate);
    if (selectedDate > DateTime.now()) {
      setIsRunning(true);
    } else {
      alert("Please select a future date and time");
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTargetDate("");
    setTimeLeft(null);
  };

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Typography variant="h6">Set Target Date and Time</Typography>
            <TextField
              label="Target Date and Time"
              type="datetime-local"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
              disabled={isRunning}
              inputProps={{
                min: DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm"),
              }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              {!isRunning ? (
                <Button
                  variant="contained"
                  onClick={handleStart}
                  disabled={!targetDate}
                >
                  Start
                </Button>
              ) : (
                <Button variant="contained" color="error" onClick={handleStop}>
                  Stop
                </Button>
              )}
              <Button variant="outlined" onClick={handleReset}>
                Reset
              </Button>
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Time Remaining
          </Typography>
          {timeLeft ? (
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h3"
                fontFamily="monospace"
                sx={{ letterSpacing: 1 }}
              >
                {formatNumber(timeLeft.days)}d {formatNumber(timeLeft.hours)}h{" "}
                {formatNumber(timeLeft.minutes)}m{" "}
                {formatNumber(timeLeft.seconds)}s
              </Typography>
            </Box>
          ) : (
            <Typography color="text.secondary">
              Set a target date and time to start the countdown
            </Typography>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
