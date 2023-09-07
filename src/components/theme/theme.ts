import { createTheme } from '@mui/material';
import { PaletteColorOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: PaletteColorOptions;
  }
  interface PaletteOptions {
    tertiary: PaletteColorOptions;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

declare module '@mui/material/InputBase' {
  interface InputBasePropsColorOverrides {
    tertiary: true;
  }
}

export const breakpointsTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 400,
      md: 600,
      lg: 800,
      xl: 1280,
    },
  },
});

const { palette } = createTheme();

export const theme = createTheme({
  palette: {
    primary: {
      main: '#111',
      dark: '#000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#e31e25',
      contrastText: '#fff',
    },
    tertiary: palette.augmentColor({
      color: {
        main: '#fff',
        contrastText: '#000',
      },
    }),
  },
  spacing: 4,
  typography: {
    h1: {
      fontSize: 40,
      fontWeight: 600,
      color: '#fff',
    },
    h2: {
      fontSize: 32,
      fontWeight: 700,
      color: '#fff',
    },
    h3: {
      fontSize: 28,
      fontWeight: 700,
      color: '#fff',
    },
    h4: {
      fontSize: 24,
      fontWeight: 700,
      color: '#fff',
    },
    h5: {
      fontSize: 20,
      fontWeight: 700,
      color: '#fff',
    },
    h6: {
      fontSize: 18,
      fontWeight: 700,
      color: '#fff',
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      color: '#fff',
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
      color: '#fff',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          backgroundColor: '#111',
          padding: '32px 16px',
          '@media(min-width: 400px)': {
            padding: '32px',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#fff',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: '#111',
        },
      },
    },
    MuiImageListItemBar: {
      styleOverrides: {
        title: {
          fontSize: 18,
          fontWeight: 700,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#111',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          alignItems: 'flex-start',
          color: '#fff',
        },
      },
    },
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: '#e31e25',
    //       color: '#fff',
    //     },
    //   },
    // },
    MuiTextField: {
      defaultProps: {
        color: 'primary',
        inputProps: {
          style: {
            color: '#fff',
          },
        },
      },
      styleOverrides: {
        root: {
          '& .Mui-focused': {
            color: '#fff',
          },
          '& .MuiInputBase-input': {
            color: '#fff',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#fff',
          },
          '& .MuiOutlinedInput-root fieldset': {
            borderColor: '#fff',
          },
          '& .MuiOutlinedInput-root:hover fieldset': {
            borderColor: '#fff',
          },
          '& .MuiOutlinedInput-root.Mui-focused fieldset': {
            borderColor: '#fff',
          },
          '& .MuiOutlinedInput-root.Mui-hovered fieldset': {
            borderColor: '#fff',
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#fff',
          '& svg': {
            color: '#fff',
          },
          '& fieldset': {
            borderColor: '#fff !important',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: '#fff',
          backgroundColor: '#111',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#000',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#fff !important',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        container: {
          '& .MuiPaper-root': {
            color: '#fff',
            backgroundColor: '#111',
            '& .MuiTypography-root': {
              color: '#fff',
            },
            '& .MuiClock-pin': {
              backgroundColor: '#fff',
            },
            '& .MuiClockPointer-root': {
              backgroundColor: '#fff',
            },
            '& .MuiClockPointer-thumb': {
              backgroundColor: '#fff',
              borderColor: '#fff',
            },
            '& .MuiClockNumber-root': {
              color: '#fff',
            },
            '& .MuiClockNumber-root.Mui-selected': {
              color: '#000',
            },
            '& .MuiButtonBase-root': {
              color: '#fff',
            },
          },
        },
      },
    },
  },
});
