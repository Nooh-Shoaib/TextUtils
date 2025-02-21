import {
  Typography,
  Grid,
  Box,
  Container,
  Card,
  CardContent,
  CardActionArea,
  Stack,
} from "@mui/material";
import Link from "next/link";
import { Icons } from "@/components/icons";
import SEO from "@/components/SEO";

const features = [
  {
    title: "Text Formatting & Case",
    description: "Case conversion and text formatting tools",
    href: "/format",
    icon: <Icons.format sx={{ fontSize: 24 }} />,
  },
  {
    title: "Text Analysis",
    description: "Word counting and text statistics",
    href: "/analyze",
    icon: <Icons.analyze sx={{ fontSize: 24 }} />,
  },
  {
    title: "Text Cleaning",
    description: "Clean and edit text content",
    href: "/clean",
    icon: <Icons.clean sx={{ fontSize: 24 }} />,
  },
  {
    title: "Text Transformation",
    description: "Transform and manipulate text",
    href: "/transform",
    icon: <Icons.transform sx={{ fontSize: 24 }} />,
  },
  {
    title: "Text Comparison",
    description: "Compare and handle duplicates",
    href: "/compare",
    icon: <Icons.compare sx={{ fontSize: 24 }} />,
  },
  {
    title: "Number & List Tools",
    description: "Work with numbers and lists",
    href: "/list",
    icon: <Icons.list sx={{ fontSize: 24 }} />,
  },
  {
    title: "Encryption & Encoding",
    description: "Encode and encrypt text",
    href: "/encode",
    icon: <Icons.encode sx={{ fontSize: 24 }} />,
  },
  {
    title: "Code Formatting",
    description: "Format text for coding",
    href: "/code",
    icon: <Icons.code sx={{ fontSize: 24 }} />,
  },
  {
    title: "Fancy Text",
    description: "Create stylish text effects",
    href: "/fancy",
    icon: <Icons.fancy sx={{ fontSize: 24 }} />,
  },
  {
    title: "Statistics",
    description: "Analyze text statistics",
    href: "/statistics",
    icon: <Icons.statistics sx={{ fontSize: 24 }} />,
  },
  {
    title: "Unit Converter",
    description: "Convert units of measurement",
    href: "/convert",
    icon: <Icons.convert sx={{ fontSize: 24 }} />,
  },
  {
    title: "Markdown Editor",
    description: "Edit and preview Markdown text",
    href: "/markdown",
    icon: <Icons.markdown sx={{ fontSize: 24 }} />,
  },
  {
    title: "Password Generator",
    description: "Generate secure passwords",
    href: "/password",
    icon: <Icons.password sx={{ fontSize: 24 }} />,
  },
  {
    title: "Calculator",
    description: "Calculate mathematical expressions",
    href: "/calculator",
    icon: <Icons.calculator sx={{ fontSize: 24 }} />,
  },
  {
    title: "QR Code Generator",
    description: "Generate QR codes for your text",
    href: "/qrcode",
    icon: <Icons.qrcode sx={{ fontSize: 24 }} />,
  },
  {
    title: "QR Scanner",
    description: "Scan QR codes using your device's camera",
    href: "/qr-scanner",
    icon: <Icons.scanner sx={{ fontSize: 24 }} />,
  },
  {
    title: "Time Zone Converter",
    description: "Convert time between different time zones",
    href: "/time",
    icon: <Icons.time sx={{ fontSize: 24 }} />,
  },
  {
    title: "Color Picker",
    description: "Pick colors from your device's screen",
    href: "/tools/color",
    icon: <Icons.color sx={{ fontSize: 24 }} />,
  },
  {
    title: "Unit Converter",
    description: "Convert units of measurement",
    href: "/unit-converter",
    icon: <Icons.convert sx={{ fontSize: 24 }} />,
  },
];

export default function Home() {
  return (
    <>
      <SEO
        title="Text Utils Pro - Free Online Text Tools & Utilities"
        description="Collection of free online text tools including case converter, text analyzer, cleaner, encoder, formatter, and more. Simple, fast, and secure text manipulation tools."
        keywords="text tools, text utilities, text formatter, case converter, text analyzer, text cleaner, text encoder, text comparison, fancy text generator, online text tools"
      />

      <Container
        maxWidth="lg"
        sx={{
          bgcolor: "linear-gradient(to right, #e0f7fa, #ffe0b2)",
          borderRadius: 2,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            py: 4,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#fff" : "#333",
              fontSize: "2.5rem",
              textShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px 1px 2px rgba(0, 0, 0, 0.5)"
                  : "1px 1px 2px rgba(0, 0, 0, 0.2)",
            }}
          >
            Text Utils Pro
          </Typography>

          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ maxWidth: "lg" }}
            role="navigation"
            aria-label="Text tools navigation"
          >
            {features.map((feature) => (
              <Grid item xs={12} sm={6} md={4} key={feature.href}>
                <Card
                  component={Link}
                  href={feature.href}
                  sx={{
                    height: "100%",
                    transition: "all 0.3s",
                    boxShadow: 3,
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: (theme) => theme.shadows[6],
                    },
                  }}
                  aria-label={`${feature.title} - ${feature.description}`}
                >
                  <CardActionArea sx={{ height: "100%" }}>
                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        mb={2}
                      >
                        <Container
                          sx={{
                            color: "primary.main",
                            display: "flex",
                            alignItems: "center",
                            width: 70,
                            // height: 70,
                          }}
                          // aria-hidden="true"
                        >
                          {feature.icon}
                        </Container>
                        <Typography
                          variant="h6"
                          component="h2"
                          sx={{ fontWeight: "600", color: "#1976d2" }}
                        >
                          {feature.title}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "1rem" }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
