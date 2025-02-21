import { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ColorContrastGrid() {
  const colors = {
    // Basic Colors
    white: "#FFFFFF",
    black: "#000000",

    // Grays
    gray: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },

    // Primary Colors
    blue: {
      50: "#E3F2FD",
      100: "#BBDEFB",
      200: "#90CAF9",
      300: "#64B5F6",
      400: "#42A5F5",
      500: "#2196F3",
      600: "#1E88E5",
      700: "#1976D2",
      800: "#1565C0",
      900: "#0D47A1",
    },
    red: {
      50: "#FFEBEE",
      100: "#FFCDD2",
      200: "#EF9A9A",
      300: "#E57373",
      400: "#EF5350",
      500: "#F44336",
      600: "#E53935",
      700: "#D32F2F",
      800: "#C62828",
      900: "#B71C1C",
    },
    green: {
      50: "#E8F5E9",
      100: "#C8E6C9",
      200: "#A5D6A7",
      300: "#81C784",
      400: "#66BB6A",
      500: "#4CAF50",
      600: "#43A047",
      700: "#388E3C",
      800: "#2E7D32",
      900: "#1B5E20",
    },

    // Secondary Colors
    purple: {
      50: "#F3E5F5",
      100: "#E1BEE7",
      200: "#CE93D8",
      300: "#BA68C8",
      400: "#AB47BC",
      500: "#9C27B0",
      600: "#8E24AA",
      700: "#7B1FA2",
      800: "#6A1B9A",
      900: "#4A148C",
    },
    orange: {
      50: "#FFF3E0",
      100: "#FFE0B2",
      200: "#FFCC80",
      300: "#FFB74D",
      400: "#FFA726",
      500: "#FF9800",
      600: "#FB8C00",
      700: "#F57C00",
      800: "#EF6C00",
      900: "#E65100",
    },
    teal: {
      50: "#E0F2F1",
      100: "#B2DFDB",
      200: "#80CBC4",
      300: "#4DB6AC",
      400: "#26A69A",
      500: "#009688",
      600: "#00897B",
      700: "#00796B",
      800: "#00695C",
      900: "#004D40",
    },

    // Additional Colors
    yellow: {
      50: "#FFFDE7",
      100: "#FFF9C4",
      200: "#FFF59D",
      300: "#FFF176",
      400: "#FFEE58",
      500: "#FFEB3B",
      600: "#FDD835",
      700: "#FBC02D",
      800: "#F9A825",
      900: "#F57F17",
    },
    pink: {
      50: "#FCE4EC",
      100: "#F8BBD0",
      200: "#F48FB1",
      300: "#F06292",
      400: "#EC407A",
      500: "#E91E63",
      600: "#D81B60",
      700: "#C2185B",
      800: "#AD1457",
      900: "#880E4F",
    },
    indigo: {
      50: "#E8EAF6",
      100: "#C5CAE9",
      200: "#9FA8DA",
      300: "#7986CB",
      400: "#5C6BC0",
      500: "#3F51B5",
      600: "#3949AB",
      700: "#303F9F",
      800: "#283593",
      900: "#1A237E",
    },
    brown: {
      50: "#EFEBE9",
      100: "#D7CCC8",
      200: "#BCAAA4",
      300: "#A1887F",
      400: "#8D6E63",
      500: "#795548",
      600: "#6D4C41",
      700: "#5D4037",
      800: "#4E342E",
      900: "#3E2723",
    },
    cyan: {
      50: "#E0F7FA",
      100: "#B2EBF2",
      200: "#80DEEA",
      300: "#4DD0E1",
      400: "#26C6DA",
      500: "#00BCD4",
      600: "#00ACC1",
      700: "#0097A7",
      800: "#00838F",
      900: "#006064",
    },
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const getLuminance = (r, g, b) => {
    let [rs, gs, bs] = [r, g, b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return rs * 0.2126 + gs * 0.7152 + bs * 0.0722;
  };

  const calculateContrast = (color1, color2) => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    if (!rgb1 || !rgb2) return 1;

    const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
  };

  const getWCAGLevel = (ratio) => {
    if (ratio >= 7) return "AAA";
    if (ratio >= 4.5) return "AA";
    if (ratio >= 3) return "AA Large";
    return "Fail";
  };

  const getContrastColor = (ratio) => {
    if (ratio >= 7) return "success";
    if (ratio >= 4.5) return "primary";
    if (ratio >= 3) return "warning";
    return "error";
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Common Color Combinations
      </Typography>
      <Typography color="text.secondary" paragraph>
        A comprehensive grid showing contrast ratios between different color
        combinations.
      </Typography>

      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Background</TableCell>
              <TableCell>Foreground</TableCell>
              <TableCell align="center">Contrast</TableCell>
              <TableCell align="center">WCAG Level</TableCell>
              <TableCell>Preview</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(colors).flatMap(([groupName1, group1]) => {
              if (typeof group1 === "string") {
                return Object.entries(colors).flatMap(
                  ([groupName2, group2]) => {
                    if (typeof group2 === "string") {
                      const contrast = calculateContrast(group1, group2);
                      const level = getWCAGLevel(contrast);
                      return [
                        <TableRow key={`${group1}-${group2}`}>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 24,
                                  height: 24,
                                  bgcolor: group1,
                                  borderRadius: 0.5,
                                  border: "1px solid",
                                  borderColor: "divider",
                                }}
                              />
                              {groupName1}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 24,
                                  height: 24,
                                  bgcolor: group2,
                                  borderRadius: 0.5,
                                  border: "1px solid",
                                  borderColor: "divider",
                                }}
                              />
                              {groupName2}
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={`${contrast}:1`}
                              color={getContrastColor(contrast)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="center">
                            {level === "Fail" ? (
                              <CancelIcon color="error" />
                            ) : (
                              <CheckCircleIcon color="success" />
                            )}
                            <Typography
                              variant="body2"
                              color={level === "Fail" ? "error" : "success"}
                              component="span"
                              sx={{ ml: 1 }}
                            >
                              {level}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                p: 1,
                                borderRadius: 1,
                                bgcolor: group1,
                                border: "1px solid",
                                borderColor: "divider",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: group2,
                                  fontWeight: "medium",
                                }}
                              >
                                Sample Text
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>,
                      ];
                    }
                    return Object.entries(group2).map(([shade2, color2]) => {
                      const contrast = calculateContrast(group1, color2);
                      const level = getWCAGLevel(contrast);
                      return (
                        <TableRow key={`${group1}-${color2}`}>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 24,
                                  height: 24,
                                  bgcolor: group1,
                                  borderRadius: 0.5,
                                  border: "1px solid",
                                  borderColor: "divider",
                                }}
                              />
                              {groupName1}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 24,
                                  height: 24,
                                  bgcolor: color2,
                                  borderRadius: 0.5,
                                  border: "1px solid",
                                  borderColor: "divider",
                                }}
                              />
                              {`${groupName2} ${shade2}`}
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={`${contrast}:1`}
                              color={getContrastColor(contrast)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="center">
                            {level === "Fail" ? (
                              <CancelIcon color="error" />
                            ) : (
                              <CheckCircleIcon color="success" />
                            )}
                            <Typography
                              variant="body2"
                              color={level === "Fail" ? "error" : "success"}
                              component="span"
                              sx={{ ml: 1 }}
                            >
                              {level}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                p: 1,
                                borderRadius: 1,
                                bgcolor: group1,
                                border: "1px solid",
                                borderColor: "divider",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: color2,
                                  fontWeight: "medium",
                                }}
                              >
                                Sample Text
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    });
                  }
                );
              }
              return Object.entries(group1).flatMap(([shade1, color1]) =>
                Object.entries(colors).flatMap(([groupName2, group2]) => {
                  if (typeof group2 === "string") {
                    const contrast = calculateContrast(color1, group2);
                    const level = getWCAGLevel(contrast);
                    return [
                      <TableRow key={`${color1}-${group2}`}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 24,
                                height: 24,
                                bgcolor: color1,
                                borderRadius: 0.5,
                                border: "1px solid",
                                borderColor: "divider",
                              }}
                            />
                            {`${groupName1} ${shade1}`}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 24,
                                height: 24,
                                bgcolor: group2,
                                borderRadius: 0.5,
                                border: "1px solid",
                                borderColor: "divider",
                              }}
                            />
                            {groupName2}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={`${contrast}:1`}
                            color={getContrastColor(contrast)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          {level === "Fail" ? (
                            <CancelIcon color="error" />
                          ) : (
                            <CheckCircleIcon color="success" />
                          )}
                          <Typography
                            variant="body2"
                            color={level === "Fail" ? "error" : "success"}
                            component="span"
                            sx={{ ml: 1 }}
                          >
                            {level}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: 1,
                              bgcolor: color1,
                              border: "1px solid",
                              borderColor: "divider",
                            }}
                          >
                            <Typography
                              sx={{
                                color: group2,
                                fontWeight: "medium",
                              }}
                            >
                              Sample Text
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>,
                    ];
                  }
                  return Object.entries(group2).map(([shade2, color2]) => {
                    const contrast = calculateContrast(color1, color2);
                    const level = getWCAGLevel(contrast);
                    return (
                      <TableRow key={`${color1}-${color2}`}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 24,
                                height: 24,
                                bgcolor: color1,
                                borderRadius: 0.5,
                                border: "1px solid",
                                borderColor: "divider",
                              }}
                            />
                            {`${groupName1} ${shade1}`}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 24,
                                height: 24,
                                bgcolor: color2,
                                borderRadius: 0.5,
                                border: "1px solid",
                                borderColor: "divider",
                              }}
                            />
                            {`${groupName2} ${shade2}`}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={`${contrast}:1`}
                            color={getContrastColor(contrast)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="center">
                          {level === "Fail" ? (
                            <CancelIcon color="error" />
                          ) : (
                            <CheckCircleIcon color="success" />
                          )}
                          <Typography
                            variant="body2"
                            color={level === "Fail" ? "error" : "success"}
                            component="span"
                            sx={{ ml: 1 }}
                          >
                            {level}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: 1,
                              bgcolor: color1,
                              border: "1px solid",
                              borderColor: "divider",
                            }}
                          >
                            <Typography
                              sx={{
                                color: color2,
                                fontWeight: "medium",
                              }}
                            >
                              Sample Text
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  });
                })
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
