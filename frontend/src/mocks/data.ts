// Типы данных
export interface Manager {
  id: string;
  name: string;
  avatar?: string;
  department: string;
  conversionRate: number;
  totalCalls: number;
  successfulCalls: number;
}

export interface Call {
  id: string;
  managerId: string;
  managerName: string;
  clientName: string;
  duration: number; // в секундах
  date: string;
  status: 'success' | 'failed' | 'pending';
  score: number; // 0-100
  issues: string[];
  recommendations: string[];
}

export interface Material {
  id: string;
  name: string;
  type: 'script' | 'presentation' | 'manual' | 'faq';
  uploadedAt: string;
  size: number; // в байтах
  usageCount: number;
}

export interface TrainingSession {
  id: string;
  managerId: string;
  managerName: string;
  scenario: string;
  completedAt: string;
  score: number;
  duration: number;
  improvements: string[];
}

export interface DashboardStats {
  totalCalls: number;
  avgConversion: number;
  lostClients: number;
  activeManagers: number;
  callsTrend: number; // процент изменения
  conversionTrend: number;
}

// Главный отчёт MVP
export interface MVPReport {
  currentConversion: number; // Текущая конверсия (%)
  lastMonthConversion: number; // Конверсия прошлого месяца (%)
  conversionDiff: number; // Разница (%)
  returnedClients: number; // Количество возвращённых клиентов
  returnedClientsTarget: number; // Цель по возврату
  moneyBrought: number; // Деньги, принесённые системой (₽)
  avgCheck: number; // Средний чек (₽)
  totalLeads: number; // Количество лидов
  // Дополнительные метрики для графиков
  weeklyConversion: { week: string; value: number }[];
  monthlyConversion: { month: string; value: number }[];
}

// Потерянный клиент
export interface LostClient {
  id: string;
  clientName: string;
  managerId: string;
  managerName: string;
  lostAt: string;
  lostStage: 1 | 2 | 3 | 4 | 5; // Этап продаж, на котором потерян
  lostReason: string;
  recommendation: string;
  recommendationStatus: 'pending' | 'completed' | 'ignored';
  returnedAt?: string;
  returnedCheck?: number;
}

// Моки данных
export const managers: Manager[] = [
  {
    id: '1',
    name: 'Иван Петров',
    department: 'B2B продажи',
    conversionRate: 32,
    totalCalls: 156,
    successfulCalls: 50,
  },
  {
    id: '2',
    name: 'Мария Сидорова',
    department: 'B2C продажи',
    conversionRate: 45,
    totalCalls: 203,
    successfulCalls: 91,
  },
  {
    id: '3',
    name: 'Алексей Козлов',
    department: 'B2B продажи',
    conversionRate: 28,
    totalCalls: 124,
    successfulCalls: 35,
  },
  {
    id: '4',
    name: 'Елена Новикова',
    department: 'Enterprise',
    conversionRate: 52,
    totalCalls: 89,
    successfulCalls: 46,
  },
  {
    id: '5',
    name: 'Дмитрий Волков',
    department: 'B2C продажи',
    conversionRate: 38,
    totalCalls: 178,
    successfulCalls: 68,
  },
];

