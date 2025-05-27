import { style } from "@vanilla-extract/css";

export const homeLayoutStyle = style({
  width: "100%",
  height: "100%",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  paddingLeft: "1rem",
  display: "flex",
  flexDirection: "row",
});

export const header = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const rightGroup = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const leftGroup = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const containerPageStyles = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
});

export const headerGroupStyles = style({
  display: "flex",
  alignItems: "center",
  marginLeft: "5%",
});
