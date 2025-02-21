import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Grid,
  Button,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  IconButton,
} from "@mui/material";
import * as math from "mathjs";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SEO from "@/components/SEO";

const basicOperators = [
  { label: "+", op: "+" },
  { label: "-", op: "-" },
  { label: "×", op: "*" },
  { label: "÷", op: "/" },
];

const scientificFunctions = [
  { label: "sin", func: "sin" },
  { label: "cos", func: "cos" },
  { label: "tan", func: "tan" },
  { label: "asin", func: "asin" },
  { label: "acos", func: "acos" },
  { label: "atan", func: "atan" },
  { label: "sinh", func: "sinh" },
  { label: "cosh", func: "cosh" },
  { label: "tanh", func: "tanh" },
  { label: "√", func: "sqrt" },
  { label: "∛", func: "cbrt" },
  { label: "log", func: "log10" },
  { label: "ln", func: "log" },
  { label: "abs", func: "abs" },
  { label: "exp", func: "exp" },
];

const constants = [
  { label: "π", value: "pi" },
  { label: "e", value: "e" },
  { label: "φ", value: "1.618033988749895" }, // Golden ratio
  { label: "γ", value: "0.5772156649015329" }, // Euler-Mascheroni constant
];

const extraOperators = [
  { label: "%", op: "%" },
  { label: "^", op: "^" },
  { label: "!", op: "!" },
  { label: "(", op: "(" },
  { label: ")", op: ")" },
  { label: ".", op: "." },
];

const memoryOperations = [
  { label: "MC", op: "memoryClear" },
  { label: "MR", op: "memoryRecall" },
  { label: "M+", op: "memoryAdd" },
  { label: "M-", op: "memorySubtract" },
  { label: "MS", op: "memoryStore" },
];

