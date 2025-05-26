import { style } from "@vanilla-extract/css";

export const modalOverlay = style({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
});

export const modal = style({
  backgroundColor: "white",
  padding: "2rem",
  borderRadius: "8px",
  width: "100%",
  maxWidth: 480,
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const form = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export const error = style({
  color: "red",
  fontSize: "0.875rem",
  marginTop: "0.25rem",
});

export const input = style({
  padding: "0.5rem",
  fontSize: "1rem",
  borderRadius: 4,
  border: "1px solid #ccc",
  ":focus": {
    outline: "none",
    borderColor: "#0070f3",
    boxShadow: "0 0 0 2px rgba(0, 112, 243, 0.3)",
  },
});

export const buttonGroup = style({
  display: "flex",
  gap: "1rem",
  marginTop: "1rem",
});

export const button = style({
  padding: "0.75rem 1.5rem",
  fontSize: "1rem",
  borderRadius: 4,
  border: "none",
  cursor: "pointer",
  selectors: {
    "&:disabled": {
      backgroundColor: "#ccc",
      cursor: "not-allowed",
    },
  },
});

export const submitButton = style([
  button,
  {
    backgroundColor: "#0070f3",
    color: "white",
  },
]);

export const cancelButton = style([
  button,
  {
    backgroundColor: "#e0e0e0",
    color: "#333",
    ":hover": {
      backgroundColor: "#bdbdbd",
    },
  },
]);
