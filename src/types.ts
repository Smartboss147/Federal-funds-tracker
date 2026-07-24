export interface Plan {
  id: string;
  title: string;
  durationMs: number;
  durationLabel: string;
  priceLabel: string;
}

export interface TrackerState {
  step: 1 | 2 | 3 | 4;
  planId: string | null;
  startTime: number | null;
}
