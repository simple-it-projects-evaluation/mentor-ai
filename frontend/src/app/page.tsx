'use client';

import {
  Grid,
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
  Avatar,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MainLayout from '@/components/layout/MainLayout';
import { mvpReport, lostClients, salesStages } from '@/mocks/data';

// Цветовая схема из ТЗ (страница 3)
const colors = {
  primary: '#14B8A6', // Teal/Mint
  primaryLight: '#5EEAD4',
  primaryDark: '#0D9488',
  accent: '#FBBF24', // Yellow/Gold
  success: '#22C55E',
  danger: '#EF4444',
  warning: '#F59E0B',
  bgCard: 'rgba(255, 255, 255, 0.03)',
  bgCardHover: 'rgba(255, 255, 255, 0.06)',
  textPrimary: '#F8FAFC',
  textSecondary: 'rgba(248, 250, 252, 0.6)',
  textMuted: 'rgba(248, 250, 252, 0.4)',
  border: 'rgba(255, 255, 255, 0.08)',
};

// Форматирование денег
function formatMoney(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)} млн ₽`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)} тыс ₽`;
  }
  return `${value} ₽`;
}

// Форматирование даты
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
  });
}

// Получение названия этапа
function getStageName(stage: number): string {
  return salesStages.find((s) => s.id === stage)?.name || '';
}

