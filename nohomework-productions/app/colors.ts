// Centralized color configuration for NHP website
export const colors = {
  accent: {
    primary: '#F4D03F', // More yellow - main accent color
    hover: '#F1C40F',   // Slightly darker for hover states
    light: '#F7DC6F',   // Lighter variant
    dark: '#D4AC0D',    // Darker variant
  },
  orange: {
    primary: '#E67E22', // Warm orange that complements yellow
    light: '#F39C12',   // Lighter orange
    dark: '#D35400',    // Darker orange
  },
  status: {
    released: '#2AA198', // Teal green for released films
    investment: '#D35400', // Dark orange for seeking investment
  },
  // Add other color categories as needed
  neutral: {
    black: '#000000',
    white: '#FFFFFF',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      500: '#6B7280',
      900: '#111827',
    }
  }
} as const;