import { useState } from "react";
import { Typography, Grid, Box, Container, Alert } from "@mui/material";
import TextArea from "../components/TextArea";
import ActionButton from "../components/ActionButton";
import SEO from "@/components/SEO";

const morseCode = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  " ": "/",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  ":": "---...",
  ";": "-.-.-.",
  "-": "-....-",
  "(": "-.--.",
  ")": "-.--.-",
  '"': ".-..-.",
  "@": ".--.-.",
};

const reverseMorseCode = Object.fromEntries(
  Object.entries(morseCode).map(([key, value]) => [value, key])
);

const encodingTools = {
  base64Encode: (text) => btoa(text),
  base64Decode: (text) => {
    try {
      return atob(text);
    } catch {
      throw new Error("Invalid Base64 string");
    }
  },
  urlEncode: (text) => encodeURIComponent(text),
  urlDecode: (text) => decodeURIComponent(text),
  rot13: (text) => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const base = char <= "Z" ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - base + 13) % 26) + base
      );
    });
  },
  morseEncode: (text) => {
    return text
      .toUpperCase()
      .split("")
      .map((char) => morseCode[char] || char)
      .join(" ");
  },
  morseDecode: (text) => {
    try {
      return text
        .split(" ")
        .map((code) => reverseMorseCode[code] || code)
        .join("");
    } catch {
      throw new Error("Invalid Morse code");
    }
  },
  binaryEncode: (text) => {
    return text
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
  },
  binaryDecode: (text) => {
    try {
      return text
        .split(" ")
        .map((bin) => String.fromCharCode(parseInt(bin, 2)))
        .join("");
    } catch {
      throw new Error("Invalid binary string");
    }
  },
  hexEncode: (text) => {
    return text
      .split("")
      .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(" ");
  },
  hexDecode: (text) => {
    try {
      return text
        .split(" ")
        .map((hex) => String.fromCharCode(parseInt(hex, 16)))
        .join("");
    } catch {
      throw new Error("Invalid hex string");
    }
  },
};

export default function Encode() {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleEncode = (encoder) => {
    try {
      setError("");
      setText(encodingTools[encoder](text));
    } catch (err) {
      setError(err.message);
    }
  };

  const encodingActions = [
    { name: "Base64 Encode", action: "base64Encode" },
    { name: "Base64 Decode", action: "base64Decode" },
    { name: "URL Encode", action: "urlEncode" },
    { name: "URL Decode", action: "urlDecode" },
    { name: "ROT13", action: "rot13" },
    { name: "Morse Code", action: "morseEncode" },
    { name: "Morse Decode", action: "morseDecode" },
    { name: "Binary Encode", action: "binaryEncode" },
    { name: "Binary Decode", action: "binaryDecode" },
    { name: "Hex Encode", action: "hexEncode" },
    { name: "Hex Decode", action: "hexDecode" },
  ];

  return (
    <>
      <SEO
        title="Text Encoder & Decoder - Base64, URL, Morse, Binary, Hex | Text Utils Pro"
        description="Free online text encoding and decoding tools. Convert text to Base64, URL encoding, Morse code, Binary, Hexadecimal, and ROT13. Simple and secure text conversion."
        keywords="text encoder, text decoder, base64 encoder, url encoder, morse code converter, binary converter, hex converter, rot13, text encryption, online encoder"
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
            Encryption & Encoding
          </Typography>

          <Box sx={{ maxWidth: "md", width: "100%", mx: "auto" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextArea
                value={text}
                onChange={(newText) => {
                  setText(newText);
                  setError("");
                }}
                placeholder="Enter text to encode/decode..."
                label="Text to encode/decode"
                error={Boolean(error)}
                helperText={error}
                aria-label="Input text for encoding or decoding"
              />

              {error && (
                <Alert
                  severity="error"
                  variant="outlined"
                  onClose={() => setError("")}
                  role="alert"
                >
                  {error}
                </Alert>
              )}

              <Grid container spacing={1}>
                {encodingActions.map(({ name, action }) => (
                  <Grid item xs={12} sm={6} md={4} key={action}>
                    <ActionButton
                      onClick={() => handleEncode(action)}
                      variant="secondary"
                      sx={{
                        height: "100%",
                        minHeight: 48,
                        width: "100%",
                      }}
                      aria-label={`${name} the text`}
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
                      setError("");
                    }}
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
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
