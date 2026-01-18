
export type ViewMode = 'partner' | 'client';

export interface Step {
  id: string;
  title: string;
  description: string;
  isPrimary?: boolean;
}

export interface ValueProp {
  icon: string;
  title: string;
  description: string;
}
