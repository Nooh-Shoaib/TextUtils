import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TextArea from "@/components/TextArea";
import SEO from "@/components/SEO";

const defaultMarkdown = `# Welcome to Markdown Editor

## Basic Syntax

### Headers
# H1
## H2
### H3

### Emphasis
*italic* or _italic_
**bold** or __bold__
***bold and italic*** or ___bold and italic___

### Lists
1. First ordered item
2. Second ordered item
   * Unordered sub-list
   * Another item

### Links and Images
[Link to Google](https://www.google.com)
![Alt text for image](https://via.placeholder.com/150)

### Code
Inline \`code\` has \`back-ticks\`

\`\`\`javascript
// Code block
function hello() {
  console.log('Hello, World!');
}
\`\`\`

### Blockquotes
> This is a blockquote
> Multiple lines look like this

### Tables
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
`;

export default function Markdown() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [showPreview, setShowPreview] = useState(true);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <>
      <SEO
        title="Markdown Editor and Previewer | Text Utils Pro"
        description="Write and preview Markdown with real-time rendering. Supports all common Markdown syntax including headers, lists, code blocks, and more."
        keywords="markdown editor, markdown preview, markdown converter, text editor, markdown syntax"
      />

      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h3" component="h1" fontWeight="bold">
              Markdown Editor
            </Typography>
            <Box>
              <Tooltip title="Copy Markdown">
                <IconButton onClick={handleCopy} size="large">
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={showPreview ? "Hide Preview" : "Show Preview"}>
                <IconButton
                  onClick={() => setShowPreview(!showPreview)}
                  size="large"
                >
                  {showPreview ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} md={showPreview ? 6 : 12}>
              <Paper
                sx={{
                  height: "calc(100vh - 200px)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6" sx={{ p: 2, pb: 1 }}>
                  Editor
                </Typography>
                <Divider />
                <Box sx={{ flexGrow: 1, p: 2 }}>
                  <textarea
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    style={{
                      width: "100%",
                      height: "100%",
                      border: "none",
                      outline: "none",
                      resize: "none",
                      fontFamily: "monospace",
                      fontSize: "14px",
                      backgroundColor: "transparent",
                    }}
                  />
                </Box>
              </Paper>
            </Grid>

            {showPreview && (
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    height: "calc(100vh - 200px)",
                    overflow: "auto",
                  }}
                >
                  <Typography variant="h6" sx={{ p: 2, pb: 1 }}>
                    Preview
                  </Typography>
                  <Divider />
                  <Box
                    sx={{
                      p: 2,
                      "& h1": {
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        pb: 1,
                        mb: 2,
                      },
                      "& h2": {
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        pb: 1,
                        mb: 2,
                      },
                      "& img": {
                        maxWidth: "100%",
                        height: "auto",
                      },
                      "& code": {
                        backgroundColor: "action.hover",
                        p: 0.5,
                        borderRadius: 1,
                      },
                      "& pre": {
                        backgroundColor: "action.hover",
                        p: 2,
                        borderRadius: 1,
                        overflow: "auto",
                      },
                      "& table": {
                        borderCollapse: "collapse",
                        width: "100%",
                        mb: 2,
                      },
                      "& th, & td": {
                        border: "1px solid",
                        borderColor: "divider",
                        p: 1,
                      },
                      "& blockquote": {
                        borderLeft: "4px solid",
                        borderColor: "primary.main",
                        pl: 2,
                        ml: 0,
                        my: 2,
                      },
                    }}
                  >
                    <ReactMarkdown>{markdown}</ReactMarkdown>
                  </Box>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
