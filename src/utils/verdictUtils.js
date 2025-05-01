export const getVerdictBadgeColor = (verdict) => {
  switch (verdict) {
    case 'OK':
      return { bg: '#d1fae5', text: '#065f46' }; // Green
    case 'WRONG_ANSWER':
      return { bg: '#fee2e2', text: '#991b1b' }; // Red
    case 'TIME_LIMIT_EXCEEDED':
      return { bg: '#fff7ed', text: '#9a3412' }; // Orange
    case 'MEMORY_LIMIT_EXCEEDED':
      return { bg: '#fff7ed', text: '#9a3412' }; // Orange
    case 'RUNTIME_ERROR':
      return { bg: '#fef3c7', text: '#92400e' }; // Yellow
    case 'COMPILATION_ERROR':
      return { bg: '#e0e7ff', text: '#3730a3' }; // Purple
    case 'SKIPPED':
      return { bg: '#f3f4f6', text: '#374151' }; // Gray
    case 'CHALLENGED':
      return { bg: '#fee2e2', text: '#991b1b' }; // Red
    default:
      return { bg: '#f3f4f6', text: '#374151' }; // Gray
  }
};