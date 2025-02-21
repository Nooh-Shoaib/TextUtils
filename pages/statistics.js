import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import TextArea from "@/components/TextArea";
import SEO from "@/components/SEO";

const calculateStats = (text) => {
  if (!text) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      uniqueWords: 0,
      averageWordLength: 0,
      longestWord: "",
      mostFrequentWords: [],
      readingTime: 0,
      speakingTime: 0,
      complexity: "N/A",
    };
  }

  // Basic calculations
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim().split(/\s+/).length;
  const sentences = text.split(/[.!?]+\s/).filter(Boolean).length;
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean).length;
  const lines = text.split("\n").filter(Boolean).length;

  // Word analysis
  const wordArray = text.toLowerCase().match(/\b\w+\b/g) || [];
  const uniqueWords = new Set(wordArray).size;
  const averageWordLength = (
    wordArray.join("").length / wordArray.length || 0
  ).toFixed(1);
  const longestWord = wordArray.reduce(
    (a, b) => (a.length > b.length ? a : b),
    ""
  );

  // Word frequency
  const wordFrequency = {};
  wordArray.forEach((word) => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });
  const mostFrequentWords = Object.entries(wordFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));

  // Reading and speaking time
  const wordsPerMinute = 200; // Average reading speed
  const wordsPerMinuteSpeaking = 130; // Average speaking speed
  const readingTime = Math.ceil(words / wordsPerMinute);
  const speakingTime = Math.ceil(words / wordsPerMinuteSpeaking);

  // Text complexity (based on average word length and sentence length)
  const avgWordsPerSentence = words / sentences;
  let complexity = "N/A";
  if (words > 0) {
    if (avgWordsPerSentence < 10 && Number(averageWordLength) < 4) {
      complexity = "Simple";
    } else if (avgWordsPerSentence > 20 || Number(averageWordLength) > 6) {
      complexity = "Complex";
    } else {
      complexity = "Moderate";
    }
  }

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    lines,
    uniqueWords,
    averageWordLength,
    longestWord,
    mostFrequentWords,
    readingTime,
    speakingTime,
    complexity,
  };
};

const StatCard = ({ title, value, subtitle }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      height: "100%",
      border: "1px solid",
      borderColor: "divider",
      backgroundColor: "background.paper",
      transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
      "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: 1,
      },
    }}
  >
    <Typography variant="h6" component="h3" gutterBottom>
      {title}
    </Typography>
    <Typography variant="h4" component="p" gutterBottom fontWeight="bold">
      {value}
    </Typography>
    {subtitle && (
      <Typography variant="body2" color="text.secondary">
        {subtitle}
      </Typography>
    )}
  </Paper>
);

export default function Statistics() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState(calculateStats(""));

  useEffect(() => {
    const newStats = calculateStats(text);
    setStats(newStats);
  }, [text]);

  return (
    <>
      <SEO
        title="Text Statistics and Analysis | Text Utils Pro"
        description="Analyze your text with detailed statistics including word count, character count, reading time, and more."
        keywords="text statistics, word count, character count, reading time, text analysis, text complexity"
      />

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            Text Statistics
          </Typography>

          <TextArea
            value={text}
            onChange={setText}
            placeholder="Enter or paste your text here for analysis..."
            label="Text to analyze"
            sx={{ mb: 4 }}
          />

          <Grid container spacing={3}>
            {/* Basic Stats */}
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Characters"
                value={stats.characters}
                subtitle={`${stats.charactersNoSpaces} without spaces`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Words"
                value={stats.words}
                subtitle={`${stats.uniqueWords} unique words`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Sentences"
                value={stats.sentences}
                subtitle={`${stats.paragraphs} paragraphs`}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="Lines"
                value={stats.lines}
                subtitle={`Average ${stats.averageWordLength} chars per word`}
              />
            </Grid>

            {/* Reading Stats */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: "100%" }}>
                <Typography variant="h6" gutterBottom>
                  Reading Analysis
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Reading Time"
                      secondary={`${stats.readingTime} minute${
                        stats.readingTime !== 1 ? "s" : ""
                      }`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Speaking Time"
                      secondary={`${stats.speakingTime} minute${
                        stats.speakingTime !== 1 ? "s" : ""
                      }`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Text Complexity"
                      secondary={stats.complexity}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary="Longest Word"
                      secondary={stats.longestWord || "N/A"}
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>

            {/* Word Frequency */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: "100%" }}>
                <Typography variant="h6" gutterBottom>
                  Most Frequent Words
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List>
                  {stats.mostFrequentWords.map(({ word, count }, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={word}
                        secondary={`${count} occurrence${
                          count !== 1 ? "s" : ""
                        }`}
                      />
                    </ListItem>
                  ))}
                  {stats.mostFrequentWords.length === 0 && (
                    <ListItem>
                      <ListItemText primary="No words to analyze" />
                    </ListItem>
                  )}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
