export function formatTime(ms: number): string {
  if (ms <= 0) return '0d 0h 0m 0s';
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);
  
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);
  
  return parts.join(' ');
}

export function getStatus(progress: number): string {
  if (progress < 5) return 'Initializing tracking';
  if (progress < 15) return 'Preparing tracking';
  if (progress < 80) return 'Tracking Progress';
  if (progress < 95) return 'Verifying progress';
  if (progress < 100) return 'Finalizing';
  return 'tracking Complete';
}
