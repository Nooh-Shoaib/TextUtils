import { useState } from "react";
import { Typography, Grid, Box, Container, Paper } from "@mui/material";
import TextArea from "../components/TextArea";
import ActionButton from "../components/ActionButton";
import SEO from "@/components/SEO";

const cleaningTools = {
  removeExtraSpaces: (text) => text.replace(/\s+/g, " ").trim(),
  removeLineBreaks: (text) => text.replace(/\n/g, " ").trim(),
  removeEmptyLines: (text) =>
    text
      .split("\n")
      .filter((line) => line.trim())
      .join("\n"),
  removePunctuation: (text) => text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""),
  removeSpecialChars: (text) => text.replace(/[^a-zA-Z0-9\s]/g, ""),
  removeNumbers: (text) => text.replace(/[0-9]/g, ""),
  removeUrls: (text) => text.replace(/https?:\/\/[^\s]+/g, ""),
  removeEmails: (text) => text.replace(/[\w\.-]+@[\w\.-]+\.\w+/g, ""),
  trimLines: (text) =>
    text
      .split("\n")
      .map((line) => line.trim())
      .join("\n"),
  normalizeWhitespace: (text) =>
    text
      .replace(/\r\n/g, "\n")
      .replace(/\t/g, "    ")
      .replace(/[^\S\n]+/g, " ")
      .trim(),
};

export default function Clean() {
  const [text, setText] = useState("");

  const handleClean = (cleaner) => {
    setText(cleaningTools[cleaner](text));
  };

  const cleaningActions = [
    { name: "Remove Extra Spaces", action: "removeExtraSpaces" },
    { name: "Remove Line Breaks", action: "removeLineBreaks" },
    { name: "Remove Empty Lines", action: "removeEmptyLines" },
    { name: "Remove Punctuation", action: "removePunctuation" },
    { name: "Remove Special Chars", action: "removeSpecialChars" },
    { name: "Remove Numbers", action: "removeNumbers" },
    { name: "Remove URLs", action: "removeUrls" },
    { name: "Remove Emails", action: "removeEmails" },
    { name: "Trim Lines", action: "trimLines" },
    { name: "Normalize Whitespace", action: "normalizeWhitespace" },
  ];

  return (
    <>
      <SEO
        title="Text Cleaner - Remove Spaces, Lines, Special Characters | Text Utils Pro"
        description="Free online text cleaning tool. Remove extra spaces, line breaks, special characters, URLs, emails, and more. Clean and format your text easily. No signup required."
        keywords="text cleaner, remove spaces, remove line breaks, remove special characters, remove URLs, remove emails, text formatter, clean text, format text"
      />

      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Typography variant="h3" component="h1" fontWeight="bold">
            Text Cleaning
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
            }}
          >
            <TextArea
              value={text}
              onChange={setText}
              placeholder="Enter text to clean..."
              label="Text to clean"
            />
          </Paper>

          <Grid container spacing={1}>
            {cleaningActions.map(({ name, action }) => (
              <Grid item xs={12} sm={6} md={4} key={action}>
                <ActionButton
                  onClick={() => handleClean(action)}
                  variant="secondary"
                  sx={{
                    height: "100%",
                    minHeight: 48,
                  }}
                >
                  {name}
                </ActionButton>
              </Grid>
            ))}

            {/* Clear button spans full width on mobile, one column on desktop */}
            <Grid item xs={12} sm={6} md={4}>
              <ActionButton
                variant="danger"
                onClick={() => setText("")}
                sx={{
                  height: "100%",
                  minHeight: 48,
                }}
              >
                Clear
              </ActionButton>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
