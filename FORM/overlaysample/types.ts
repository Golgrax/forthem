export interface Box {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  groupId?: string;
  value?: string;
  type?: 'text' | 'checkbox';
}

export interface Group {
  id: string;
  name: string;
  color: string;
  collapsed: boolean;
}

export type SelectionType = 'box' | 'group' | null;

export interface SelectionState {
  type: SelectionType;
  ids: string[];
}

export const COLORS = [
  '#ef4444', // red
  '#f97316', // orange
  '#eab308', // yellow
  '#22c55e', // green
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#a855f7', // purple
  '#ec4899', // pink
];