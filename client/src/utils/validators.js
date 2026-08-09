/**
 * Validate email address format
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

/**
 * Validate OTP string (must be 6 numeric digits)
 * @param {string} otp
 * @returns {boolean}
 */
export const isValidOTP = (otp) => {
  return /^\d{6}$/.test(otp);
};

/**
 * Validate password strength (at least 6 characters)
 * @param {string} password
 * @returns {boolean}
 */
export const isValidPassword = (password) => {
  return password && password.length >= 6;
};
