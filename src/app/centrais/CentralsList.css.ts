import { style, globalStyle } from "@vanilla-extract/css";

export const container = style({
  padding: "1rem",
});

export const title = style({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "1rem",
});

export const actions = style({
  display: "flex",
  gap: "0.5rem",
  marginBottom: "1rem",
});

export const input = style({
  border: "1px solid #ccc",
  padding: "0.5rem",
});

export const button = style({
  backgroundColor: "#28a745",
  color: "#fff",
  cursor: "pointer",
  padding: "0.5rem 1rem",
  borderRadius: "0.375rem",
});

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
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
  justifyContent: "space-between",
  marginTop: "1rem",
  alignItems: "center",
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
  backgroundColor: "#fff",
  padding: "1.5rem",
  borderRadius: "0.5rem",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
});

globalStyle("button:disabled", {
  opacity: 0.5,
  cursor: "not-allowed",
});
