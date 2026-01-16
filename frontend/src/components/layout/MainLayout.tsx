'use client';

import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function MainLayout({ children, title, subtitle }: MainLayoutProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        background: '#0A0A0B',
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative gradient orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 107, 74, 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -100,
            left: '30%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.05) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />

        <Header title={title} subtitle={subtitle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            position: 'relative',
            zIndex: 1,
            animation: 'fadeIn 0.4s ease',
            '@keyframes fadeIn': {
              from: {
                opacity: 0,
                transform: 'translateY(8px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
