export const textAnalysis = {
  wordCount: (text) => {
    return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  },

  characterCount: (text) => ({
    withSpaces: text.length,
    withoutSpaces: text.replace(/\s/g, "").length,
  }),

  sentenceCount: (text) => {
    return text.split(/[.!?]+/).filter(Boolean).length;
  },

  paragraphCount: (text) => {
    return text.split(/\n\s*\n/).filter(Boolean).length;
  },

  readingTime: (text) => {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  },

  uniqueWords: (text) => {
    return new Set(
      text
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 0)
    ).size;
  },

  wordFrequency: (text) => {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    return words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});
  },
};
