import { globalStyle } from "@vanilla-extract/css";

import { BREAKPOINTS } from "@components/styles/theme/breakpoints";
import { theme } from "@components/styles/theme/theme.css";

globalStyle("*, *::before, *::after", {
  margin: 0,
  padding: 0,
  boxSizing: "border-box",
  border: "none",
});

globalStyle("*::selection", {
  backgroundColor: theme.colors.foregroundSelectionBackground,
});

globalStyle("*:focus", {
  outline: 0,
});

globalStyle("html", {
  fontSize: "54.69%",

  "@media": {
    [`screen and ${BREAKPOINTS.md}`]: {
      fontSize: "47.59%",
    },
    [`screen and ${BREAKPOINTS.lg}`]: {
      fontSize: "51.5%",
    },
  },
});

globalStyle("body", {
  width: "1%",
  height: "110vh",
  fontFamily: theme.fonts.primary,
  WebkitFontSmoothing: "antialiased",
  backgroundColor: theme.colors.background,
  color: theme.colors.primaryForeground,
});
