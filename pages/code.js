import { useState } from "react";
import { Typography, Grid, Box, Container, Paper, Alert } from "@mui/material";
import TextArea from "../components/TextArea";
import ActionButton from "../components/ActionButton";
import SEO from "@/components/SEO";

const codeFormatters = {
  htmlEncode: (text) => {
    return text.replace(/[<>&"']/g, (match) => {
      const entities = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return entities[match];
    });
  },
  removeHtmlTags: (text) => text.replace(/<[^>]*>/g, ""),
  tabsToSpaces: (text) => text.replace(/\t/g, "    "),
  spacesToTabs: (text) => text.replace(/    /g, "\t"),
  jsonFormat: (text) => {
    try {
      return JSON.stringify(JSON.parse(text), null, 2);
    } catch (e) {
      throw new Error("Invalid JSON");
    }
  },
  minifyJson: (text) => {
    try {
      return JSON.stringify(JSON.parse(text));
    } catch (e) {
      throw new Error("Invalid JSON");
    }
  },
  xmlFormat: (text) => {
    let formatted = "";
    let indent = 0;
    text.split(/>\s*</).forEach((node) => {
      if (node.match(/^\/\w/)) indent--;
      formatted += "\n" + "  ".repeat(indent) + "<" + node + ">";
      if (node.match(/^<?\w[^>]*[^\/]$/)) indent++;
    });
    return formatted.substring(1);
  },
};

export default function Code() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleFormat = (formatter) => {
    try {
      setError("");
      setText(codeFormatters[formatter](text));
    } catch (err) {
      setError(err.message);
    }
  };

  const formatActions = [
    { name: "HTML Encode", action: "htmlEncode" },
    { name: "Remove HTML Tags", action: "removeHtmlTags" },
    { name: "Tabs to Spaces", action: "tabsToSpaces" },
    { name: "Spaces to Tabs", action: "spacesToTabs" },
    { name: "Format JSON", action: "jsonFormat" },
    { name: "Minify JSON", action: "minifyJson" },
    { name: "Format XML", action: "xmlFormat" },
  ];

  return (
    <>
      <SEO
        title="Code Formatter - JSON, XML, HTML Tools | Text Utils Pro"
        description="Free online code formatting tools. Format JSON, XML, HTML encoding/decoding, convert tabs to spaces, and more. Developer-friendly text utilities with instant results."
        keywords="code formatter, JSON formatter, XML formatter, HTML encoder, HTML decoder, tabs to spaces, code beautifier, JSON validator, XML beautifier, developer tools"
      />

      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Typography variant="h3" component="h1" fontWeight="bold">
            Code Formatting
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextArea
                value={text}
                onChange={(newText) => {
                  setText(newText);
                  setError("");
                }}
                placeholder="Enter code to format..."
                label="Code to format"
                error={Boolean(error)}
                helperText={error}
              />

              {error && (
                <Alert
                  severity="error"
                  variant="outlined"
                  sx={{
                    "& .MuiAlert-message": {
                      width: "100%",
                    },
                  }}
                >
                  {error}
                </Alert>
              )}
            </Box>
          </Paper>

          <Grid container spacing={1}>
            {formatActions.map(({ name, action }) => (
              <Grid item xs={12} sm={6} md={4} key={action}>
                <ActionButton
                  onClick={() => handleFormat(action)}
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
