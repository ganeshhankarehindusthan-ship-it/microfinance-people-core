/**
 * Indian Rupee and number formatters for NBFC People Operations
 */

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('en-IN').format(amount);
}

export function formatPercent(val: number): string {
  return `${val.toFixed(1)}%`;
}

export function numberToWordsINR(amount: number): string {
  const rounded = Math.round(amount);
  if (rounded === 0) return 'Zero Rupees';
  
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function inWords(num: number): string {
    if (num < 20) return a[num];
    if (num < 100) return b[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + a[num % 10] : '');
    if (num < 1000) return a[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' ' + inWords(num % 100) : '');
    if (num < 100000) return inWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 !== 0 ? ' ' + inWords(num % 1000) : '');
    if (num < 10000000) return inWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 !== 0 ? ' ' + inWords(num % 100000) : '');
    return inWords(Math.floor(num / 10000000)) + ' Crore' + (num % 10000000 !== 0 ? ' ' + inWords(num % 10000000) : '');
  }

  return `${inWords(rounded)} Rupees Only`;
}
