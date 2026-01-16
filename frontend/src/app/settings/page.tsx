'use client';

import { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Switch,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Avatar,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BusinessIcon from '@mui/icons-material/Business';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonIcon from '@mui/icons-material/Person';
import MainLayout from '@/components/layout/MainLayout';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    companyName: 'Моя компания',
    email: 'admin@company.ru',
    autoAnalysis: true,
    notifications: true,
    language: 'ru',
    aiVoice: 'female',
    analysisDepth: 'detailed',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <MainLayout title="Настройки" subtitle="Конфигурация системы и персональные настройки">
      {saved && (
        <Alert
          severity="success"
          sx={{
            mb: 3,
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            color: '#22C55E',
            '& .MuiAlert-icon': {
              color: '#22C55E',
            },
          }}
        >
          Настройки успешно сохранены
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              animation: 'fadeInUp 0.4s ease forwards',
              opacity: 0,
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(15px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    background: 'linear-gradient(135deg, #FF6B4A 0%, #A78BFA 100%)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    boxShadow: '0 8px 24px rgba(255, 107, 74, 0.3)',
                  }}
                >
                  АС
                </Avatar>
                <Box>
                  <Typography variant="h5" fontWeight={600}>
                    Алексей Смирнов
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(250, 250, 250, 0.5)', mb: 1 }}>
                    Руководитель отдела продаж
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: 'rgba(255, 255, 255, 0.12)',
                      color: 'rgba(250, 250, 250, 0.7)',
                      '&:hover': {
                        borderColor: 'rgba(255, 107, 74, 0.5)',
                        background: 'rgba(255, 107, 74, 0.08)',
                      },
                    }}
                  >
                    Изменить фото
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Company Settings */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              height: '100%',
              animation: 'fadeInUp 0.4s ease forwards',
              animationDelay: '0.1s',
              opacity: 0,
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(15px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <BusinessIcon sx={{ color: '#FF6B4A', fontSize: 20 }} />
                <Typography variant="h6" fontWeight={600}>
                  Компания
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <TextField
                  label="Название компании"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  fullWidth
                />
                <TextField
                  label="Email администратора"
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Язык интерфейса</InputLabel>
                  <Select
                    value={settings.language}
                    label="Язык интерфейса"
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  >
                    <MenuItem value="ru">Русский</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Settings */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              height: '100%',
              animation: 'fadeInUp 0.4s ease forwards',
              animationDelay: '0.15s',
              opacity: 0,
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(15px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <AutoAwesomeIcon sx={{ color: '#A78BFA', fontSize: 20 }} />
                <Typography variant="h6" fontWeight={600}>
                  Настройки AI
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <FormControl fullWidth>
                  <InputLabel>Голос AI-ассистента</InputLabel>
                  <Select
                    value={settings.aiVoice}
                    label="Голос AI-ассистента"
                    onChange={(e) => setSettings({ ...settings, aiVoice: e.target.value })}
                  >
                    <MenuItem value="female">Женский</MenuItem>
                    <MenuItem value="male">Мужской</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Глубина анализа</InputLabel>
                  <Select
                    value={settings.analysisDepth}
                    label="Глубина анализа"
                    onChange={(e) => setSettings({ ...settings, analysisDepth: e.target.value })}
                  >
                    <MenuItem value="basic">Базовый</MenuItem>
                    <MenuItem value="detailed">Детальный</MenuItem>
                    <MenuItem value="comprehensive">Комплексный</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              animation: 'fadeInUp 0.4s ease forwards',
              animationDelay: '0.2s',
              opacity: 0,
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(15px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <NotificationsActiveIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
                <Typography variant="h6" fontWeight={600}>
                  Уведомления и автоматизация
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  mb: 2,
                }}
              >
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Автоматический анализ звонков
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(250, 250, 250, 0.5)' }}>
                    Анализировать звонки сразу после завершения
                  </Typography>
                </Box>
                <Switch
                  checked={settings.autoAnalysis}
                  onChange={(e) => setSettings({ ...settings, autoAnalysis: e.target.checked })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#FF6B4A',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#FF6B4A',
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                }}
              >
                <Box>
                  <Typography variant="body1" fontWeight={500}>
                    Email-уведомления
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(250, 250, 250, 0.5)' }}>
                    Получать отчёты и оповещения на почту
                  </Typography>
                </Box>
                <Switch
                  checked={settings.notifications}
                  onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: '#FF6B4A',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: '#FF6B4A',
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Save Button */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{
                px: 4,
                py: 1.5,
                background: 'linear-gradient(135deg, #FF6B4A 0%, #FF8A6A 100%)',
                boxShadow: '0 4px 20px rgba(255, 107, 74, 0.3)',
                '&:hover': {
                  boxShadow: '0 6px 30px rgba(255, 107, 74, 0.4)',
                },
              }}
            >
              Сохранить настройки
            </Button>
          </Box>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
