import { Plan } from './types';

export const PLANS: Plan[] = [
  {
    id: 'fast',
    title: 'Fast Demo Tracking',
    durationMs: 3 * 24 * 60 * 60 * 1000,
    durationLabel: '3 days',
    priceLabel: '$220'
  },
  {
    id: 'medium',
    title: 'Medium Demo Tracking',
    durationMs: 10.5 * 24 * 60 * 60 * 1000, // Using 1.5 weeks
    durationLabel: '1–2 weeks',
    priceLabel: '$140'
  },
  {
    id: 'slow',
    title: 'Slow Demo Tracking',
    durationMs: 21 * 24 * 60 * 60 * 1000, // Using 3 weeks
    durationLabel: '2–4 weeks',
    priceLabel: '$80'
  }
];
