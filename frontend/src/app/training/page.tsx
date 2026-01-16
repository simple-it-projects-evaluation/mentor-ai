'use client';

import { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MainLayout from '@/components/layout/MainLayout';
import { trainingScenarios, trainingSessions, managers } from '@/mocks/data';

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return '#22C55E';
    case 'medium':
      return '#F59E0B';
    case 'hard':
      return '#EF4444';
    default:
      return '#F59E0B';
  }
}

function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case 'easy':
      return 'Легко';
    case 'medium':
      return 'Средне';
    case 'hard':
      return 'Сложно';
    default:
      return difficulty;
  }
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function TrainingPage() {
  const [selectedScenario, setSelectedScenario] = useState<(typeof trainingScenarios)[0] | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingTime, setTrainingTime] = useState(0);
  const [aiMessage, setAiMessage] = useState('');

  const aiMessages = [
    'Здравствуйте! Меня интересует ваш продукт, но цена кажется высокой...',
    'А почему у вас дороже, чем у конкурентов?',
    'Мне нужно подумать, это большие деньги для нас...',
    'Какие гарантии вы можете дать?',
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTraining) {
      interval = setInterval(() => {
        setTrainingTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTraining]);

  useEffect(() => {
    if (isTraining) {
      const messageIndex = Math.floor(trainingTime / 8) % aiMessages.length;
      setAiMessage(aiMessages[messageIndex]);
    }
  }, [trainingTime, isTraining]);

  const handleStartTraining = () => {
    setIsTraining(true);
    setTrainingTime(0);
    setAiMessage(aiMessages[0]);
  };

  const handleStopTraining = () => {
    setIsTraining(false);
    setTrainingTime(0);
    setSelectedScenario(null);
  };

  const needsTraining = managers.filter((m) => m.conversionRate < 40);

  return (
    <MainLayout title="AI-тренажёр" subtitle="Отработка навыков продаж с искусственным интеллектом">
      <Grid container spacing={3}>
        {/* Scenarios */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
              Сценарии тренировок
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(250, 250, 250, 0.5)' }}>
              Выберите сценарий для начала тренировки с AI
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {trainingScenarios.map((scenario, index) => {
              const diffColor = getDifficultyColor(scenario.difficulty);
              return (
                <Grid size={{ xs: 12, sm: 6 }} key={scenario.id}>
                  <Card
                    onClick={() => setSelectedScenario(scenario)}
                    sx={{
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      animation: 'fadeInUp 0.4s ease forwards',
                      animationDelay: `${index * 0.05}s`,
                      opacity: 0,
                      '@keyframes fadeInUp': {
                        from: { opacity: 0, transform: 'translateY(15px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                      },
                      '&:hover': {
                        transform: 'translateY(-4px) scale(1.01)',
                        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4)`,
                        '& .play-icon': {
                          opacity: 1,
                          transform: 'scale(1)',
                        },
                      },
                    }}
                  >
                    {/* Glow effect */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -50,
                        right: -50,
                        width: 150,
                        height: 150,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${diffColor}20 0%, transparent 70%)`,
                        filter: 'blur(20px)',
                      }}
                    />
                    <CardContent sx={{ p: 3, position: 'relative' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Chip
                          size="small"
                          label={getDifficultyLabel(scenario.difficulty)}
                          sx={{
                            background: `${diffColor}20`,
                            color: diffColor,
                            border: `1px solid ${diffColor}30`,
                            fontWeight: 600,
                            fontSize: '0.7rem',
                          }}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTimeIcon sx={{ fontSize: 14, color: 'rgba(250, 250, 250, 0.4)' }} />
                          <Typography variant="caption" sx={{ color: 'rgba(250, 250, 250, 0.4)' }}>
                            ~{scenario.duration} мин
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                        {scenario.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(250, 250, 250, 0.5)', mb: 2 }}>
                        {scenario.description}
                      </Typography>
                      {/* Play button overlay */}
                      <Box
                        className="play-icon"
                        sx={{
                          position: 'absolute',
                          bottom: 20,
                          right: 20,
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #FF6B4A 0%, #FF8A6A 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transform: 'scale(0.8)',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 4px 20px rgba(255, 107, 74, 0.4)',
                        }}
                      >
                        <PlayArrowIcon sx={{ color: 'white' }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Recent sessions */}
          <Card
            sx={{
              mb: 3,
              animation: 'fadeInUp 0.4s ease forwards',
              animationDelay: '0.3s',
              opacity: 0,
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(15px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <EmojiEventsIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
                <Typography variant="h6" fontWeight={600}>
                  Последние сессии
                </Typography>
              </Box>
              <List disablePadding>
                {trainingSessions.map((session, index) => (
                  <ListItem
                    key={session.id}
                    sx={{
                      px: 0,
                      py: 1.5,
                      borderBottom: index < trainingSessions.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          background: 'linear-gradient(135deg, rgba(255, 107, 74, 0.2), rgba(167, 139, 250, 0.2))',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          fontSize: '0.75rem',
                        }}
                      >
                        {session.managerName.charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight={500}>
                          {session.scenario}
                        </Typography>
                      }
                      secondary={
                        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Typography variant="caption" component="span" sx={{ color: 'rgba(250, 250, 250, 0.4)' }}>
                            {session.managerName}
                          </Typography>
                          <Chip
                            size="small"
                            label={`${session.score} баллов`}
                            sx={{
                              height: 18,
                              fontSize: '0.65rem',
                              background: session.score >= 70 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                              color: session.score >= 70 ? '#22C55E' : '#F59E0B',
                            }}
                          />
                        </Box>
                      }
                      secondaryTypographyProps={{ component: 'div' }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Needs training */}
          <Card
            sx={{
              animation: 'fadeInUp 0.4s ease forwards',
              animationDelay: '0.4s',
              opacity: 0,
              '@keyframes fadeInUp': {
                from: { opacity: 0, transform: 'translateY(15px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TrendingUpIcon sx={{ color: '#EF4444', fontSize: 20 }} />
                <Typography variant="h6" fontWeight={600}>
                  Требуют внимания
                </Typography>
              </Box>
              {needsTraining.map((manager) => (
                <Box
                  key={manager.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    mb: 1.5,
                    borderRadius: 3,
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.15)',
                    '&:last-child': { mb: 0 },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      background: 'rgba(239, 68, 68, 0.2)',
                      fontSize: '0.75rem',
                      color: '#EF4444',
                    }}
                  >
                    {manager.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>
                      {manager.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(250, 250, 250, 0.4)' }}>
                      Конверсия: {manager.conversionRate}%
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: 'rgba(255, 107, 74, 0.3)',
                      color: '#FF6B4A',
                      fontSize: '0.75rem',
                      '&:hover': {
                        borderColor: '#FF6B4A',
                        background: 'rgba(255, 107, 74, 0.1)',
                      },
                    }}
                  >
                    Назначить
                  </Button>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Training Dialog */}
      <Dialog
        open={!!selectedScenario}
        onClose={handleStopTraining}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(10, 10, 11, 0.98)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: 4,
            overflow: 'hidden',
          },
        }}
      >
        {selectedScenario && (
          <DialogContent sx={{ p: 0 }}>
            {/* Header */}
            <Box
              sx={{
                p: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  {selectedScenario.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(250, 250, 250, 0.4)' }}>
                  {selectedScenario.description}
                </Typography>
              </Box>
              <IconButton onClick={handleStopTraining} size="small">
                <CloseIcon sx={{ color: 'rgba(250, 250, 250, 0.5)' }} />
              </IconButton>
            </Box>

            {/* Content */}
            <Box sx={{ p: 4, textAlign: 'center' }}>
              {!isTraining ? (
                <>
                  {/* AI Avatar */}
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 3,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(255, 107, 74, 0.2), rgba(167, 139, 250, 0.2))',
                      border: '2px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <AutoAwesomeIcon sx={{ fontSize: 48, color: '#FF6B4A' }} />
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: -4,
                        borderRadius: '50%',
                        border: '2px dashed rgba(255, 107, 74, 0.3)',
                        animation: 'spin 20s linear infinite',
                        '@keyframes spin': {
                          to: { transform: 'rotate(360deg)' },
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    AI будет имитировать клиента
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(250, 250, 250, 0.5)', mb: 4 }}>
                    Отвечайте голосом, как в реальном звонке
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={handleStartTraining}
                    sx={{
                      px: 5,
                      py: 1.5,
                      fontSize: '1rem',
                    }}
                  >
                    Начать тренировку
                  </Button>
                </>
              ) : (
                <>
                  {/* Active training */}
                  <Box
                    sx={{
                      width: 140,
                      height: 140,
                      mx: 'auto',
                      mb: 3,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      animation: 'pulse 2s ease-in-out infinite',
                      '@keyframes pulse': {
                        '0%, 100%': { transform: 'scale(1)' },
                        '50%': { transform: 'scale(1.05)' },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 40px rgba(239, 68, 68, 0.4)',
                      }}
                    >
                      <MicIcon sx={{ fontSize: 44, color: 'white' }} />
                    </Box>
                    {/* Ripple effects */}
                    {[0, 1, 2].map((i) => (
                      <Box
                        key={i}
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '50%',
                          border: '2px solid rgba(239, 68, 68, 0.3)',
                          animation: 'ripple 2s ease-out infinite',
                          animationDelay: `${i * 0.6}s`,
                          '@keyframes ripple': {
                            '0%': { transform: 'scale(1)', opacity: 1 },
                            '100%': { transform: 'scale(1.5)', opacity: 0 },
                          },
                        }}
                      />
                    ))}
                  </Box>

                  {/* Timer */}
                  <Typography
                    variant="h2"
                    fontWeight={700}
                    sx={{
                      fontFamily: 'monospace',
                      mb: 2,
                      background: 'linear-gradient(135deg, #FAFAFA 0%, rgba(250, 250, 250, 0.7) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {formatDuration(trainingTime)}
                  </Typography>

                  {/* AI Message */}
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      mb: 4,
                      textAlign: 'left',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <AutoAwesomeIcon sx={{ fontSize: 16, color: '#A78BFA' }} />
                      <Typography variant="caption" sx={{ color: '#A78BFA', fontWeight: 600 }}>
                        AI-клиент
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: 'rgba(250, 250, 250, 0.8)' }}>
                      "{aiMessage}"
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    color="error"
                    size="large"
                    startIcon={<StopIcon />}
                    onClick={handleStopTraining}
                    sx={{
                      px: 5,
                      py: 1.5,
                      background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
                      boxShadow: '0 4px 20px rgba(239, 68, 68, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #DC2626 0%, #EF4444 100%)',
                      },
                    }}
                  >
                    Завершить
                  </Button>
                </>
              )}
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </MainLayout>
  );
}
