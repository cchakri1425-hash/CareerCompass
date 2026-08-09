/**
 * Format email string for clean display
 * @param {string} email
 * @returns {string}
 */
export const formatEmail = (email) => {
  if (!email) return '';
  return email.trim().toLowerCase();
};

/**
 * Format user display name capitalising words
 * @param {string} name
 * @returns {string}
 */
export const formatName = (name) => {
  if (!name) return '';
  return name
    .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Format seconds into mm:ss format
 * @param {number} totalSeconds
 * @returns {string}
 */
export const formatTimer = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
