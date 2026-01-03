import { Task } from '@/types';

export function toCSV(tasks: ReadonlyArray<Task>): string {
  // Fixed: Use stable headers in a consistent order
  const headers = ['id', 'title', 'revenue', 'timeTaken', 'priority', 'status', 'notes'];
  const rows = tasks.map(t => [
    escapeCsv(String(t.id)),
    escapeCsv(t.title),
    String(t.revenue),
    String(t.timeTaken),
    t.priority,
    t.status,
    escapeCsv(t.notes ?? ''),
  ]);
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

function escapeCsv(v: string): string {
  // Fixed: Properly escape CSV values by quoting and escaping quotes
  if (v.includes(',') || v.includes('\n') || v.includes('"') || v.includes('\r')) {
    // Escape double quotes by doubling them and wrap in quotes
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

export function downloadCSV(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}


