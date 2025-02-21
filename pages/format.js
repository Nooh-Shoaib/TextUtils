import { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import TextArea from "../components/TextArea";
import ActionButton from "../components/ActionButton";
import { textTransforms } from "../utils/textTransforms";
import SEO from "@/components/SEO";

const formatActions = [
  { name: "UPPERCASE", action: "uppercase" },
  { name: "lowercase", action: "lowercase" },
  { name: "Title Case", action: "titleCase" },
  { name: "Sentence case", action: "sentenceCase" },
  { name: "aLtErNaTe CaSe", action: "alternateCase" },
];

export default function Format() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleTransform = (action) => {
    try {
      setText(textTransforms[action](text));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <SEO
        title="Text Case Converter - UPPERCASE, lowercase, Title Case | Text Utils Pro"
        description="Free text case converter. Transform text to UPPERCASE, lowercase, Title Case, Sentence case, and aLtErNaTe CaSe. Easy to use text formatting tools."
        keywords="text case converter, uppercase converter, lowercase converter, title case converter, sentence case, alternate case, text formatter, case changer"
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            py: 4,
          }}
        >
          <Typography variant="h3" component="h1" fontWeight="bold">
            Text Formatting & Case Conversion
          </Typography>

          <Box sx={{ maxWidth: "md", width: "100%", mx: "auto" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextArea
                value={text}
                onChange={(newText) => {
                  setText(newText);
                  setError("");
                }}
                placeholder="Enter text to format..."
                label="Text to format"
                error={Boolean(error)}
                helperText={error}
                aria-label="Enter text to change case"
              />

              <Grid container spacing={1}>
                {formatActions.map(({ name, action }) => (
                  <Grid item xs={12} sm={6} md={4} key={action}>
                    <ActionButton
                      onClick={() => handleTransform(action)}
                      variant="secondary"
                      sx={{
                        height: "100%",
                        minHeight: 48,
                        width: "100%",
                      }}
                      aria-label={`Convert text to ${name}`}
                    >
                      {name}
                    </ActionButton>
                  </Grid>
                ))}

                <Grid item xs={12} sm={6} md={4}>
                  <ActionButton
                    variant="danger"
                    onClick={() => {
                      setText("");
                      setError("");
                    }}
                    sx={{
                      height: "100%",
                      minHeight: 48,
                      width: "100%",
                    }}
                    aria-label="Clear text"
                  >
                    Clear
                  </ActionButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>

        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => setError("")}
        >
          <Alert
            onClose={() => setError("")}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
            role="alert"
          >
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}
