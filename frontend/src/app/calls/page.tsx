'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
  IconButton,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogContent,
  Avatar,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CloseIcon from '@mui/icons-material/Close';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MainLayout from '@/components/layout/MainLayout';
import { calls, Call } from '@/mocks/data';

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getScoreGradient(score: number): string {
  if (score >= 70) return 'linear-gradient(90deg, #22C55E, #4ADE80)';
  if (score >= 50) return 'linear-gradient(90deg, #F59E0B, #FBBF24)';
  return 'linear-gradient(90deg, #EF4444, #F87171)';
}

function getScoreColor(score: number): string {
  if (score >= 70) return '#22C55E';
  if (score >= 50) return '#F59E0B';
  return '#EF4444';
}

export default function CallsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);

  const filteredCalls = calls.filter((call) => {
    const matchesSearch =
      call.managerName.toLowerCase().includes(search.toLowerCase()) ||
      call.clientName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || call.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout title="Звонки" subtitle="Анализ и мониторинг звонков менеджеров">
      <Card>
        <CardContent sx={{ p: 0 }}>
          {/* Filters */}
          <Box
            sx={{
              p: 3,
              display: 'flex',
              gap: 2,
              borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
            }}
          >
            <TextField
              placeholder="Поиск по менеджеру или клиенту..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(250, 250, 250, 0.3)', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel sx={{ color: 'rgba(250, 250, 250, 0.5)' }}>Статус</InputLabel>
              <Select
                value={statusFilter}
                label="Статус"
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.08)',
                  },
                }}
              >
                <MenuItem value="all">Все</MenuItem>
                <MenuItem value="success">Успешные</MenuItem>
                <MenuItem value="failed">Неуспешные</MenuItem>
                <MenuItem value="pending">В обработке</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Дата</TableCell>
                  <TableCell>Менеджер</TableCell>
                  <TableCell>Клиент</TableCell>
                  <TableCell>Длительность</TableCell>
                  <TableCell>Оценка AI</TableCell>
                  <TableCell>Проблемы</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell align="right">Действия</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCalls.map((call, index) => (
                  <TableRow
                    key={call.id}
                    sx={{
                      animation: 'fadeIn 0.3s ease forwards',
                      animationDelay: `${index * 0.03}s`,
                      opacity: 0,
                      '@keyframes fadeIn': { to: { opacity: 1 } },
                      '&:last-child td': { borderBottom: 0 },
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.02)',
                      },
                    }}
                    onClick={() => setSelectedCall(call)}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'rgba(250, 250, 250, 0.6)' }}>
                        {formatDate(call.date)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            fontSize: '0.75rem',
                            background: 'linear-gradient(135deg, rgba(255, 107, 74, 0.2), rgba(167, 139, 250, 0.2))',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          {call.managerName.charAt(0)}
                        </Avatar>
                        <Typography variant="body2" fontWeight={500}>
                          {call.managerName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: 'rgba(250, 250, 250, 0.7)' }}>
                        {call.clientName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <GraphicEqIcon sx={{ fontSize: 16, color: 'rgba(250, 250, 250, 0.3)' }} />
                        <Typography
                          variant="body2"
                          sx={{ color: 'rgba(250, 250, 250, 0.5)', fontFamily: 'monospace' }}
                        >
                          {formatDuration(call.duration)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ flexGrow: 1, maxWidth: 80 }}>
                          <LinearProgress
                            variant="determinate"
                            value={call.score}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: 'rgba(255, 255, 255, 0.06)',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 3,
                                background: getScoreGradient(call.score),
                              },
                            }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          sx={{ color: getScoreColor(call.score), minWidth: 24 }}
                        >
                          {call.score}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {call.issues.length > 0 ? (
                        <Chip
                          size="small"
                          label={`${call.issues.length}`}
                          sx={{
                            background: 'rgba(239, 68, 68, 0.15)',
                            color: '#EF4444',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            fontWeight: 600,
                            minWidth: 32,
                          }}
                        />
                      ) : (
                        <Chip
                          size="small"
                          label="0"
                          sx={{
                            background: 'rgba(34, 197, 94, 0.15)',
                            color: '#22C55E',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                            fontWeight: 600,
                            minWidth: 32,
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={
                          call.status === 'success'
                            ? 'Успешно'
                            : call.status === 'failed'
                              ? 'Неуспешно'
                              : 'В обработке'
                        }
                        sx={{
                          background:
                            call.status === 'success'
                              ? 'rgba(34, 197, 94, 0.15)'
                              : call.status === 'failed'
                                ? 'rgba(239, 68, 68, 0.15)'
                                : 'rgba(245, 158, 11, 0.15)',
                          color:
                            call.status === 'success'
                              ? '#22C55E'
                              : call.status === 'failed'
                                ? '#EF4444'
                                : '#F59E0B',
                          border: `1px solid ${
                            call.status === 'success'
                              ? 'rgba(34, 197, 94, 0.2)'
                              : call.status === 'failed'
                                ? 'rgba(239, 68, 68, 0.2)'
                                : 'rgba(245, 158, 11, 0.2)'
                          }`,
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        sx={{
                          width: 32,
                          height: 32,
                          background: 'rgba(255, 255, 255, 0.04)',
                          mr: 0.5,
                          '&:hover': { background: 'rgba(255, 107, 74, 0.15)' },
                        }}
                      >
                        <PlayArrowIcon sx={{ fontSize: 16, color: 'rgba(250, 250, 250, 0.6)' }} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCall(call);
                        }}
                        sx={{
                          width: 32,
                          height: 32,
                          background: 'rgba(255, 255, 255, 0.04)',
                          '&:hover': { background: 'rgba(167, 139, 250, 0.15)' },
                        }}
                      >
                        <VisibilityIcon sx={{ fontSize: 16, color: 'rgba(250, 250, 250, 0.6)' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog
        open={!!selectedCall}
        onClose={() => setSelectedCall(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(10, 10, 11, 0.98)',
            backdropFilter: 'blur(40px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: 4,
          },
        }}
      >
        {selectedCall && (
          <DialogContent sx={{ p: 0 }}>
            {/* Header */}
            <Box
              sx={{
                p: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>
                  {selectedCall.clientName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar
                    sx={{
                      width: 20,
                      height: 20,
                      fontSize: '0.6rem',
                      background: 'linear-gradient(135deg, rgba(255, 107, 74, 0.3), rgba(167, 139, 250, 0.3))',
                    }}
                  >
                    {selectedCall.managerName.charAt(0)}
                  </Avatar>
                  <Typography variant="caption" sx={{ color: 'rgba(250, 250, 250, 0.5)' }}>
                    {selectedCall.managerName} • {formatDate(selectedCall.date)}
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={() => setSelectedCall(null)} size="small">
                <CloseIcon sx={{ color: 'rgba(250, 250, 250, 0.5)' }} />
              </IconButton>
            </Box>

            {/* Score */}
            <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <Typography variant="caption" sx={{ color: 'rgba(250, 250, 250, 0.4)', mb: 1.5, display: 'block' }}>
                Оценка AI
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `conic-gradient(${getScoreColor(selectedCall.score)} ${selectedCall.score * 3.6}deg, rgba(255,255,255,0.06) 0deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      background: 'rgba(10, 10, 11, 0.95)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h5" fontWeight={700} sx={{ color: getScoreColor(selectedCall.score) }}>
                      {selectedCall.score}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={selectedCall.score}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: 'rgba(255, 255, 255, 0.06)',
                      mb: 1,
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        background: getScoreGradient(selectedCall.score),
                      },
                    }}
                  />
                  <Typography variant="caption" sx={{ color: 'rgba(250, 250, 250, 0.4)' }}>
                    {selectedCall.score >= 70
                      ? 'Отличный результат'
                      : selectedCall.score >= 50
                        ? 'Есть над чем поработать'
                        : 'Требуется внимание'}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Issues & Recommendations */}
            <Box sx={{ p: 3 }}>
              {selectedCall.issues.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <WarningAmberIcon sx={{ color: '#EF4444', fontSize: 18 }} />
                    <Typography variant="body2" fontWeight={600} sx={{ color: '#EF4444' }}>
                      Выявленные проблемы
                    </Typography>
                  </Box>
                  {selectedCall.issues.map((issue, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        mb: 1,
                        borderRadius: 2,
                        background: 'rgba(239, 68, 68, 0.08)',
                        border: '1px solid rgba(239, 68, 68, 0.15)',
                      }}
                    >
                      <Typography variant="body2" sx={{ color: 'rgba(250, 250, 250, 0.8)' }}>
                        {issue}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {selectedCall.recommendations.length > 0 && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <LightbulbOutlinedIcon sx={{ color: '#A78BFA', fontSize: 18 }} />
                    <Typography variant="body2" fontWeight={600} sx={{ color: '#A78BFA' }}>
                      Рекомендации
                    </Typography>
                  </Box>
                  {selectedCall.recommendations.map((rec, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 2,
                        mb: 1,
                        borderRadius: 2,
                        background: 'rgba(167, 139, 250, 0.08)',
                        border: '1px solid rgba(167, 139, 250, 0.15)',
                      }}
                    >
                      <Typography variant="body2" sx={{ color: 'rgba(250, 250, 250, 0.8)' }}>
                        {rec}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {selectedCall.issues.length === 0 && selectedCall.recommendations.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="body2" sx={{ color: '#22C55E' }}>
                    Отличный звонок без замечаний!
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Actions */}
            <Box
              sx={{
                p: 3,
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                startIcon={<PlayArrowIcon />}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                  color: 'rgba(250, 250, 250, 0.7)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.04)',
                  },
                }}
              >
                Прослушать
              </Button>
              {selectedCall.issues.length > 0 && (
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #FF6B4A 0%, #FF8A6A 100%)',
                  }}
                >
                  Назначить тренировку
                </Button>
              )}
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </MainLayout>
  );
}
