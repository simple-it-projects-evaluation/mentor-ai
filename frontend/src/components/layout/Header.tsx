'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  TextField,
  InputAdornment,
} from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'transparent',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
      }}
    >
      <Toolbar sx={{ py: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              background: 'linear-gradient(135deg, #FAFAFA 0%, rgba(250, 250, 250, 0.85) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" sx={{ color: 'rgba(250, 250, 250, 0.5)', mt: 0.5 }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Search */}
          <TextField
            placeholder="Поиск..."
            size="small"
            sx={{
              width: 220,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.06)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'rgba(255, 107, 74, 0.5)',
                  borderWidth: 1,
                },
              },
              '& input': {
                fontSize: '0.875rem',
                '&::placeholder': {
                  color: 'rgba(250, 250, 250, 0.3)',
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'rgba(250, 250, 250, 0.3)', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Notifications */}
          <IconButton
            sx={{
              width: 40,
              height: 40,
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              transition: 'all 0.2s ease',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.06)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <Badge
              badgeContent={3}
              sx={{
                '& .MuiBadge-badge': {
                  background: 'linear-gradient(135deg, #FF6B4A 0%, #FF8A6A 100%)',
                  border: '2px solid #0A0A0B',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  minWidth: 18,
                  height: 18,
                },
              }}
            >
              <NotificationsNoneIcon sx={{ color: 'rgba(250, 250, 250, 0.6)', fontSize: 20 }} />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
