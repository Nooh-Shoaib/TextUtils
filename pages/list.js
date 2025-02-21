import { useState } from "react";
import { Typography, Grid, Box, Container } from "@mui/material";
import TextArea from "../components/TextArea";
import ActionButton from "../components/ActionButton";
import SEO from "@/components/SEO";

const listTools = {
  addNumbering: (text) => {
    return text
      .split("\n")
      .map((line, i) => (line.trim() ? `${i + 1}. ${line}` : line))
      .join("\n");
  },
  addBullets: (text) => {
    return text
      .split("\n")
      .map((line) => (line.trim() ? `• ${line}` : line))
      .join("\n");
  },
  removeNumbers: (text) => {
    return text
      .split("\n")
      .map((line) => line.replace(/^\d+[\.\)]\s*/, ""))
      .join("\n");
  },
  removeBullets: (text) => {
    return text
      .split("\n")
      .map((line) => line.replace(/^[•\-\*]\s*/, ""))
      .join("\n");
  },
  removeAllListMarkers: (text) => {
    return text
      .split("\n")
      .map(
        (line) =>
          line
            .replace(/^[\d]+[\.\)]\s*/, "") // Remove numbers with . or )
            .replace(/^[a-zA-Z][\.\)]\s*/, "") // Remove letters with . or )
            .replace(/^[•\-\*\+○●■□➤➢➣➪►▶︎→⇒⟹≫]\s*/, "") // Remove various bullet symbols
            .replace(/^\s*[\[\(\{]\s*[\]\)\}]\s*/, "") // Remove empty brackets/parentheses
            .replace(/^\s*[⓪①②③④⑤⑥⑦⑧⑨]\s*/, "") // Remove circled numbers
      )
      .join("\n");
  },
  sortAscending: (text) => {
    return text
      .split("\n")
      .filter((line) => line.trim())
      .sort()
      .join("\n");
  },
  sortDescending: (text) => {
    return text
      .split("\n")
      .filter((line) => line.trim())
      .sort()
      .reverse()
      .join("\n");
  },
  removeDuplicates: (text) => {
    return [...new Set(text.split("\n"))]
      .filter((line) => line.trim())
      .join("\n");
  },
  shuffleLines: (text) => {
    const lines = text.split("\n").filter((line) => line.trim());
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    return lines.join("\n");
  },
};

export default function List() {
  const [text, setText] = useState("");

  const handleTransform = (transformer) => {
    setText(listTools[transformer](text));
  };

  const transformActions = [
    { name: "Add Numbers", action: "addNumbering" },
    { name: "Add Bullets", action: "addBullets" },
    { name: "Remove Numbers", action: "removeNumbers" },
    { name: "Remove Bullets", action: "removeBullets" },
    { name: "Remove All Markers", action: "removeAllListMarkers" },
    { name: "Sort A-Z", action: "sortAscending" },
    { name: "Sort Z-A", action: "sortDescending" },
    { name: "Remove Duplicates", action: "removeDuplicates" },
    { name: "Shuffle Lines", action: "shuffleLines" },
  ];

  return (
    <>
      <SEO
        title="List Formatter - Number Lists, Bullet Points & Sorting | Text Utils Pro"
        description="Free list formatting tools. Add numbers or bullets, sort lists, remove duplicates, shuffle lines, and clean list markers. Perfect for organizing text lists and data."
        keywords="list formatter, number list generator, bullet points, list sorter, remove duplicates, shuffle list, list tools, text list formatter, list organizer"
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
            Number & List Tools
          </Typography>

          <Box sx={{ maxWidth: "md", width: "100%", mx: "auto" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextArea
                value={text}
                onChange={setText}
                placeholder="Enter your list (one item per line)..."
                label="List items"
                aria-label="Enter list items, one per line"
              />

              <Grid
                container
                spacing={1}
                role="toolbar"
                aria-label="List formatting tools"
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
                      aria-label={`${name} - Format list with ${action}`}
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
                      width: "100%",
                    }}
                    aria-label="Clear list content"
                  >
                    Clear
                  </ActionButton>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