export default function DashboardPage() {
  const pendingClients = lostClients.filter((c) => c.recommendationStatus === 'pending');

  // Расчёт денег по формуле из ТЗ
  const conversionIncome = (mvpReport.conversionDiff / 100) * mvpReport.totalLeads * mvpReport.avgCheck;
  const returnedIncome = lostClients
    .filter((c) => c.returnedCheck)
    .reduce((sum, c) => sum + (c.returnedCheck || 0), 0);
  const totalMoney = conversionIncome + returnedIncome;

  return (
    <MainLayout title="Главный отчёт" subtitle="Business Analytics">
      <Grid container spacing={3}>
        {/* === TOP METRICS ROW === */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* Текущая конверсия */}
            <Card
              sx={{
                flex: '1 1 180px',
                minWidth: 180,
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                animation: 'fadeIn 0.4s ease forwards',
                opacity: 0,
                '@keyframes fadeIn': {
                  to: { opacity: 1 },
                },
              }}
            >
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Typography variant="caption" sx={{ color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.65rem' }}>
                  Текущая конверсия
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 1 }}>
                  <Typography variant="h4" fontWeight={700} sx={{ color: colors.primary, fontFamily: 'monospace' }}>
                    {mvpReport.currentConversion}%
                  </Typography>
                  <Chip
                    size="small"
                    icon={<TrendingUpIcon sx={{ fontSize: 12 }} />}
                    label={`+${mvpReport.conversionDiff}%`}
                    sx={{
                      height: 20,
                      fontSize: '0.65rem',
                      background: 'rgba(20, 184, 166, 0.15)',
                      color: colors.primary,
                      border: 'none',
                      '& .MuiChip-icon': { color: colors.primary },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>

            {/* Прошлый месяц */}
            <Card
              sx={{
                flex: '1 1 180px',
                minWidth: 180,
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                animation: 'fadeIn 0.4s ease forwards',
                animationDelay: '0.05s',
                opacity: 0,
              }}
            >
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Typography variant="caption" sx={{ color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.65rem' }}>
                  Прошлый месяц
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 1 }}>
                  <Typography variant="h4" fontWeight={700} sx={{ color: colors.textSecondary, fontFamily: 'monospace' }}>
                    {mvpReport.lastMonthConversion}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Разница */}
            <Card
              sx={{
                flex: '1 1 180px',
                minWidth: 180,
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                animation: 'fadeIn 0.4s ease forwards',
                animationDelay: '0.1s',
                opacity: 0,
              }}
            >
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Typography variant="caption" sx={{ color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.65rem' }}>
                  Разница
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 1 }}>
                  <Typography variant="h4" fontWeight={700} sx={{ color: colors.success, fontFamily: 'monospace' }}>
                    +{mvpReport.conversionDiff}%
                  </Typography>
                  <TrendingUpIcon sx={{ color: colors.success, fontSize: 20 }} />
                </Box>
              </CardContent>
            </Card>

            {/* Возвращено клиентов */}
            <Card
              sx={{
                flex: '1 1 180px',
                minWidth: 180,
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                animation: 'fadeIn 0.4s ease forwards',
                animationDelay: '0.15s',
                opacity: 0,
              }}
            >
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Typography variant="caption" sx={{ color: colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.65rem' }}>
                  Возвращено
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 1 }}>
                  <Typography variant="h4" fontWeight={700} sx={{ color: colors.accent, fontFamily: 'monospace' }}>
                    {mvpReport.returnedClients}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.textMuted }}>
                    из {mvpReport.returnedClientsTarget}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Принесено системой */}
            <Card
              sx={{
                flex: '1 1 200px',
                minWidth: 200,
                background: `linear-gradient(135deg, rgba(20, 184, 166, 0.15) 0%, rgba(20, 184, 166, 0.05) 100%)`,
                border: `1px solid ${colors.primary}40`,
                animation: 'fadeIn 0.4s ease forwards',
                animationDelay: '0.2s',
                opacity: 0,
              }}
            >
              <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                <Typography variant="caption" sx={{ color: colors.primary, textTransform: 'uppercase', letterSpacing: 1, fontSize: '0.65rem' }}>
                  Принесено системой
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mt: 1 }}>
                  <Typography variant="h4" fontWeight={700} sx={{ color: colors.primary, fontFamily: 'monospace' }}>
                    {formatMoney(totalMoney)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* === MAIN CHART - Convertin Point style === */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card
            sx={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              animation: 'fadeIn 0.4s ease forwards',
              animationDelay: '0.25s',
              opacity: 0,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" fontWeight={600} sx={{ color: colors.textPrimary }}>
                    Convertin Point
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.textMuted }}>
                    Динамика конверсии по месяцам
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: colors.primary }}>
                  204 Lorest
                </Typography>
              </Box>

              {/* Area Chart Style */}
              <Box sx={{ position: 'relative', height: 220, mt: 2 }}>
                {/* Y-axis labels */}
                <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 30, width: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {[50, 40, 30, 20, 10, 0].map((val) => (
                    <Typography key={val} variant="caption" sx={{ color: colors.textMuted, fontSize: '0.6rem' }}>
                      {val}%
                    </Typography>
                  ))}
                </Box>

                {/* Chart area */}
                <Box sx={{ ml: 5, height: '100%', position: 'relative' }}>
                  {/* Grid lines */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: `${i * 20}%`,
                        height: 1,
                        background: colors.border,
                      }}
                    />
                  ))}

                  {/* Area fill with gradient */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 'calc(100% - 30px)', gap: 0, position: 'relative' }}>
                    <svg width="100%" height="100%" style={{ position: 'absolute', left: 0, top: 0 }}>
                      <defs>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.4" />
                          <stop offset="100%" stopColor={colors.primary} stopOpacity="0.05" />
                        </linearGradient>
                      </defs>
                      <path
                        d={`M 0 ${190 - (mvpReport.monthlyConversion[0].value / 50) * 190}
                            Q 80 ${190 - (mvpReport.monthlyConversion[1].value / 50) * 190 - 20}
                              160 ${190 - (mvpReport.monthlyConversion[2].value / 50) * 190}
                            T 320 ${190 - (mvpReport.monthlyConversion[3].value / 50) * 190}
                            T 480 ${190 - (mvpReport.monthlyConversion[4].value / 50) * 190}
                            T 640 ${190 - (mvpReport.monthlyConversion[5].value / 50) * 190}
                            L 640 190 L 0 190 Z`}
                        fill="url(#areaGradient)"
                      />
                      <path
                        d={`M 0 ${190 - (mvpReport.monthlyConversion[0].value / 50) * 190}
                            Q 80 ${190 - (mvpReport.monthlyConversion[1].value / 50) * 190 - 20}
                              160 ${190 - (mvpReport.monthlyConversion[2].value / 50) * 190}
                            T 320 ${190 - (mvpReport.monthlyConversion[3].value / 50) * 190}
                            T 480 ${190 - (mvpReport.monthlyConversion[4].value / 50) * 190}
                            T 640 ${190 - (mvpReport.monthlyConversion[5].value / 50) * 190}`}
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth="2"
                      />
                    </svg>
                  </Box>

                  {/* X-axis labels */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                    {mvpReport.monthlyConversion.map((item, index) => (
                      <Typography
                        key={item.month}
                        variant="caption"
                        sx={{
                          color: index === mvpReport.monthlyConversion.length - 1 ? colors.primary : colors.textMuted,
                          fontSize: '0.65rem',
                        }}
                      >
                        {item.month}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* === SIDE PANEL - Circular + Stats === */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card
            sx={{
              height: '100%',
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              animation: 'fadeIn 0.4s ease forwards',
              animationDelay: '0.3s',
              opacity: 0,
            }}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Circular Progress */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `conic-gradient(${colors.primary} 0deg, ${colors.primary} ${(mvpReport.returnedClients / mvpReport.returnedClientsTarget) * 360}deg, ${colors.border} ${(mvpReport.returnedClients / mvpReport.returnedClientsTarget) * 360}deg, ${colors.border} 360deg)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: '#0F172A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h5" fontWeight={700} sx={{ color: colors.primary }}>
                      {mvpReport.returnedClients}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: colors.textMuted, mb: 0.5 }}>
                    Converts Assist
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.textMuted }}>
                    = 15.0%
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.textMuted, display: 'block' }}>
                    LOCTM
                  </Typography>
                </Box>
              </Box>

              {/* Stats Bars */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: colors.textMuted }}>Content DRK</Typography>
                    <Typography variant="caption" sx={{ color: colors.accent }}>{formatMoney(conversionIncome)}</Typography>
                  </Box>
                  <Box sx={{ height: 24, background: colors.border, borderRadius: 1, overflow: 'hidden', display: 'flex', gap: 0.5 }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Box key={i} sx={{ flex: 1, background: colors.accent, opacity: 0.3 + i * 0.14 }} />
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: colors.textMuted }}>Growth CSI</Typography>
                    <Typography variant="caption" sx={{ color: colors.primary }}>{formatMoney(returnedIncome)}</Typography>
                  </Box>
                  <Box sx={{ height: 24, background: colors.border, borderRadius: 1, overflow: 'hidden', display: 'flex', gap: 0.5 }}>
                    {[1, 2, 3].map((i) => (
                      <Box key={i} sx={{ flex: 1, background: colors.primary, opacity: 0.3 + i * 0.23 }} />
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography variant="caption" sx={{ color: colors.textMuted }}>Total Rent</Typography>
                    <Typography variant="caption" fontWeight={600} sx={{ color: colors.textPrimary }}>{formatMoney(totalMoney)}</Typography>
                  </Box>
                  <Box sx={{ height: 24, background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`, borderRadius: 1 }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* === LOST CLIENTS TABLE === */}
        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              animation: 'fadeIn 0.4s ease forwards',
              animationDelay: '0.35s',
              opacity: 0,
            }}
          >
            <CardContent sx={{ p: 0 }}>
              <Box
                sx={{
                  p: 3,
                  pb: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: `1px solid ${colors.border}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(239, 68, 68, 0.15)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                    }}
                  >
                    <PeopleAltIcon sx={{ color: colors.danger, fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight={600} sx={{ color: colors.textPrimary }}>
                      Потерянные клиенты
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.textMuted }}>
                      Ожидают действий менеджеров
                    </Typography>
                  </Box>
                </Box>
                <Chip
                  label={`${pendingClients.length} ожидают`}
                  size="small"
                  sx={{
                    background: 'rgba(251, 191, 36, 0.15)',
                    color: colors.accent,
                    border: `1px solid ${colors.accent}30`,
                    fontWeight: 600,
                  }}
                />
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: colors.textMuted, borderColor: colors.border }}>Клиент</TableCell>
                      <TableCell sx={{ color: colors.textMuted, borderColor: colors.border }}>Менеджер</TableCell>
                      <TableCell sx={{ color: colors.textMuted, borderColor: colors.border }}>Этап</TableCell>
                      <TableCell sx={{ color: colors.textMuted, borderColor: colors.border }}>Причина</TableCell>
                      <TableCell sx={{ color: colors.textMuted, borderColor: colors.border }}>Рекомендация AI</TableCell>
                      <TableCell sx={{ color: colors.textMuted, borderColor: colors.border }}>Статус</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {lostClients.slice(0, 5).map((client, index) => (
                      <TableRow
                        key={client.id}
                        sx={{
                          animation: 'fadeIn 0.3s ease forwards',
                          animationDelay: `${0.4 + index * 0.05}s`,
                          opacity: 0,
                          '&:last-child td': { borderBottom: 0 },
                          cursor: 'pointer',
                          '&:hover': { background: colors.bgCardHover },
                        }}
                      >
                        <TableCell sx={{ borderColor: colors.border }}>
                          <Typography variant="body2" fontWeight={500} sx={{ color: colors.textPrimary }}>
                            {client.clientName}
                          </Typography>
                          <Typography variant="caption" sx={{ color: colors.textMuted }}>
                            {formatDate(client.lostAt)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderColor: colors.border }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar
                              sx={{
                                width: 28,
                                height: 28,
                                fontSize: '0.7rem',
                                background: `linear-gradient(135deg, ${colors.primary}40, ${colors.accent}40)`,
                                border: `1px solid ${colors.border}`,
                              }}
                            >
                              {client.managerName.charAt(0)}
                            </Avatar>
                            <Typography variant="body2" sx={{ color: colors.textSecondary }}>{client.managerName}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ borderColor: colors.border }}>
                          <Chip
                            size="small"
                            label={`${client.lostStage}. ${getStageName(client.lostStage)}`}
                            sx={{
                              background: `${colors.primary}20`,
                              color: colors.primary,
                              border: `1px solid ${colors.primary}30`,
                              fontWeight: 500,
                              fontSize: '0.7rem',
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ borderColor: colors.border }}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: colors.textSecondary,
                              maxWidth: 200,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {client.lostReason}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderColor: colors.border }}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: colors.success,
                              maxWidth: 250,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {client.recommendation}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ borderColor: colors.border }}>
                          <Chip
                            size="small"
                            label={
                              client.recommendationStatus === 'completed'
                                ? 'Выполнено'
                                : client.recommendationStatus === 'pending'
                                  ? 'Ожидает'
                                  : 'Игнорируется'
                            }
                            sx={{
                              background:
                                client.recommendationStatus === 'completed'
                                  ? `${colors.success}20`
                                  : client.recommendationStatus === 'pending'
                                    ? `${colors.accent}20`
                                    : `${colors.danger}20`,
                              color:
                                client.recommendationStatus === 'completed'
                                  ? colors.success
                                  : client.recommendationStatus === 'pending'
                                    ? colors.accent
                                    : colors.danger,
                              border: `1px solid ${
                                client.recommendationStatus === 'completed'
                                  ? `${colors.success}30`
                                  : client.recommendationStatus === 'pending'
                                    ? `${colors.accent}30`
                                    : `${colors.danger}30`
                              }`,
                              fontWeight: 500,
                              fontSize: '0.7rem',
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
