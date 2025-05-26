import { style } from "@vanilla-extract/css";

export const homeLayoutStyle = style({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#f9fafb", // cor de fundo clara
});

export const containerPageStyles = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  gap: "1rem",
});

export const headerGroupStyles = style({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});
