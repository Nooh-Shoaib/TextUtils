import { useState, useRef } from "react";
import {
  Typography,
  Grid,
  Box,
  Container,
  TextField,
  Button,
  Paper,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FindReplaceIcon from "@mui/icons-material/FindReplace";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TextArea from "../components/TextArea";
import ActionButton from "../components/ActionButton";
import SEO from "@/components/SEO";

export default function Transform() {
  const [text, setText] = useState("");
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [matches, setMatches] = useState([]);
  const textAreaRef = useRef(null);

  const handleTransform = (type) => {
    switch (type) {
      case "upper":
        setText(text.toUpperCase());
        clearHighlights();
        break;
      case "lower":
        setText(text.toLowerCase());
        clearHighlights();
        break;
      case "capitalize":
        setText(
          text
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ")
        );
        clearHighlights();
        break;
      case "removeSpaces":
        setText(text.replace(/\s+/g, " ").trim());
        clearHighlights();
        break;
      case "reverse":
        setText(text.split("").reverse().join(""));
        break;
      case "removePunctuation":
        setText(text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""));
        break;
      case "base64Encode":
        setText(btoa(text));
        break;
      case "base64Decode":
        try {
          setText(atob(text));
        } catch (e) {
          alert("Invalid Base64 string");
        }
        break;
      case "urlEncode":
        setText(encodeURIComponent(text));
        break;
      case "urlDecode":
        setText(decodeURIComponent(text));
        break;
      case "htmlEncode":
        setText(
          text.replace(/[<>&"']/g, function (c) {
            switch (c) {
              case "<":
                return "&lt;";
              case ">":
                return "&gt;";
              case "&":
                return "&amp;";
              case '"':
                return "&quot;";
              case "'":
                return "&#39;";
            }
          })
        );
        break;
      case "htmlDecode":
        const textarea = document.createElement("textarea");
        textarea.innerHTML = text;
        setText(textarea.value);
        clearHighlights();
        break;
      case "find":
        highlightText();
        break;
      case "replace":
        if (findText) {
          const regex = new RegExp(escapeRegExp(findText), "g");
          setText(text.replace(regex, replaceText));
          clearHighlights();
        }
        break;
      case "clear":
        setText("");
        setFindText("");
        setReplaceText("");
        clearHighlights();
        break;
    }
  };

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const highlightText = () => {
    if (!findText) {
      clearHighlights();
      return;
    }

    try {
      const regex = new RegExp(escapeRegExp(findText), "gi");
      const matches = [];
      let match;

      while ((match = regex.exec(text)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          text: match[0],
        });
      }

      setMatches(matches);
    } catch (e) {
      console.error("Invalid regex:", e);
    }
  };

  const clearHighlights = () => {
    setMatches([]);
  };

  const getHighlightedText = () => {
    if (matches.length === 0) return text;

    let lastIndex = 0;
    let result = [];

    matches.forEach((match, i) => {
      // Add text before the match
      if (match.start > lastIndex) {
        result.push(text.substring(lastIndex, match.start));
      }

      // Add highlighted match
      result.push(
        <mark key={i} className="bg-yellow-200 px-0">
          {text.substring(match.start, match.end)}
        </mark>
      );

      lastIndex = match.end;
    });

    // Add remaining text
    if (lastIndex < text.length) {
      result.push(text.substring(lastIndex));
    }

    return result;
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Text copied to clipboard!"))
      .catch((err) => alert("Failed to copy text"));
  };

  const transformActions = [
    { name: "UPPERCASE", action: "upper" },
    { name: "lowercase", action: "lower" },
    { name: "Capitalize", action: "capitalize" },
    { name: "Remove Spaces", action: "removeSpaces" },
    { name: "Reverse Text", action: "reverse" },
    { name: "Remove Punctuation", action: "removePunctuation" },
    { name: "Base64 Encode", action: "base64Encode" },
    { name: "Base64 Decode", action: "base64Decode" },
    { name: "URL Encode", action: "urlEncode" },
    { name: "URL Decode", action: "urlDecode" },
    { name: "HTML Encode", action: "htmlEncode" },
    { name: "HTML Decode", action: "htmlDecode" },
  ];

  return (
    <>
      <SEO
        title="Text Transformer - Case, Encoding & Find/Replace Tools | Text Utils Pro"
        description="Transform text with multiple tools: case conversion, Base64, URL encoding, HTML encoding, find & replace, and more. Free online text transformation utilities."
        keywords="text transformer, case converter, base64 encoder, url encoder, html encoder, find and replace, text manipulation, text tools"
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
            Text Transformer
          </Typography>

          <Box sx={{ maxWidth: "md", width: "100%", mx: "auto" }}>
            <Stack spacing={3}>
              <Paper
                variant="outlined"
                sx={{
                  position: "relative",
                  minHeight: 200,
                  p: 2,
                  fontFamily: "monospace",
                  whiteSpace: "pre-wrap",
                }}
                role="textbox"
                aria-label="Text to transform"
              >
                <Box sx={{ position: "relative", zIndex: 1 }}>
                  {getHighlightedText()}
                </Box>
                <textarea
                  ref={textAreaRef}
                  value={text}
                  onChange={(e) => {
                    setText(e.target.value);
                    if (findText) highlightText();
                  }}
                  aria-label="Input text for transformation"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    color: "transparent",
                    caretColor: "black",
                    padding: "16px",
                  }}
                />
              </Paper>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                  startIcon={<FindReplaceIcon />}
                  onClick={() => {
                    setShowFindReplace(!showFindReplace);
                    clearHighlights();
                  }}
                  aria-expanded={showFindReplace}
                  aria-controls="find-replace-panel"
                >
                  {showFindReplace
                    ? "Hide Find & Replace"
                    : "Show Find & Replace"}
                </Button>
                {matches.length > 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    role="status"
                    aria-live="polite"
                  >
                    {matches.length} match{matches.length !== 1 ? "es" : ""}{" "}
                    found
                  </Typography>
                )}
              </Box>

              {showFindReplace && (
                <Grid
                  container
                  spacing={2}
                  id="find-replace-panel"
                  role="search"
                >
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      value={findText}
                      onChange={(e) => {
                        setFindText(e.target.value);
                        if (e.target.value) {
                          setTimeout(() => handleTransform("find"), 100);
                        } else {
                          clearHighlights();
                        }
                      }}
                      placeholder="Find text..."
                      size="small"
                      aria-label="Find text"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() => handleTransform("find")}
                              aria-label="Search text"
                            >
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <TextField
                        fullWidth
                        value={replaceText}
                        onChange={(e) => setReplaceText(e.target.value)}
                        placeholder="Replace with..."
                        size="small"
                        aria-label="Replace with text"
                      />
                      <ActionButton
                        onClick={() => handleTransform("replace")}
                        sx={{ minWidth: 100 }}
                        aria-label="Replace text"
                      >
                        Replace
                      </ActionButton>
                    </Box>
                  </Grid>
                </Grid>
              )}

              <Grid
                container
                spacing={1}
                role="toolbar"
                aria-label="Text transformation tools"
              >
                {transformActions.map(({ name, action }) => (
                  <Grid item xs={12} sm={6} md={4} key={action}>
                    <ActionButton
                      onClick={() => handleTransform(action)}
                      variant="secondary"
                      sx={{
                        height: "100%",
                        minHeight: 48,
                        width: "100%",
                      }}
                      aria-label={`Transform text to ${name}`}
                    >
                      {name}
                    </ActionButton>
                  </Grid>
                ))}

                <Grid item xs={12} sm={6} md={4}>
                  <ActionButton
                    variant="danger"
                    onClick={() => handleTransform("clear")}
                    sx={{
                      height: "100%",
                      minHeight: 48,
                      width: "100%",
                    }}
                    aria-label="Clear all text"
                  >
                    Clear
                  </ActionButton>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
}
