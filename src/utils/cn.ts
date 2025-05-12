import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function to merge Tailwind CSS classes without conflicts.
 * This combines the power of clsx and tailwind-merge to efficiently 
 * handle conditional class names and prevent Tailwind class collisions.
 * 
 * @param inputs Any number of class names or class name arrays
 * @returns A merged string of class names with Tailwind conflicts resolved
 * 
 * Example usage:
 * cn('text-red-500', condition && 'bg-blue-500', ['p-4', 'rounded'])
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}