export const calls: Call[] = [
  {
    id: '1',
    managerId: '1',
    managerName: 'Иван Петров',
    clientName: 'ООО "Технологии"',
    duration: 847,
    date: '2025-01-15T10:30:00',
    status: 'success',
    score: 85,
    issues: [],
    recommendations: ['Можно было предложить дополнительные услуги'],
  },
  {
    id: '2',
    managerId: '1',
    managerName: 'Иван Петров',
    clientName: 'ИП Смирнов',
    duration: 423,
    date: '2025-01-15T11:45:00',
    status: 'failed',
    score: 42,
    issues: ['Не отработано возражение "дорого"', 'Прерывал клиента'],
    recommendations: [
      'Использовать технику СПИН при возражениях',
      'Дать клиенту высказаться полностью',
    ],
  },
  {
    id: '3',
    managerId: '2',
    managerName: 'Мария Сидорова',
    clientName: 'АО "ПромСтрой"',
    duration: 1256,
    date: '2025-01-15T09:15:00',
    status: 'success',
    score: 92,
    issues: [],
    recommendations: [],
  },
  {
    id: '4',
    managerId: '3',
    managerName: 'Алексей Козлов',
    clientName: 'ООО "МегаСофт"',
    duration: 634,
    date: '2025-01-14T16:20:00',
    status: 'failed',
    score: 35,
    issues: [
      'Не выявлены потребности клиента',
      'Слишком быстрый переход к презентации',
    ],
    recommendations: [
      'Задавать больше открытых вопросов',
      'Использовать скрипт выявления потребностей',
    ],
  },
  {
    id: '5',
    managerId: '4',
    managerName: 'Елена Новикова',
    clientName: 'Холдинг "Инвест"',
    duration: 1834,
    date: '2025-01-14T14:00:00',
    status: 'success',
    score: 95,
    issues: [],
    recommendations: [],
  },
  {
    id: '6',
    managerId: '5',
    managerName: 'Дмитрий Волков',
    clientName: 'ООО "Старт"',
    duration: 512,
    date: '2025-01-14T11:30:00',
    status: 'pending',
    score: 68,
    issues: ['Не назначена следующая встреча'],
    recommendations: ['Всегда фиксировать следующий шаг с клиентом'],
  },
];

export const materials: Material[] = [
  {
    id: '1',
    name: 'Скрипт холодного звонка B2B',
    type: 'script',
    uploadedAt: '2025-01-10T10:00:00',
    size: 245000,
    usageCount: 156,
  },
  {
    id: '2',
    name: 'Презентация продукта v2.0',
    type: 'presentation',
    uploadedAt: '2025-01-08T14:30:00',
    size: 5420000,
    usageCount: 89,
  },
  {
    id: '3',
    name: 'Работа с возражениями',
    type: 'manual',
    uploadedAt: '2025-01-05T09:00:00',
    size: 890000,
    usageCount: 234,
  },
  {
    id: '4',
    name: 'FAQ по продукту',
    type: 'faq',
    uploadedAt: '2025-01-03T16:45:00',
    size: 123000,
    usageCount: 312,
  },
  {
    id: '5',
    name: 'Скрипт обработки входящих',
    type: 'script',
    uploadedAt: '2024-12-28T11:20:00',
    size: 198000,
    usageCount: 178,
  },
];

export const trainingSessions: TrainingSession[] = [
  {
    id: '1',
    managerId: '1',
    managerName: 'Иван Петров',
    scenario: 'Возражение "дорого"',
    completedAt: '2025-01-15T12:00:00',
    score: 78,
    duration: 420,
    improvements: ['Улучшена аргументация ценности', 'Добавлены примеры ROI'],
  },
  {
    id: '2',
    managerId: '3',
    managerName: 'Алексей Козлов',
    scenario: 'Выявление потребностей',
    completedAt: '2025-01-14T17:30:00',
    score: 65,
    duration: 380,
    improvements: ['Научился задавать открытые вопросы'],
  },
  {
    id: '3',
    managerId: '1',
    managerName: 'Иван Петров',
    scenario: 'Закрытие сделки',
    completedAt: '2025-01-13T15:00:00',
    score: 82,
    duration: 560,
    improvements: ['Освоена техника альтернативного закрытия'],
  },
];

export const dashboardStats: DashboardStats = {
  totalCalls: 750,
  avgConversion: 39,
  lostClients: 23,
  activeManagers: 5,
  callsTrend: 12,
  conversionTrend: 5,
};

// Сценарии для тренажёра
export const trainingScenarios = [
  {
    id: '1',
    name: 'Возражение "Дорого"',
    description: 'Отработка возражений по цене с разными типами клиентов',
    difficulty: 'medium' as const,
    duration: 10,
  },
  {
    id: '2',
    name: 'Холодный звонок',
    description: 'Первый контакт с потенциальным клиентом',
    difficulty: 'hard' as const,
    duration: 15,
  },
  {
    id: '3',
    name: 'Выявление потребностей',
    description: 'Техники СПИН и открытых вопросов',
    difficulty: 'easy' as const,
    duration: 8,
  },
  {
    id: '4',
    name: 'Закрытие сделки',
    description: 'Финальный этап переговоров и оформление',
    difficulty: 'medium' as const,
    duration: 12,
  },
  {
    id: '5',
    name: 'Работа с отказом',
    description: 'Восстановление контакта после первичного отказа',
    difficulty: 'hard' as const,
    duration: 10,
  },
];

