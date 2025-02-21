export const textTransforms = {
  // Case conversion
  uppercase: (text) => text.toUpperCase(),
  lowercase: (text) => text.toLowerCase(),
  titleCase: (text) => {
    return text.replace(
      /\w\S*/g,
      (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
    );
  },
  sentenceCase: (text) => {
    return text
      .toLowerCase()
      .replace(/(^\w|\.\s+\w)/gm, (letter) => letter.toUpperCase());
  },
  alternateCase: (text) => {
    return text
      .split("")
      .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
      .join("");
  },

  // Text reversal
  reverse: (text) => text.split("").reverse().join(""),
  reverseWords: (text) => text.split(" ").reverse().join(" "),
  reverseLettersInWords: (text) => {
    return text
      .split(" ")
      .map((word) => word.split("").reverse().join(""))
      .join(" ");
  },
  shuffleWords: (text) => {
    const words = text.split(" ");
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    return words.join(" ");
  },

  // Text cleaning
  removeExtraSpaces: (text) => text.replace(/\s+/g, " ").trim(),
  removeLineBreaks: (text) => text.replace(/\n/g, " "),
  removePunctuation: (text) => text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""),
  removeNumbers: (text) => text.replace(/[0-9]/g, ""),
  removeDuplicateWords: (text) => {
    return [...new Set(text.split(" "))].join(" ");
  },
  removeDuplicateLines: (text) => {
    return [...new Set(text.split("\n"))].join("\n");
  },

  // Encoding
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
  morseEncode: (text) => {
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
    };
    return text
      .toUpperCase()
      .split("")
      .map((char) => morseCode[char] || char)
      .join(" ");
  },
  rot13: (text) => {
    return text.replace(/[A-Za-z]/g, (c) => {
      const base = c <= "Z" ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
  },
};
