import {
  Typography,
  Box,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import SEO from "@/components/SEO";

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service - User Agreement | Text Utils Pro"
        description="Terms of use for Text Utils Pro. Learn about our service conditions, user responsibilities, privacy practices, and legal disclaimers for our text processing tools."
        keywords="terms of service, terms of use, user agreement, privacy policy, acceptable use, legal terms, service conditions, text tools terms"
      />

      <Container maxWidth="md">
        <Box
          sx={{ py: 4, display: "flex", flexDirection: "column", gap: 6 }}
          component="main"
          role="main"
        >
          <Box component="section" aria-labelledby="terms-of-use">
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
              id="terms-of-use"
            >
              Terms of Use
            </Typography>
            <Typography paragraph>
              By using Text Utils Pro, you agree to these terms. Our tools are
              provided "as is" without any warranties.
            </Typography>
          </Box>

          <Box component="section" aria-labelledby="user-data-privacy">
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              fontWeight="bold"
              id="user-data-privacy"
            >
              User Data & Privacy
            </Typography>
            <Typography paragraph>
              We prioritize your privacy and data security:
            </Typography>
            <List aria-label="Privacy practices">
              {[
                "All processing is done locally in your browser",
                "We do not collect, store, or transmit your data",
                "We do not use tracking cookies or analytics",
                "Your text remains private and secure",
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

          <Box component="section" aria-labelledby="acceptable-use">
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              fontWeight="bold"
              id="acceptable-use"
            >
              Acceptable Use
            </Typography>
            <Typography paragraph>
              You agree to use our tools responsibly and not for any illegal or
              unauthorized purposes.
            </Typography>
            <List aria-label="Acceptable use guidelines">
              {[
                "Do not attempt to breach or test our security",
                "Do not use our tools to process sensitive or confidential information",
                "Do not attempt to reverse engineer our tools",
                "Do not use automated methods to access our services",
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

          <Box component="section" aria-labelledby="disclaimer">
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              fontWeight="bold"
              id="disclaimer"
            >
              Disclaimer
            </Typography>
            <Typography paragraph>
              Text Utils Pro is provided on an "as is" and "as available" basis.
              We make no warranties, expressed or implied, and hereby disclaim
              all warranties, including without limitation:
            </Typography>
            <List aria-label="Service disclaimers">
              {[
                "Accuracy of results",
                "Uninterrupted service",
                "Fitness for a particular purpose",
                "Data loss or corruption",
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

          <Box component="section" aria-labelledby="changes-to-terms">
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              fontWeight="bold"
              id="changes-to-terms"
            >
              Changes to Terms
            </Typography>
            <Typography>
              We reserve the right to modify these terms at any time. Continued
              use of our services constitutes acceptance of any changes.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}
