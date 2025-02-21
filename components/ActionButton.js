import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// Custom styled button with consistent padding and sizing
const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1, 3),
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
  fontWeight: 600,
}));

export default function ActionButton({
  onClick,
  children,
  variant = "primary",
  className = "",
  size = "medium",
  disabled = false,
  startIcon,
  endIcon,
  sx,
  ...props
}) {
  const getVariant = () => {
    switch (variant) {
      case "primary":
        return "contained";
      case "secondary":
        return "outlined";
      case "text":
        return "text";
      case "danger":
      case "success":
        return "contained";
      default:
        return "contained";
    }
  };

  const getColor = () => {
    switch (variant) {
      case "danger":
        return "error";
      case "success":
        return "success";
      case "secondary":
        return "secondary";
      default:
        return "primary";
    }
  };

  return (
    <StyledButton
      onClick={onClick}
      variant={getVariant()}
      color={getColor()}
      className={className}
      size={size}
      disabled={disabled}
      startIcon={startIcon}
      endIcon={endIcon}
      fullWidth
      sx={{
        ...sx,
        "&:hover": {
          opacity: 0.9,
          ...sx?.["&:hover"],
        },
      }}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
