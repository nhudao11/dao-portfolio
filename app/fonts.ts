import localFont from "next/font/local";

/*
 * Self-hosted fonts (OFL), Latin + Vietnamese subsets, split by unicode-range so
 * Vietnamese glyphs only download when needed. Files come from Fontsource.
 */

export const spaceGrotesk = localFont({
  src: [
    { path: "./fonts/space-grotesk-latin-wght-normal.woff2", weight: "300 700", style: "normal" },
  ],
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" }],
  variable: "--font-display-latin",
  display: "swap",
  adjustFontFallback: false,
});
export const spaceGroteskVi = localFont({
  src: [{ path: "./fonts/space-grotesk-vietnamese-wght-normal.woff2", weight: "300 700", style: "normal" }],
  declarations: [{ prop: "unicode-range", value: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB" }],
  variable: "--font-display-vi",
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});

export const inter = localFont({
  src: [{ path: "./fonts/inter-latin-wght-normal.woff2", weight: "100 900", style: "normal" }],
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" }],
  variable: "--font-sans-latin",
  display: "swap",
  adjustFontFallback: false,
});
export const interVi = localFont({
  src: [{ path: "./fonts/inter-vietnamese-wght-normal.woff2", weight: "100 900", style: "normal" }],
  declarations: [{ prop: "unicode-range", value: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB" }],
  variable: "--font-sans-vi",
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});

export const plexMono = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  declarations: [{ prop: "unicode-range", value: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" }],
  variable: "--font-mono-latin",
  display: "swap",
  adjustFontFallback: false,
});
export const plexMonoVi = localFont({
  src: [
    { path: "./fonts/ibm-plex-mono-vietnamese-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ibm-plex-mono-vietnamese-500-normal.woff2", weight: "500", style: "normal" },
  ],
  declarations: [{ prop: "unicode-range", value: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB" }],
  variable: "--font-mono-vi",
  display: "swap",
  adjustFontFallback: false,
  preload: false,
});

export const fontVariables = [spaceGrotesk, spaceGroteskVi, inter, interVi, plexMono, plexMonoVi].map((f) => f.variable).join(" ");
