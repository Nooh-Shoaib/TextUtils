import {
  Typography,
  Box,
  Container,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CircleIcon from "@mui/icons-material/Circle";
import SEO from "@/components/SEO";

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy - Data Security & Privacy | Text Utils Pro"
        description="Our commitment to your privacy and data security. All text processing happens in your browser - no data storage, no tracking, no cookies, and complete transparency."
        keywords="privacy policy, data security, browser processing, no tracking, data privacy, text processing privacy, secure text tools"
      />

      <Container maxWidth="md">
        <Box
          sx={{ py: 4, display: "flex", flexDirection: "column", gap: 6 }}
          component="main"
          role="main"
        >
          <Box component="section" aria-labelledby="privacy-commitment">
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
              id="privacy-commitment"
            >
              Data Privacy Commitment
            </Typography>
            <Typography paragraph>
              At Text Utils Pro, we take your privacy seriously. Our tools
              process all text directly in your browser, and we do not store,
              collect, or transmit any of your data to our servers.
            </Typography>
            <Paper
              sx={{
                p: 3,
                bgcolor: "success.light",
                color: "success.contrastText",
                mb: 2,
              }}
              role="region"
              aria-label="Key privacy features"
            >
              <List dense disablePadding>
                {[
                  "No data storage",
                  "No data collection",
                  "No server processing",
                  "Everything stays in your browser",
                ].map((item, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon sx={{ minWidth: 32, color: "inherit" }}>
                      <CheckCircleOutlineIcon aria-hidden="true" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{
                        fontWeight: "medium",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>

          <Box component="section" aria-labelledby="how-it-works">
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              fontWeight="bold"
              id="how-it-works"
            >
              How Our Tools Work
            </Typography>
            <Typography paragraph>
              All text processing happens locally in your web browser. When you
              use our tools:
            </Typography>
            <List>
              {[
                "Your text never leaves your device",
                "No information is sent to our servers",
                "No cookies are used for tracking",
                "No personal information is collected",
              ].map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CircleIcon sx={{ fontSize: 8 }} aria-hidden="true" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box component="section" aria-labelledby="browser-storage">
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              fontWeight="bold"
              id="browser-storage"
            >
              Browser Storage
            </Typography>
            <Typography paragraph>We use local storage only for:</Typography>
            <List>
              {[
                "Saving your theme preference (light/dark mode)",
                "Temporary processing of text while you use the tools",
              ].map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CircleIcon sx={{ fontSize: 8 }} aria-hidden="true" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
            <Typography>
              This data never leaves your browser and is cleared when you close
              the tab.
            </Typography>
          </Box>

          <Box component="section" aria-labelledby="contact-us">
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              fontWeight="bold"
              id="contact-us"
            >
              Contact Us
            </Typography>
            <Typography>
              If you have any questions about our privacy practices, please
              contact us at{" "}
              <Link
                href="mailto:nooh19978@gmail.com"
                sx={{
                  color: "primary.main",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
                aria-label="Email us at nooh19978@gmail.com"
              >
                nooh19978@gmail.com
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}