const calculatorButtons = {
  row1: [
    { label: "2nd", type: "function", action: "second" },
    { label: "DEG", type: "mode", action: "deg" },
    { label: "RAD", type: "mode", action: "rad" },
    { label: "GRAD", type: "mode", action: "grad" },
    { label: "MC", type: "memory", action: "memoryClear" },
    { label: "MR", type: "memory", action: "memoryRecall" },
    { label: "M+", type: "memory", action: "memoryAdd" },
    { label: "M-", type: "memory", action: "memorySubtract" },
    { label: "MS", type: "memory", action: "memoryStore" },
  ],
  row2: [
    { label: "sin", type: "function", action: "sin" },
    { label: "sin⁻¹", type: "function", action: "asin" },
    { label: "sinh", type: "function", action: "sinh" },
    { label: "sinh⁻¹", type: "function", action: "asinh" },
    { label: "e^x", type: "function", action: "exp" },
    { label: "ln", type: "function", action: "log" },
  ],
  row3: [
    { label: "cos", type: "function", action: "cos" },
    { label: "cos⁻¹", type: "function", action: "acos" },
    { label: "cosh", type: "function", action: "cosh" },
    { label: "cosh⁻¹", type: "function", action: "acosh" },
    { label: "10^x", type: "function", action: "10^" },
    { label: "log", type: "function", action: "log10" },
  ],
  row4: [
    { label: "tan", type: "function", action: "tan" },
    { label: "tan⁻¹", type: "function", action: "atan" },
    { label: "tanh", type: "function", action: "tanh" },
    { label: "tanh⁻¹", type: "function", action: "atanh" },
    { label: "x^y", type: "operator", action: "^" },
    { label: "log₂", type: "function", action: "log2" },
  ],
  row5: [
    { label: "π", type: "constant", action: "pi" },
    { label: "e", type: "constant", action: "e" },
    { label: "φ", type: "constant", action: "phi" },
    { label: "γ", type: "constant", action: "gamma" },
    { label: "x²", type: "function", action: "^2" },
    { label: "√", type: "function", action: "sqrt" },
  ],
  row6: [
    { label: "Σx", type: "stat", action: "sum" },
    { label: "Σx²", type: "stat", action: "sumSquares" },
    { label: "σx", type: "stat", action: "stdDev" },
    { label: "x̄", type: "stat", action: "mean" },
    { label: "x³", type: "function", action: "^3" },
    { label: "∛", type: "function", action: "cbrt" },
  ],
  row7: [
    { label: "(", type: "operator", action: "(" },
    { label: ")", type: "operator", action: ")" },
    { label: "n!", type: "function", action: "factorial" },
    { label: "Inv", type: "function", action: "inverse" },
    { label: "y√x", type: "function", action: "nthRoot" },
    { label: "%", type: "operator", action: "%" },
  ],
  row8: [
    { label: "Rnd", type: "function", action: "round" },
    { label: "Ran#", type: "function", action: "random" },
    { label: "ENG", type: "function", action: "engineering" },
    { label: "dms", type: "function", action: "dms" },
    { label: "deg", type: "function", action: "degrees" },
    { label: "rad", type: "function", action: "radians" },
  ],
  row9: [
    { label: "nPr", type: "function", action: "permutations" },
    { label: "nCr", type: "function", action: "combinations" },
    { label: "F<>D", type: "function", action: "fracDec" },
    { label: "Abs", type: "function", action: "abs" },
    { label: "mod", type: "operator", action: "mod" },
    { label: "exp", type: "function", action: "exp" },
  ],
  numbers: [
    { label: "7", type: "number", action: "7" },
    { label: "8", type: "number", action: "8" },
    { label: "9", type: "number", action: "9" },
    { label: "4", type: "number", action: "4" },
    { label: "5", type: "number", action: "5" },
    { label: "6", type: "number", action: "6" },
    { label: "1", type: "number", action: "1" },
    { label: "2", type: "number", action: "2" },
    { label: "3", type: "number", action: "3" },
    { label: "0", type: "number", action: "0" },
    { label: ".", type: "number", action: "." },
    { label: "Ans", type: "memory", action: "answer" },
  ],
  operators: [
    { label: "DEL", type: "clear", action: "backspace", color: "warning" },
    { label: "AC", type: "clear", action: "allClear", color: "error" },
    { label: "÷", type: "operator", action: "/" },
    { label: "×", type: "operator", action: "*" },
    { label: "-", type: "operator", action: "-" },
    { label: "+", type: "operator", action: "+" },
    { label: "=", type: "equals", action: "calculate", color: "success" },
  ],
};

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState("basic");
  const [angleUnit, setAngleUnit] = useState("deg");
  const [memory, setMemory] = useState(null);
  const [copied, setCopied] = useState(false);
  const [lastAnswer, setLastAnswer] = useState(null);
  const [statisticalData, setStatisticalData] = useState([]);
  const [shift, setShift] = useState(false);

  const handleMemoryOperation = (op) => {
    const currentResult = result ? parseFloat(result) : 0;

    switch (op) {
      case "memoryClear":
        setMemory(null);
        break;
      case "memoryRecall":
        if (memory !== null) {
          setExpression(memory.toString());
        }
        break;
      case "memoryAdd":
        setMemory((prev) =>
          prev !== null ? prev + currentResult : currentResult
        );
        break;
      case "memorySubtract":
        setMemory((prev) =>
          prev !== null ? prev - currentResult : -currentResult
        );
        break;
      case "memoryStore":
        setMemory(currentResult);
        break;
    }
  };

  const handleButtonClick = (button) => {
    switch (button.type) {
      case "number":
      case "operator":
        setExpression((prev) => prev + button.action);
        break;

      case "function":
        if (
          ["sin", "cos", "tan", "asin", "acos", "atan"].includes(button.action)
        ) {
          setExpression((prev) => prev + `${button.action}(`);
        } else if (button.action.startsWith("^")) {
          setExpression((prev) => prev + button.action);
        } else {
          setExpression((prev) => prev + `${button.action}(`);
        }
        break;

      case "constant":
        setExpression((prev) => prev + math[button.action] || button.action);
        break;

      case "memory":
        handleMemoryOperation(button.action);
        break;

      case "clear":
        if (button.action === "allClear") {
          handleClear();
        } else if (button.action === "clear") {
          setExpression("");
        } else if (button.action === "backspace") {
          handleBackspace();
        }
        break;

      case "equals":
        handleCalculate();
        break;

      case "mode":
        setAngleUnit(button.action);
        break;

      case "stat":
        handleStatisticalOperation(button.action);
        break;
    }
  };

  const handleNumberClick = (num) => {
    setExpression((prev) => prev + num);
    setError("");
  };

  const handleOperatorClick = (op) => {
    setExpression((prev) => prev + op);
    setError("");
  };

  const handleFunctionClick = (func) => {
    if (["pi", "e"].includes(func)) {
      setExpression((prev) => prev + math[func]);
    } else {
      setExpression((prev) => prev + func + "(");
    }
    setError("");
  };

  const handleConstantClick = (constant) => {
    setExpression((prev) => prev + math[constant] || constant);
    setError("");
  };

  const handleClear = () => {
    setExpression("");
    setResult("");
    setError("");
  };

  const handleBackspace = () => {
    setExpression((prev) => prev.slice(0, -1));
    setError("");
  };

  const handleCopyResult = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy result:", err);
      }
    }
  };

  const handleCalculate = () => {
    if (!expression) {
      setError("Please enter an expression");
      return;
    }

    try {
      // Convert angles if needed
      let processedExpression = expression;
      if (angleUnit === "deg") {
        ["sin", "cos", "tan"].forEach((func) => {
          const regex = new RegExp(`${func}\\(`, "g");
          processedExpression = processedExpression.replace(
            regex,
            `${func}(pi/180*`
          );
        });
      }

      const evaluated = math.evaluate(processedExpression);
      const formattedResult = math.format(evaluated, { precision: 14 });
      setResult(formattedResult);
      setHistory((prev) =>
        [{ expression, result: formattedResult }, ...prev].slice(0, 10)
      );
      setError("");
    } catch (err) {
      setError("Invalid expression");
      setResult("");
    }
  };

  const handleStatisticalOperation = (operation) => {
    if (!statisticalData.length) {
      setError("No statistical data available");
      return;
    }

    try {
      let result;
      switch (operation) {
        case "sum":
          result = math.sum(statisticalData);
          break;
        case "sumSquares":
          result = statisticalData.reduce(
            (acc, val) => acc + Math.pow(val, 2),
            0
          );
          break;
        case "stdDev":
          result = math.std(statisticalData);
          break;
        case "mean":
          result = math.mean(statisticalData);
          break;
        case "linearRegression":
          // Implement linear regression calculation
          break;
      }
      setResult(result.toString());
    } catch (err) {
      setError("Statistical calculation error");
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <>
      <SEO
        title="Scientific Calculator | Text Utils Pro"
        description="Advanced scientific calculator with comprehensive functions"
        keywords="calculator, scientific calculator, math functions"
      />
      <Container maxWidth="lg" sx={{ height: "calc(100vh - 64px)" }}>
        <Box sx={{ py: 2 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 600,
              textAlign: "center",
              mb: 3,
            }}
          >
            Scientific Calculator
          </Typography>

          <Grid container spacing={2} sx={{ height: "calc(100% - 60px)" }}>
            <Grid item xs={12} md={8} sx={{ height: "100%" }}>
              <Paper
                sx={{
                  p: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <TextField
                  fullWidth
                  value={expression}
                  placeholder="Enter expression"
                  onChange={(e) => setExpression(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: "1.5rem",
                      fontFamily: "monospace",
                      textAlign: "right",
                    },
                  }}
                />
                {(result || error) && (
                  <Alert severity={error ? "error" : "success"}>
                    {error ? error : `Result: ${result}`}
                  </Alert>
                )}

                <Box
                  sx={{
                    flex: 1,
                    display: "grid",
                    gridTemplateColumns: "5fr 1fr",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(9, 1fr)",
                        gap: 0.5,
                      }}
                    >
                      {calculatorButtons.row1.map((btn) => (
                        <Button
                          key={btn.label}
                          size="small"
                          variant="outlined"
                          onClick={() => handleButtonClick(btn)}
                        >
                          {btn.label}
                        </Button>
                      ))}
                    </Box>

                    {[
                      calculatorButtons.row2,
                      calculatorButtons.row3,
                      calculatorButtons.row4,
                      calculatorButtons.row5,
                      calculatorButtons.row6,
                      calculatorButtons.row7,
                      calculatorButtons.row8,
                      calculatorButtons.row9,
                    ].map((row, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(6, 1fr)",
                          gap: 0.5,
                        }}
                      >
                        {row.map((btn) => (
                          <Button
                            key={btn.label}
                            size="small"
                            variant="outlined"
                            onClick={() => handleButtonClick(btn)}
                          >
                            {btn.label}
                          </Button>
                        ))}
                      </Box>
                    ))}

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 0.5,
                      }}
                    >
                      {calculatorButtons.numbers.map((btn) => (
                        <Button
                          key={btn.label}
                          variant="contained"
                          onClick={() => handleButtonClick(btn)}
                          sx={{ fontSize: "1.25rem" }}
                        >
                          {btn.label}
                        </Button>
                      ))}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateRows: "repeat(7, 1fr)",
                      gap: 0.5,
                    }}
                  >
                    {calculatorButtons.operators.map((btn) => (
                      <Button
                        key={btn.label}
                        variant="contained"
                        color={btn.color || "primary"}
                        onClick={() => handleButtonClick(btn)}
                        sx={{ fontSize: "1.25rem" }}
                      >
                        {btn.label}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} sx={{ height: "100%" }}>
              <Paper sx={{ p: 2, height: "100%", overflow: "auto" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">History</Typography>
                  {history.length > 0 && (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={handleClearHistory}
                    >
                      Clear History
                    </Button>
                  )}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {history.map((item, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 1,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                      onClick={() => setExpression(item.expression)}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {item.expression}
                      </Typography>
                      <Typography variant="body1">{item.result}</Typography>
                    </Paper>
                  ))}
                  {history.length === 0 && (
                    <Typography color="text.secondary">
                      No history yet
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
