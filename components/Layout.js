import { useTheme } from "next-themes";
import { Geist } from "next/font/google";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Button,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Container,
  Typography,
  Box,
  AppBar,
  Toolbar,
  Stack,
  Grid,
  SwipeableDrawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { Icons } from "./icons";

const footerLinks = [
  { name: "Privacy", href: "/privacy" },
  { name: "Terms", href: "/terms" },
];

const navCategories = {
  "Text Tools": [
    { name: "Format", href: "/format", icon: Icons.format },
    { name: "Analyze", href: "/analyze", icon: Icons.analyze },
    { name: "Clean", href: "/clean", icon: Icons.clean },
    { name: "Transform", href: "/transform", icon: Icons.transform },
    { name: "Compare", href: "/compare", icon: Icons.compare },
  ],
  "Data Tools": [
    { name: "List", href: "/list", icon: Icons.list },
    { name: "Statistics", href: "/statistics", icon: Icons.statistics },
    { name: "Convert", href: "/convert", icon: Icons.convert },
  ],
  "Developer Tools": [
    { name: "Code", href: "/code", icon: Icons.code },
    { name: "Encode", href: "/encode", icon: Icons.encode },
    { name: "Markdown", href: "/markdown", icon: Icons.markdown },
  ],
  Utilities: [
    { name: "Password", href: "/password", icon: Icons.password },
    { name: "Calculator", href: "/calculator", icon: Icons.calculator },
    { name: "QR Code", href: "/qrcode", icon: Icons.qrcode },
    { name: "QR Scanner", href: "/qr-scanner", icon: Icons.scanner },
    { name: "Fancy", href: "/fancy", icon: Icons.fancy },
  ],
  Tools: [
    { name: "Time", href: "/time", icon: Icons.time },
    { name: "Color", href: "/tools/color", icon: Icons.color },
    {
      name: "Unit Converter",
      href: "/unit-converter",
      icon: Icons.unitConverter,
    },
  ],
};

// Styled mega menu
const MegaMenu = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3),
  boxShadow: theme.shadows[3],
  zIndex: 1000,
}));

