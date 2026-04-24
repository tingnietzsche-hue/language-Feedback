export interface Dimension {
  key: string;
  label: string;
  current: number;
  previous: number;
  icon: string;
  color: string;
  description: string;
  details: {
    label: string;
    value: string | number;
    trend?: 'up' | 'down';
  }[];
}

export interface ReportData {
  title: string;
  slogan: string;
  dimensions: Dimension[];
}
