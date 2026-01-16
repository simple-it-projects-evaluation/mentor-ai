'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Avatar,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PhoneIcon from '@mui/icons-material/Phone';
import FolderIcon from '@mui/icons-material/Folder';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 280;

const menuItems = [
  { text: 'Дашборд', icon: <DashboardIcon />, path: '/' },
  { text: 'Звонки', icon: <PhoneIcon />, path: '/calls' },
  { text: 'Материалы', icon: <FolderIcon />, path: '/materials' },
  { text: 'Тренажёр', icon: <SchoolIcon />, path: '/training' },
];

const bottomMenuItems = [
  { text: 'Настройки', icon: <SettingsIcon />, path: '/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          border: 'none',
          borderRight: '1px solid rgba(255, 255, 255, 0.04)',
          background: 'rgba(10, 10, 11, 0.8)',
          backdropFilter: 'blur(20px)',
        },
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2.5,
            background: 'linear-gradient(135deg, #FF6B4A 0%, #A78BFA 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(255, 107, 74, 0.3)',
          }}
        >
          <Typography variant="h6" fontWeight={800} color="white">
            S
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              background: 'linear-gradient(135deg, #FAFAFA 0%, rgba(250, 250, 250, 0.8) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Sales AI
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(250, 250, 250, 0.4)' }}>
            AI-тренажёр
          </Typography>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', px: 2 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(250, 250, 250, 0.3)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 600,
            px: 1.5,
            mb: 1,
            mt: 2,
          }}
        >
          Меню
        </Typography>
        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  mb: 0.5,
                  animation: 'fadeInUp 0.4s ease forwards',
                  animationDelay: `${index * 0.05}s`,
                  opacity: 0,
                  '@keyframes fadeInUp': {
                    from: {
                      opacity: 0,
                      transform: 'translateY(10px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                <ListItemButton
                  component={Link}
                  href={item.path}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    px: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    ...(isActive && {
                      background: 'rgba(255, 107, 74, 0.12)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 3,
                        height: 24,
                        borderRadius: 2,
                        background: 'linear-gradient(180deg, #FF6B4A 0%, #FF8A6A 100%)',
                      },
                    }),
                    '&:hover': {
                      background: isActive
                        ? 'rgba(255, 107, 74, 0.15)'
                        : 'rgba(255, 255, 255, 0.04)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? '#FF6B4A' : 'rgba(250, 250, 250, 0.5)',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#FAFAFA' : 'rgba(250, 250, 250, 0.7)',
                    }}
                  />
                  {isActive && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#FF6B4A',
                        boxShadow: '0 0 10px rgba(255, 107, 74, 0.5)',
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {/* Bottom section */}
        <Box sx={{ pb: 2 }}>
          <Box
            sx={{
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
              mb: 2,
            }}
          />
          {bottomMenuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.path}
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    px: 2,
                    transition: 'all 0.2s ease',
                    ...(isActive && {
                      background: 'rgba(255, 107, 74, 0.12)',
                    }),
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.04)',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 40,
                      color: isActive ? '#FF6B4A' : 'rgba(250, 250, 250, 0.5)',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      color: 'rgba(250, 250, 250, 0.7)',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}

          {/* User section */}
          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.04)',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 100%)',
                fontSize: '0.875rem',
              }}
            >
              АС
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" fontWeight={600} noWrap>
                Алексей Смирнов
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: 'rgba(250, 250, 250, 0.4)' }}
                noWrap
              >
                Руководитель
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
