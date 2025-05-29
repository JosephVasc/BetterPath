export interface Goal {
  id: string;
  userId: string;
  type: 'movement' | 'mood' | 'spending';
  target: number;
  current: number;
  createdAt: string;
  updatedAt: string;
}

export interface CheckIn {
  id: string;
  userId: string;
  hasMoved: boolean;
  mood: number;
  spending: number;
  date: string;
}

export interface PartnerCheckIn {
  id: string;
  userId: string;
  partnerId: string;
  communication: number;
  qualityTime: number;
  notes: string;
  date: string;
}

export interface MoodTrackerProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export interface BudgetTrackerProps {
  value: number;
  onChange: (value: number) => void;
}

export interface RelationshipCheckInProps {
  onSubmit: (data: {
    communication: number;
    qualityTime: number;
    notes: string;
  }) => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  partner_id?: string;
} 