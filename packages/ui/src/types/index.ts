export type DayState = 'success' | 'warning' | 'fail';

export interface DayCellProps {
  day: number;
  state?: DayState | null;
  isToday?: boolean;
  disabled?: boolean;
}

export interface StatsCardProps {
  value: number;
  label: string;
  variant: 'success' | 'warning' | 'fail';
}

export interface MonthSelectorProps {
  month: number;
  year: number;
}

export interface CalendarGridProps {
  month: number;
  year: number;
  dayStates: Record<number, DayState>;
  today: Date;
}
