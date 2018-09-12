import accounting from 'accounting';

export function formatCurrency(num: number): string {
  if (Number.isFinite(num)) {
    return accounting.formatNumber(num);
  }
  return '0';
}
