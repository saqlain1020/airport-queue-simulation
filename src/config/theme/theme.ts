import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// declare module "@mui/material/Button" {
//   interface ButtonPropsVariantOverrides {
//     containedLeft: true;
//     containedRight: true;
//   }
// }

declare module "@mui/material/styles" {
  interface Theme {
    boxShadows: string[];
  }
  //   // allow configuration using `createTheme`
  interface ThemeOptions {
    boxShadows: string[];
  }
}

let lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "'Inter custom', sans-serif",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "rgba(100, 100, 111, 0.1) 0px 7px 29px 0px",
          borderRadius: 10,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          // boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
          borderRadius: 10,
          "& fieldset": {
            borderWidth: "0px !important",
          },
          "& input": {
            fontWeight: 600,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          paddingTop: 5,
          paddingBottom: 5,
        },
      },
    },
  },
  boxShadows: ["0px 5px 16px rgba(25,25,50,0.1)"],
});

lightTheme = responsiveFontSizes(lightTheme);

let darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary:{
      // main:"rgb(80,80,200)",
      main:"#EFA618",
    },
    secondary:{
      main: "#1B469E"
    },
    text:{
      // primary:"rgb(180,180,180)"
      primary:"rgb(200,200,200)"
    },
    background:{
      default:"#081C30",
      paper:"#040C14",
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "'Raleway', sans-serif",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          // boxShadow: "rgba(255, 255, 255, 0.05) 0px 6px 24px 0px, rgba(255, 255, 255, 0.08) 0px 0px 0px 1px",
          // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
          borderRadius: 10,
          "& fieldset": {
            borderWidth: "0px !important",
          },
          "& input": {
            fontWeight: 600,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          paddingTop: 5,
          paddingBottom: 5,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          // boxShadow: "rgba(255, 255, 200, 0.1) 0px 7px 29px 0px",
          background:"#040C14",
          borderRadius: 10,
        },
        
      },
      variants:[
        {
          props:{elevation:2},
          style:{
            background:"#121B25"
          }
        }
      ]
    },
    MuiAppBar:{
      styleOverrides:{
        root:{
          background:"transparent",
          // filter: "blur(10px)",
          backdropFilter: "blur(10px) brightness(0.8)",
        }
      }
    }
  },
  boxShadows: ["0px 10px 25px rgba(255,255,255,0.1)"],
});

darkTheme = responsiveFontSizes(darkTheme);

export { lightTheme ,darkTheme};
