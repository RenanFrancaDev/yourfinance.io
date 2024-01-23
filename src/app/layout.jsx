"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#299D91",
    },
    background: {
      default: "#F4F5F7",
    },
  },
  typography: {
    h1: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: "40px",
      fontWeight: "500",
      lineHeight: "32px",
      letterSpacing: "0.08em",
    },
    h2: {
      fontSize: "24px",
      fontEeight: "700",
      lineHeight: "28px",
      letterSpacing: "0em",
    },
  },
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
