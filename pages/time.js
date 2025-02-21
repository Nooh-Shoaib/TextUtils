import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import SEO from "@/components/SEO";
import DateCalculator from "@/components/time/DateCalculator";
import CountdownTimer from "@/components/time/CountdownTimer";
import WorldClock from "@/components/time/WorldClock";
import TabPanel from "@/components/TabPanel";

export default function TimeTools() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <SEO
        title="Time Tools | Text Utils Pro"
        description="Date calculator, countdown timer, and world clock"
        keywords="time tools, date calculator, countdown timer, world clock"
      />

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 600,
              textAlign: "center",
              mb: 4,
            }}
          >
            Time Tools
          </Typography>

          <Paper sx={{ width: "100%", mb: 4 }}>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="time tools tabs"
            >
              <Tab label="World Clock" />
              <Tab label="Date Calculator" />
              <Tab label="Countdown Timer" />
            </Tabs>
          </Paper>

          <TabPanel value={currentTab} index={0}>
            <WorldClock />
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            <DateCalculator />
          </TabPanel>
          <TabPanel value={currentTab} index={2}>
            <CountdownTimer />
          </TabPanel>
        </Box>
      </Container>
    </>
  );
}
