import { Dimension, ReportData } from './types';

export const COLORS = {
  primary: '#00B4FF', // HelloTalk Blue
  secondary: '#00D1B2', // HelloTalk Green
  expressiveness: '#FF4D4D',
  interaction: '#FFB800',
  activity: '#4DFF88',
  accuracy: '#00B4FF',
  global: '#9D4DFF',
};

export const MOCK_DATA: ReportData = {
  title: '全球通讯官',
  slogan: '你的语言频率，正与全球 15 个时区共振。',
  dimensions: [
    {
      key: 'expressiveness',
      label: '表达力',
      current: 85,
      previous: 70,
      icon: 'MessageSquare',
      color: COLORS.expressiveness,
      description: '衡量主动输出的意愿与内容丰富度',
      details: [
        { label: '动态总字数', value: '12,450' },
        { label: '最长消息', value: '342 字符' },
        { label: '使用语种', value: '4 种' },
        { label: '语音占比', value: '45%' },
      ],
    },
    {
      key: 'interaction',
      label: '互动深度',
      current: 92,
      previous: 88,
      icon: 'Users',
      color: COLORS.interaction,
      description: '社交沟通的质量与持久度',
      details: [
        { label: '深度会话 (ABA>5)', value: '128 次' },
        { label: '长途通话 (>5min)', value: '42 次' },
      ],
    },
    {
      key: 'activity',
      label: '活跃度',
      current: 78,
      previous: 82,
      icon: 'Zap',
      color: COLORS.activity,
      description: '在平台上的时间投入与习惯规律',
      details: [
        { label: '活跃天数', value: '28 天' },
        { label: '总活跃时数', value: '156 h' },
        { label: '场景触达', value: '12 个' },
        { label: '生物钟稳定性', value: '极高' },
      ],
    },
    {
      key: 'accuracy',
      label: '准确度',
      current: 65,
      previous: 55,
      icon: 'CheckCircle',
      color: COLORS.accuracy,
      description: '语言表达的规范性与纠错互助',
      details: [
        { label: '帮助纠错', value: '256 次' },
        { label: '被纠错', value: '48 次' },
      ],
    },
    {
      key: 'global',
      label: '全球链接',
      current: 88,
      previous: 75,
      icon: 'Globe',
      color: COLORS.global,
      description: '跨越地理与文化边界的广度',
      details: [
        { label: '语伴国籍', value: '18 国' },
        { label: '跨时区总数', value: '15 个' },
      ],
    },
  ],
};
