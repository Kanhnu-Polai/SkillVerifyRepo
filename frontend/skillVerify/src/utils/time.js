// src/utils/time.ts
import { parseISO, formatDistanceToNow, format } from 'date-fns';

/**
 * Returns a relative time like “3 minutes ago” or “just now”.
 * If input is invalid/null, fallback to "just now".
 */
export const timeAgo = (iso) => {
  if (!iso) return "just now";
  try {
    return formatDistanceToNow(parseISO(iso), { addSuffix: true });
  } catch {
    return "just now";
  }
};

/**
 * Returns a full date like “05 Jul 2025 18:08”.
 * If input is invalid/null, fallback to "—".
 */
export const niceDate = (iso) => {
  if (!iso) return "—";
  try {
    return format(parseISO(iso), 'dd MMM yyyy HH:mm');
  } catch {
    return "—";
  }
};