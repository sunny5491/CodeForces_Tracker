export const getRankColor = (rankOrRating) => {
  if (typeof rankOrRating === 'number') {
    if (rankOrRating < 1200) return '#808080'; // Gray (Newbie)
    if (rankOrRating < 1400) return '#008000'; // Green (Pupil)
    if (rankOrRating < 1600) return '#03a89e'; // Teal (Specialist)
    if (rankOrRating < 1900) return '#0000ff'; // Blue (Expert)
    if (rankOrRating < 2100) return '#aa00aa'; // Purple (Candidate Master)
    if (rankOrRating < 2400) return '#ff8c00'; // Orange (Master)
    if (rankOrRating < 2600) return '#ff8c00'; // Orange (International Master)
    if (rankOrRating < 3000) return '#ff0000'; // Red (Grandmaster)
    return '#ff0000'; // Red (International Grandmaster or Legendary Grandmaster)
  }

  switch (rankOrRating.toLowerCase()) {
    case 'legendary grandmaster':
      return '#ff0000'; // Red
    case 'international grandmaster':
      return '#ff0000'; // Red
    case 'grandmaster':
      return '#ff0000'; // Red
    case 'international master':
      return '#ff8c00'; // Orange
    case 'master':
      return '#ff8c00'; // Orange
    case 'candidate master':
      return '#aa00aa'; // Purple
    case 'expert':
      return '#0000ff'; // Blue
    case 'specialist':
      return '#03a89e'; // Teal
    case 'pupil':
      return '#008000'; // Green
    case 'newbie':
      return '#808080'; // Gray
    default:
      return '#808080'; // Gray
  }
};