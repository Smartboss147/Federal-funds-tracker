export interface Plan {
  id: string;
  title: string;
  durationMs: number;
  durationLabel: string;
  priceLabel: string;
}

export interface IncidentInfo {
  fullName: string;
  dateOfBirth: string;
  maritalStatus: string;
  residentialAddress: string;
  workAddress: string;
  employmentType: string;
  employerName?: string;
  currency: string;
  amount: string;
  description: string;
}

export interface TrackerState {
  id?: string;
  userId?: string;
  step: 0 | 1 | 2 | 3 | 4;
  incidentInfo?: IncidentInfo;
  planId: string | null;
  startTime: number | null;
}

