import { useState, useEffect } from "react";
import { Typography, Grid, Paper, Box, Container } from "@mui/material";
import TextArea from "../components/TextArea";
import { textAnalysis } from "../utils/textAnalysis";
import SEO from "@/components/SEO";

export default function Analyze() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    characters: { withSpaces: 0, withoutSpaces: 0 },
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    uniqueWords: 0,
  });

  useEffect(() => {
    setStats({
      words: textAnalysis.wordCount(text),
      characters: textAnalysis.characterCount(text),
      sentences: textAnalysis.sentenceCount(text),
      paragraphs: textAnalysis.paragraphCount(text),
      readingTime: textAnalysis.readingTime(text),
      uniqueWords: textAnalysis.uniqueWords(text),
    });
  }, [text]);

  const StatCard = ({ title, value, unit = "" }) => (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        backgroundColor: "background.paper",
        transition: "all 0.2s",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="h4"
        component="p"
        fontFamily="monospace"
        fontWeight="medium"
      >
        {value}
        {unit}
      </Typography>
    </Paper>
  );

  return (
    <>
      <SEO
        title="Text Analysis Tool - Count Words, Characters, and More | Text Utils Pro"
        description="Free online text analysis tool. Count words, characters, sentences, and paragraphs. Calculate reading time and unique words. No ads, no signup required."
        keywords="text analysis, word count, character count, sentence count, paragraph count, reading time calculator, unique words counter, text statistics"
      />

      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Typography variant="h3" component="h1" fontWeight="bold">
            Text Analysis
          </Typography>

          <TextArea
            value={text}
            onChange={setText}
            placeholder="Enter text to analyze..."
            label="Text to analyze"
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard title="Words" value={stats.words} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Characters (with spaces)"
                value={stats.characters.withSpaces}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Characters (no spaces)"
                value={stats.characters.withoutSpaces}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard title="Sentences" value={stats.sentences} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard title="Paragraphs" value={stats.paragraphs} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Reading Time"
                value={stats.readingTime}
                unit=" min"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard title="Unique Words" value={stats.uniqueWords} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
