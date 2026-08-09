const nodemailer = require('nodemailer');

/**
 * Configure Nodemailer Transporter
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

/**
 * Send OTP Verification Email
 * @param {string} to - Recipient email address
 * @param {string} otp - 6-digit OTP code
 * @returns {Promise<boolean>}
 */
const sendOTPEmail = async (to, otp) => {
  try {
    const transporter = createTransporter();

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f3ff; margin: 0; padding: 20px; }
          .container { max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 16px; padding: 30px; box-shadow: 0 10px 25px rgba(124, 58, 237, 0.1); }
          .header { text-align: center; margin-bottom: 20px; }
          .logo { font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #7c3aed, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          .otp-code { font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #7c3aed; background: #f3e8ff; padding: 15px 25px; border-radius: 12px; text-align: center; margin: 25px 0; display: inline-block; }
          .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🧭 Career Compass</div>
            <h2 style="color: #1f2937; margin-top: 10px;">Verification Code</h2>
          </div>
          <p style="color: #4b5563; line-height: 1.5;">Hello,</p>
          <p style="color: #4b5563; line-height: 1.5;">Your one-time email verification code for Career Compass is:</p>
          <div style="text-align: center;">
            <div class="otp-code">${otp}</div>
          </div>
          <p style="color: #6b7280; font-size: 13px;">This OTP will expire in <strong>5 minutes</strong>. If you did not request this code, please ignore this email.</p>
          <div class="footer">
            &copy; ${new Date().getFullYear()} Career Compass. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || '"Career Compass" <no-reply@careercompass.com>',
      to,
      subject: `${otp} is your Career Compass verification code`,
      html: htmlContent,
    };

    // If EMAIL_USER is not set or mock environment, log OTP to console for testing
    if (!process.env.EMAIL_USER || process.env.EMAIL_USER === 'your_email@gmail.com') {
      console.log(`\n========================================`);
      console.log(`[MOCK EMAIL SERVICE] OTP for ${to}: ${otp}`);
      console.log(`========================================\n`);
      return true;
    }

    const info = await transporter.sendMail(mailOptions);
    console.log(`OTP Email sent successfully to ${to}. Message ID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`Error sending email to ${to}:`, error);
    // Fallback log for development
    console.log(`\n[FALLBACK DEV LOG] OTP for ${to}: ${otp}\n`);
    return true;
  }
};

module.exports = {
  sendOTPEmail,
};