export default function Layout({ children, showBackButton = true, title }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [featuresMenuAnchor, setFeaturesMenuAnchor] = useState(null);

  useEffect(() => {
    const handleClickAway = (event) => {
      if (
        featuresMenuAnchor &&
        !featuresMenuAnchor.contains(event.target) &&
        !event.target.closest(".mega-menu-content")
      ) {
        setFeaturesMenuAnchor(null);
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    return () => document.removeEventListener("mousedown", handleClickAway);
  }, [featuresMenuAnchor]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setFeaturesMenuAnchor(null);
      setMobileDrawerOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  const handleFeaturesClick = (event) => {
    setFeaturesMenuAnchor(featuresMenuAnchor ? null : event.currentTarget);
  };

  const handleFeaturesMenuClose = () => {
    setFeaturesMenuAnchor(null);
  };

  const toggleMobileDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMobileDrawerOpen(open);
  };

  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo */}
            <Button component={Link} href="/" sx={{ mr: 2 }}>
              <Image
                src="/logo.png"
                alt="Text Utils Pro"
                width={200}
                height={32}
                style={{
                  background: theme === "dark" ? "#fff" : "transparent",
                  borderRadius: "8px",
                  padding: "4px",
                }}
              />
              {/* <Typography variant="h5" component="span" sx={{ mr: 1 }}>
                ⚡
              </Typography>
              <Typography variant="h6" component="span" fontWeight="bold">
                Text Utils Pro
              </Typography> */}
            </Button>

            {/* Desktop Navigation */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <Button
                onClick={handleFeaturesClick}
                endIcon={<KeyboardArrowDownIcon />}
                aria-expanded={Boolean(featuresMenuAnchor)}
                aria-haspopup="true"
              >
                Features
              </Button>

              {/* Mega Menu */}
              {featuresMenuAnchor && (
                <MegaMenu className="mega-menu-content">
                  <Container maxWidth="lg">
                    <Grid container spacing={4}>
                      {Object.entries(navCategories).map(
                        ([category, links]) => (
                          <Grid item xs={3} key={category}>
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              gutterBottom
                            >
                              {category}
                            </Typography>
                            <Stack spacing={1}>
                              {links.map((link) => (
                                <Button
                                  key={link.href}
                                  component={Link}
                                  href={link.href}
                                  startIcon={<link.icon className="w-5 h-5" />}
                                  sx={{
                                    justifyContent: "flex-start",
                                    textTransform: "none",
                                    color: "text.secondary",
                                    "&:hover": {
                                      color: "text.primary",
                                      bgcolor: "action.hover",
                                    },
                                  }}
                                >
                                  {link.name}
                                </Button>
                              ))}
                            </Stack>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Container>
                </MegaMenu>
              )}

              {/* Theme Toggle Button */}
              <Tooltip title={theme === "dark" ? "Light mode" : "Dark mode"}>
                <IconButton
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  size="small"
                  sx={{
                    ml: 1,
                    color: "text.primary",
                  }}
                >
                  {theme === "dark" ? (
                    <Icons.sun className="w-5 h-5" />
                  ) : (
                    <Icons.moon className="w-5 h-5" />
                  )}
                </IconButton>
              </Tooltip>
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              sx={{ display: { lg: "none" }, ml: "auto" }}
              onClick={toggleMobileDrawer(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* Mobile Drawer */}
            <SwipeableDrawer
              anchor="right"
              open={mobileDrawerOpen}
              onClose={toggleMobileDrawer(false)}
              onOpen={toggleMobileDrawer(true)}
              sx={{
                display: { lg: "none" },
                "& .MuiDrawer-paper": {
                  width: "80%",
                  maxWidth: 360,
                },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Box
                  sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}
                >
                  <IconButton onClick={toggleMobileDrawer(false)}>
                    <CloseIcon />
                  </IconButton>
                </Box>

                {Object.entries(navCategories).map(([category, links]) => (
                  <Box key={category} sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      sx={{ px: 2, mb: 1 }}
                    >
                      {category}
                    </Typography>
                    {links.map((link) => (
                      <MenuItem
                        key={link.href}
                        component={Link}
                        href={link.href}
                        onClick={toggleMobileDrawer(false)}
                        sx={{ py: 1.5 }}
                      >
                        <ListItemIcon>
                          <link.icon className="w-5 h-5" />
                        </ListItemIcon>
                        <ListItemText primary={link.name} />
                      </MenuItem>
                    ))}
                  </Box>
                ))}

                <Divider />
                <MenuItem
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                    toggleMobileDrawer(false)();
                  }}
                  sx={{ mt: 2 }}
                >
                  <ListItemIcon>
                    {theme === "dark" ? (
                      <Icons.sun className="w-5 h-5" />
                    ) : (
                      <Icons.moon className="w-5 h-5" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={theme === "dark" ? "Light Mode" : "Dark Mode"}
                  />
                </MenuItem>
              </Box>
            </SwipeableDrawer>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          bgcolor: "background.default",
          color: "text.primary",
        }}
        maxWidth="lg"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          color: "text.primary",
        }}
      >
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Grid container spacing={8}>
            {/* Brand */}
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <Button
                  component={Link}
                  href="/"
                  sx={{ justifyContent: "flex-start" }}
                >
                  <Image
                    src="/logo.png"
                    alt="Text Utils Pro"
                    width={200}
                    height={32}
                    style={{
                      background: theme === "dark" ? "#fff" : "transparent",
                      borderRadius: "8px",
                      padding: "4px",
                    }}
                  />
                </Button>
                <Typography variant="body2" color="text.secondary">
                  Professional text manipulation tools for developers and
                  writers.
                </Typography>
              </Stack>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Quick Links
              </Typography>
              <Grid container spacing={1}>
                {navCategories["Text Tools"].slice(0, 6).map((link) => (
                  <Grid item xs={6} key={link.href}>
                    <Button
                      component={Link}
                      href={link.href}
                      sx={{
                        color: "text.secondary",
                        "&:hover": { color: "text.primary" },
                        justifyContent: "flex-start",
                        textTransform: "none",
                      }}
                    >
                      {link.name}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Legal Links */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Legal
              </Typography>
              <Stack spacing={1}>
                {footerLinks.map((link) => (
                  <Button
                    key={link.href}
                    component={Link}
                    href={link.href}
                    sx={{
                      color: "text.secondary",
                      "&:hover": { color: "text.primary" },
                      justifyContent: "flex-start",
                      textTransform: "none",
                    }}
                  >
                    {link.name}
                  </Button>
                ))}
              </Stack>
            </Grid>
          </Grid>

          {/* Copyright */}
          <Box
            sx={{
              mt: 4,
              pt: 4,

              borderTop: 1,
              borderColor: "divider",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Text Utils Pro. All rights reserved.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Made with{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path d="M8 2.748-.717-1.737C5.6 1.2 8 3.5 8 3.5s2.4-2.3 6.717-2.489C8 2.748 8 2.748 8 2.748z" />
                <path d="M8 15s-1.5-1.5-4.5-4.5C1.5 8.5 0 6.5 0 4.5 0 2.5 1.5 1 3.5 1c1.5 0 2.5 1 2.5 1s1-1 2.5-1C14.5 1 16 2.5 16 4.5c0 2-1.5 4-3.5 6.5C9.5 13.5 8 15 8 15z" />
              </svg>{" "}
              by{" "}
              <Link
                href="https://github.com/Nooh-Shoaib/TextUtils"
                target="_blank"
              >
                Nooh
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