// Главный отчёт MVP
export const mvpReport: MVPReport = {
  currentConversion: 42.3,
  lastMonthConversion: 38.7,
  conversionDiff: 3.6,
  returnedClients: 12,
  returnedClientsTarget: 20,
  moneyBrought: 847500,
  avgCheck: 45000,
  totalLeads: 156,
  weeklyConversion: [
    { week: '1 янв', value: 38.2 },
    { week: '8 янв', value: 39.5 },
    { week: '15 янв', value: 41.1 },
    { week: '22 янв', value: 40.8 },
    { week: '29 янв', value: 42.3 },
  ],
  monthlyConversion: [
    { month: 'Авг', value: 31.2 },
    { month: 'Сен', value: 33.8 },
    { month: 'Окт', value: 35.4 },
    { month: 'Ноя', value: 37.1 },
    { month: 'Дек', value: 38.7 },
    { month: 'Янв', value: 42.3 },
  ],
};

// Потерянные клиенты
export const lostClients: LostClient[] = [
  {
    id: '1',
    clientName: 'ООО "ТехноПром"',
    managerId: '1',
    managerName: 'Иван Петров',
    lostAt: '2025-01-14T14:30:00',
    lostStage: 4,
    lostReason: 'Клиент сказал "дорого", менеджер не отработал возражение',
    recommendation: 'Перезвоните клиенту и предложите рассрочку на 3 месяца. Подчеркните ROI в течение первого квартала.',
    recommendationStatus: 'pending',
  },
  {
    id: '2',
    clientName: 'ИП Сергеев А.В.',
    managerId: '3',
    managerName: 'Алексей Козлов',
    lostAt: '2025-01-13T11:15:00',
    lostStage: 2,
    lostReason: 'Не выявлены потребности, сразу начал презентацию',
    recommendation: 'Свяжитесь с клиентом, задайте вопросы о его текущих задачах и проблемах.',
    recommendationStatus: 'completed',
    returnedAt: '2025-01-15T10:00:00',
    returnedCheck: 67000,
  },
  {
    id: '3',
    clientName: 'АО "СтройИнвест"',
    managerId: '1',
    managerName: 'Иван Петров',
    lostAt: '2025-01-12T16:45:00',
    lostStage: 5,
    lostReason: 'Разговор завершился без назначения следующего шага',
    recommendation: 'Отправьте email с резюме разговора и предложите конкретную дату встречи.',
    recommendationStatus: 'completed',
    returnedAt: '2025-01-14T09:30:00',
    returnedCheck: 125000,
  },
  {
    id: '4',
    clientName: 'ООО "МедиаГрупп"',
    managerId: '5',
    managerName: 'Дмитрий Волков',
    lostAt: '2025-01-11T10:20:00',
    lostStage: 3,
    lostReason: 'Клиент сказал "не актуально", не было попытки выяснить причину',
    recommendation: 'Перезвоните через неделю, узнайте какие изменения произошли в компании.',
    recommendationStatus: 'pending',
  },
  {
    id: '5',
    clientName: 'Холдинг "Меридиан"',
    managerId: '2',
    managerName: 'Мария Сидорова',
    lostAt: '2025-01-10T15:00:00',
    lostStage: 4,
    lostReason: 'Клиент запросил время на размышление, менеджер не перезвонил',
    recommendation: 'Срочно свяжитесь с клиентом. Предложите демо-версию продукта на 14 дней.',
    recommendationStatus: 'ignored',
  },
];

// Названия этапов продаж
export const salesStages = [
  { id: 1, name: 'Приветствие', shortName: 'Привет.' },
  { id: 2, name: 'Выявление потребностей', shortName: 'Потреб.' },
  { id: 3, name: 'Презентация', shortName: 'Презент.' },
  { id: 4, name: 'Обработка возражений', shortName: 'Возраж.' },
  { id: 5, name: 'Закрытие', shortName: 'Закрыт.' },
];
