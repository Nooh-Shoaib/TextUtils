import { useState } from "react";
import { Typography, Grid, Box, Container, Paper, Stack } from "@mui/material";
import TextArea from "../components/TextArea";
import ActionButton from "../components/ActionButton";
import SEO from "@/components/SEO";

const styles = {
  normal: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  bold: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳0123456789",
  italic: "𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻0123456789",
  boldItalic: "𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯0123456789",
  script: "𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ𝒩𝒪𝒫𝒬ℛ𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹ℯ𝒻ℊ𝒽𝒾𝒿𝓀𝓁𝓂𝓃ℴ𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏0123456789",
  circle: "ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨",
  square: "🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉1234567890",
  double: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
};

const fancyTransforms = {
  convertText: (text, style) => {
    const normalChars = styles.normal;
    const styleChars = styles[style];

    return text
      .split("")
      .map((char) => {
        const index = normalChars.indexOf(char);
        return index !== -1 ? styleChars[index] : char;
      })
      .join("");
  },

  strikethrough: (text) =>
    text
      .split("")
      .map((char) => char + "\u0336")
      .join(""),
  underline: (text) =>
    text
      .split("")
      .map((char) => char + "\u0332")
      .join(""),

  upsideDown: (text) => {
    const flips = {
      a: "ɐ",
      b: "q",
      c: "ɔ",
      d: "p",
      e: "ǝ",
      f: "ɟ",
      g: "ƃ",
      h: "ɥ",
      i: "ᴉ",
      j: "ɾ",
      k: "ʞ",
      l: "l",
      m: "ɯ",
      n: "u",
      o: "o",
      p: "d",
      q: "b",
      r: "ɹ",
      s: "s",
      t: "ʇ",
      u: "n",
      v: "ʌ",
      w: "ʍ",
      x: "x",
      y: "ʎ",
      z: "z",
      0: "0",
      1: "Ɩ",
      2: "ᄅ",
      3: "Ɛ",
      4: "ㄣ",
      5: "ϛ",
      6: "9",
      7: "ㄥ",
      8: "8",
      9: "6",
      ",": "'",
      ".": "˙",
      "?": "¿",
      "!": "¡",
      '"': "„",
      "'": ",",
      "(": ")",
      ")": "(",
      "[": "]",
      "]": "[",
      "{": "}",
      "}": "{",
      "<": ">",
      ">": "<",
      "&": "⅋",
      _: "‾",
    };
    return text
      .toLowerCase()
      .split("")
      .map((char) => flips[char] || char)
      .reverse()
      .join("");
  },
};

export default function Fancy() {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);

  const handleTransform = (style) => {
    try {
      let transformed;
      if (["strikethrough", "underline", "upsideDown"].includes(style)) {
        transformed = fancyTransforms[style](text);
      } else {
        transformed = fancyTransforms.convertText(text, style);
      }

      setResults((prev) =>
        [
          {
            style,
            text: transformed,
          },
          ...prev,
        ].slice(0, 5)
      );
    } catch (err) {
      console.error("Transform error:", err);
    }
  };

  const transformActions = [
    { name: "𝗕𝗼𝗹𝗱", action: "bold" },
    { name: "𝘐𝘵𝘢𝘭𝘪𝘤", action: "italic" },
    { name: "𝙄𝙩𝙖𝙡𝙞𝙘 𝘽𝙤𝙡𝙙", action: "boldItalic" },
    { name: "𝒮𝒸𝓇𝒾𝓅𝓉", action: "script" },
    { name: "Ⓒⓘⓡⓒⓛⓔ", action: "circle" },
    { name: "🅂🅀🅄🄰🅁🄴", action: "square" },
    { name: "S̶t̶r̶i̶k̶e̶", action: "strikethrough" },
    { name: "U̲n̲d̲e̲r̲l̲i̲n̲e̲", action: "underline" },
    { name: "uʍop ǝpᴉsd∩", action: "upsideDown" },
  ];

  return (
    <>
      <SEO
        title="Fancy Text Generator - Cool Text Fonts & Styles | Text Utils Pro"
        description="Free fancy text generator. Create stylish text with bold, italic, script, circle, square fonts, strikethrough, underline, and upside-down text. Perfect for social media."
        keywords="fancy text generator, text fonts, stylish text, cool fonts, unicode text, social media fonts, instagram fonts, twitter fonts, facebook fonts, text decorator"
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
            Fancy Text Generator
          </Typography>

          <Box sx={{ maxWidth: "md", width: "100%", mx: "auto" }}>
            <Stack spacing={3}>
              <TextArea
                value={text}
                onChange={setText}
                placeholder="Enter text to style..."
                label="Text to style"
                aria-label="Enter text to convert to fancy styles"
              />

              <Grid container spacing={1}>
                {transformActions.map(({ name, action }) => (
                  <Grid item xs={12} sm={6} md={4} key={action}>
                    <ActionButton
                      onClick={() => handleTransform(action)}
                      variant="secondary"
                      sx={{
                        height: "100%",
                        minHeight: 48,
                        width: "100%",
                        fontFamily: action === "script" ? "cursive" : "inherit",
                      }}
                      aria-label={`Convert text to ${action} style`}
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
                      setResults([]);
                    }}
                    sx={{
                      height: "100%",
                      minHeight: 48,
                      width: "100%",
                    }}
                    aria-label="Clear text and results"
                  >
                    Clear
                  </ActionButton>
                </Grid>
              </Grid>

              {results.length > 0 && (
                <Box
                  sx={{ mt: 3 }}
                  role="region"
                  aria-label="Generated text styles"
                >
                  <Typography variant="h6" gutterBottom fontWeight="medium">
                    Generated Styles
                  </Typography>
                  <Stack spacing={2}>
                    {results.map((result, index) => (
                      <Paper
                        key={index}
                        variant="outlined"
                        sx={{
                          p: 2,
                          borderRadius: 2,
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          gutterBottom
                        >
                          {result.style}
                        </Typography>
                        <Typography
                          fontFamily="monospace"
                          sx={{
                            wordBreak: "break-all",
                            lineHeight: 1.5,
                          }}
                          role="textbox"
                          aria-label={`${result.style} styled text`}
                        >
                          {result.text}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              )}
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
}
