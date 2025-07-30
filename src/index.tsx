import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {createTheme, StyledEngineProvider, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import SApp from "./components/SApp";
import reportWebVitals from './reportWebVitals';
import './index.css';
// import {huHU} from '@mui/x-date-pickers/locales';
// import {LocalizationProvider} from "@mui/x-date-pickers-pro";

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 580,
      md: 800,
      lg: 1200,
      xl: 2280,
    }
  },
  palette: {
    text: {
      primary: '#424242',
      secondary: '#70757A',
      disabled: '#3c404361',
    },
    primary: {
      light: '#E2F6FE',
      main: '#21a2e6',
      dark: '#21a2e6',
    },
    secondary: {
      light: '#E2F6FE',
      main: '#b5e7fc',
      dark: '#21a2e6',
    },
    info: {
      light: '#9ed8ff',
      main: '#7ecffe',
      dark: '#4fb5eb',
    },
    success: {
      light: '#AEEA4B',
      main: '#98D316',
      dark: '#7EA500',
    },
    error: {
      light: '#f62640',
      main: '#e6213f',
      dark: '#d41438',
    },
    warning: {
      light: '#E7DB28',
      main: '#E39A0A',
      dark: '#DE7200',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  },
  shape: {
    borderRadius: 8
  },
  mixins: {
    toolbar: {
      minHeight: 64
    }
  },
})

theme.typography.body1 = {
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary,
  fontSize: theme.typography.pxToRem(14),
  lineHeight: theme.typography.pxToRem(20),
  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(15),
  }
}
theme.typography.body2 = {
  color: theme.palette.text.primary,
  fontSize: theme.typography.pxToRem(12),
  lineHeight: theme.typography.pxToRem(20),
  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(13),
  }
}

theme.typography.subtitle1 = {
  color: theme.palette.text.secondary,
  fontSize: theme.typography.pxToRem(16),
  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(20),
  }
}
theme.typography.subtitle2 = {
  color: theme.palette.text.secondary,
  fontSize: theme.typography.pxToRem(14),
  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(15),
  }
}

theme.typography.h1 = {
  color: theme.palette.grey["900"],
  fontSize: theme.typography.pxToRem(28),
  lineHeight: theme.typography.pxToRem(38),
  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(48),
    lineHeight: theme.typography.pxToRem(44),
  }
}
theme.typography.h2 = {
  color: theme.palette.grey["900"],
  fontSize: theme.typography.pxToRem(24),
  lineHeight: theme.typography.pxToRem(33),
}
theme.typography.h3 = {
  color: theme.palette.grey["900"],
  fontSize: theme.typography.pxToRem(20),
  lineHeight: theme.typography.pxToRem(24),
  [theme.breakpoints.up('md')]: {
    lineHeight: theme.typography.pxToRem(28),
  }
}
theme.typography.h4 = {
  color: theme.palette.grey["900"],
  fontSize: theme.typography.pxToRem(16),
  lineHeight: theme.typography.pxToRem(20),
  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(20),
    lineHeight: theme.typography.pxToRem(28),
  }
}
theme.typography.h5 = {
  color: theme.palette.grey["900"],
  fontSize: theme.typography.pxToRem(16),
  lineHeight: theme.typography.pxToRem(20),
  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(18),
  }
}
theme.typography.h6 = {
  color: theme.palette.text.primary,
  fontSize: theme.typography.pxToRem(15),
  [theme.breakpoints.up('md')]: {
    fontSize: theme.typography.pxToRem(16),
  }
}

theme.components = {
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        h1: 'div',
        h2: 'div',
        h3: 'div',
        h4: 'div',
        h5: 'div',
        h6: 'div',
        subtitle1: 'div',
        subtitle2: 'div',
        body1: 'span',
        body2: 'span',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ownerState}) => ({
        ...({
          borderRadius: "100px",
          textTransform: "none",
          paddingLeft: theme.typography.pxToRem(16),
          paddingRight: theme.typography.pxToRem(16),
          fontSize: theme.typography.pxToRem(15),
          lineHeight: theme.typography.pxToRem(18),
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }),
        ...(ownerState.variant !== 'outlined' && ownerState.size === 'small' && {
          paddingTop: theme.typography.pxToRem(7),
          paddingBottom: theme.typography.pxToRem(7),
        }),
        ...(ownerState.variant !== 'outlined' && ownerState.size === 'medium' && {
          paddingTop: theme.typography.pxToRem(9),
          paddingBottom: theme.typography.pxToRem(9),
        }),
        ...(ownerState.variant !== 'outlined' && ownerState.size === 'large' && {
          paddingTop: theme.typography.pxToRem(11),
          paddingBottom: theme.typography.pxToRem(11),
        }),
        ...(ownerState.variant === 'outlined' && ownerState.size === 'small' && {
          paddingTop: theme.typography.pxToRem(6),
          paddingBottom: theme.typography.pxToRem(6),
        }),
        ...(ownerState.variant === 'outlined' && ownerState.size === 'medium' && {
          paddingTop: theme.typography.pxToRem(8),
          paddingBottom: theme.typography.pxToRem(8),
        }),
        ...(ownerState.variant === 'outlined' && ownerState.size === 'large' && {
          paddingTop: theme.typography.pxToRem(10),
          paddingBottom: theme.typography.pxToRem(10),
        }),
      })
    }
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: theme.typography.pxToRem(theme.shape.borderRadius)
      }
    }
  },
  MuiPopover: {
    defaultProps: {
      container: rootElement,
    }
  },
  MuiPopper: {
    defaultProps: {
      container: rootElement,
    }
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        height: theme.typography.pxToRem(48),
        padding: 0
      },
    }
  },
  // MuiInputLabel: {
  //   styleOverrides: {
  //     root: {
  //       lineHeight: 1,
  //       paddingTop: 0,
  //       height: 'auto',
  //     }
  //   }
  // }
}

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/*<LocalizationProvider localeText={huHU.components.MuiLocalizationProvider.defaultProps.localeText}>*/}
          <SApp />
        {/*</LocalizationProvider>*/}
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);

reportWebVitals();
