import { style, globalStyle } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  maxWidth: "1200px",
  margin: "0 auto",

  "@media": {
    "(max-width: 768px)": {
      padding: "0.5rem",
    },
  },
});

export const title = style({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "1rem",
});

export const actions = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
  alignItems: "center",
  justifyContent: "space-between",

  "@media": {
    "(max-width: 768px)": {
      flexDirection: "column",
      alignItems: "stretch",
    },
  },
});

export const input = style({
  border: "1px solid #ccc",
  padding: "0.5rem",
});

export const button = style({
  padding: "0.5rem 1rem",
  borderRadius: "0.5rem",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  cursor: "pointer",

  "@media": {
    "(max-width: 768px)": {
      width: "100%",
    },
  },
});

export const table = style({
  width: "100%",
  borderCollapse: "collapse",

  "@media": {
    "(max-width: 768px)": {
      fontSize: "0.85rem",
    },
  },
});

export const th = style({
  cursor: "pointer",
  padding: "0.5rem",
  borderBottom: "1px solid #ddd",
});

export const td = style({
  padding: "0.5rem",
  borderBottom: "1px solid #ddd",
});

export const pagination = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
  marginTop: "1rem",

  "@media": {
    "(max-width: 480px)": {
      flexDirection: "column",
    },
  },
});

export const modalBackdrop = style({
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const modalContent = style({
  background: "#fff",
  padding: "1.5rem",
  borderRadius: "0.5rem",
  maxWidth: "400px",
  width: "100%",

  "@media": {
    "(max-width: 480px)": {
      padding: "1rem",
      maxWidth: "90%",
    },
  },
});

globalStyle("button:disabled", {
  opacity: 0.5,
  cursor: "not-allowed",
});
