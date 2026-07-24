export interface Plan {
  id: string;
  title: string;
  durationMs: number;
  durationLabel: string;
  priceLabel: string;
}

export interface TrackerState {
  id?: string;
  userId?: string;
  step: 1 | 2 | 3 | 4;
  planId: string | null;
  startTime: number | null;
}
