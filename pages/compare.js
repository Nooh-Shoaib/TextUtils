import { useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Container,
  Paper,
  TextField,
  Stack,
  Divider,
} from "@mui/material";
import ActionButton from "../components/ActionButton";
import SEO from "@/components/SEO";

const compareTools = {
  findDifferences: (text1, text2) => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const diffs = [];

    const maxLength = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLength; i++) {
      if (lines1[i] !== lines2[i]) {
        diffs.push({
          lineNumber: i + 1,
          text1: lines1[i] || "(empty)",
          text2: lines2[i] || "(empty)",
        });
      }
    }
    return diffs;
  },

  findCommonLines: (text1, text2) => {
    const lines1 = new Set(text1.split("\n"));
    const lines2 = new Set(text2.split("\n"));
    return [...lines1].filter((line) => lines2.has(line));
  },

  findUniqueLines: (text1, text2) => {
    const lines1 = new Set(text1.split("\n"));
    const lines2 = new Set(text2.split("\n"));
    return {
      text1: [...lines1].filter((line) => !lines2.has(line)),
      text2: [...lines2].filter((line) => !lines1.has(line)),
    };
  },
};

export default function Compare() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [comparison, setComparison] = useState(null);
  const [comparisonType, setComparisonType] = useState("");

  const handleCompare = (type) => {
    setComparisonType(type);
    switch (type) {
      case "differences":
        setComparison(compareTools.findDifferences(text1, text2));
        break;
      case "common":
        setComparison(compareTools.findCommonLines(text1, text2));
        break;
      case "unique":
        setComparison(compareTools.findUniqueLines(text1, text2));
        break;
    }
  };

  const ComparisonResult = () => {
    if (!comparison) return null;

    return (
      <Paper
        elevation={0}
        sx={{
          p: 3,
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Results
        </Typography>

        {comparisonType === "differences" && (
          <Stack spacing={2}>
            {comparison.map((diff, i) => (
              <Paper
                key={i}
                variant="outlined"
                sx={{ p: 2, bgcolor: "background.paper" }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  gutterBottom
                >
                  Line {diff.lineNumber}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography color="error.main">- {diff.text1}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography color="success.main">+ {diff.text2}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            ))}
            {comparison.length === 0 && (
              <Typography color="success.main">Texts are identical!</Typography>
            )}
          </Stack>
        )}

        {comparisonType === "common" && (
          <Stack spacing={1}>
            {comparison.map((line, i) => (
              <Paper
                key={i}
                variant="outlined"
                sx={{ p: 2, bgcolor: "background.paper" }}
              >
                <Typography>{line}</Typography>
              </Paper>
            ))}
            {comparison.length === 0 && (
              <Typography color="text.secondary">
                No common lines found.
              </Typography>
            )}
          </Stack>
        )}

        {comparisonType === "unique" && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Unique to Text 1
              </Typography>
              <Stack spacing={1}>
                {comparison.text1.map((line, i) => (
                  <Paper
                    key={i}
                    variant="outlined"
                    sx={{ p: 2, bgcolor: "background.paper" }}
                  >
                    <Typography>{line}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Unique to Text 2
              </Typography>
              <Stack spacing={1}>
                {comparison.text2.map((line, i) => (
                  <Paper
                    key={i}
                    variant="outlined"
                    sx={{ p: 2, bgcolor: "background.paper" }}
                  >
                    <Typography>{line}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Grid>
          </Grid>
        )}
      </Paper>
    );
  };

  return (
    <>
      <SEO
        title="Text Compare Tool - Find Differences & Common Lines | Text Utils Pro"
        description="Free online text comparison tool. Compare two texts to find differences, common lines, and unique content. Perfect for file comparison, code review, and text analysis."
        keywords="text comparison, diff tool, compare text, find differences, common lines, unique lines, text diff, file comparison, code comparison, text analyzer"
      />

      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Typography variant="h3" component="h1" fontWeight="bold">
            Text Comparison
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                minRows={8}
                maxRows={8}
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                placeholder="Enter first text..."
                label="Text 1"
                variant="outlined"
                sx={{ fontFamily: "monospace" }}
                aria-label="First text for comparison"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                minRows={8}
                maxRows={8}
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                placeholder="Enter second text..."
                label="Text 2"
                variant="outlined"
                sx={{ fontFamily: "monospace" }}
                aria-label="Second text for comparison"
              />
            </Grid>
          </Grid>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            useFlexGap
            flexWrap="wrap"
          >
            <ActionButton
              onClick={() => handleCompare("differences")}
              aria-label="Find differences between texts"
            >
              Find Differences
            </ActionButton>
            <ActionButton
              onClick={() => handleCompare("common")}
              aria-label="Find common lines between texts"
            >
              Find Common Lines
            </ActionButton>
            <ActionButton
              onClick={() => handleCompare("unique")}
              aria-label="Find unique lines in each text"
            >
              Find Unique Lines
            </ActionButton>
            <ActionButton
              variant="danger"
              onClick={() => {
                setText1("");
                setText2("");
                setComparison(null);
              }}
              aria-label="Clear all text fields"
            >
              Clear All
            </ActionButton>
          </Stack>

          <ComparisonResult />
        </Box>
      </Container>
    </>
  );
}
