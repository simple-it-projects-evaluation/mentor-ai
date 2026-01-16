'use client';

import { createTheme } from '@mui/material/styles';

// Premium dark theme with warm coral accent
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6B4A',
      light: '#FF8A6A',
      dark: '#E55A3A',
    },
    secondary: {
      main: '#A78BFA',
      light: '#C4B5FD',
      dark: '#8B5CF6',
    },
    background: {
      default: '#0A0A0B',
      paper: 'rgba(18, 18, 20, 0.8)',
    },
    text: {
      primary: '#FAFAFA',
      secondary: 'rgba(250, 250, 250, 0.6)',
    },
    divider: 'rgba(255, 255, 255, 0.06)',
    success: {
      main: '#22C55E',
      light: '#4ADE80',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
    },
  },
  typography: {
    fontFamily: '"Satoshi", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '@font-face': {
          fontFamily: 'Satoshi',
          src: 'url(https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap)',
        },
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 107, 74, 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 100% 0%, rgba(167, 139, 250, 0.1), transparent)
          `,
          backgroundAttachment: 'fixed',
        },
        '*::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '*::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '10px 20px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        contained: {
          background: 'linear-gradient(135deg, #FF6B4A 0%, #FF8A6A 100%)',
          boxShadow: '0 4px 20px rgba(255, 107, 74, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #E55A3A 0%, #FF6B4A 100%)',
            boxShadow: '0 6px 30px rgba(255, 107, 74, 0.4)',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.12)',
          '&:hover': {
            borderColor: 'rgba(255, 107, 74, 0.5)',
            backgroundColor: 'rgba(255, 107, 74, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(18, 18, 20, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 8,
        },
        filled: {
          background: 'rgba(255, 255, 255, 0.08)',
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.08)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.15)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF6B4A',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.04)',
        },
        head: {
          fontWeight: 600,
          color: 'rgba(250, 250, 250, 0.6)',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'rgba(18, 18, 20, 0.95)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: 24,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'rgba(10, 10, 11, 0.95)',
          backdropFilter: 'blur(20px)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'all 0.2s ease',
        },
      },
    },
  },
});

export default theme;
