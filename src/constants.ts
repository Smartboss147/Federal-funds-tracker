import { Plan } from './types';

export const PLANS: Plan[] = [
  {
    id: 'fast',
    title: 'Fast Tracking',
    durationMs: 3 * 24 * 60 * 60 * 1000,
    durationLabel: '3 days',
    priceLabel: '$320'
  },
  {
    id: 'medium',
    title: 'Medium Tracking',
    durationMs: 10.5 * 24 * 60 * 60 * 1000,
    durationLabel: '1–2 weeks',
    priceLabel: '$220'
  },
  {
    id: 'slow',
    title: 'Slow Tracking',
    durationMs: 21 * 24 * 60 * 60 * 1000,
    durationLabel: '2–4 weeks',
    priceLabel: '$120'
  }
];
