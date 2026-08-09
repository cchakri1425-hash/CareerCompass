import React, { useRef, useState, useEffect } from 'react';
import './OTPInput.css';

/**
 * 6-Digit OTP Component with Auto-Advance, Backspace Focus, and Paste Support
 */
const OTPInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus the first input box on component mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // Take only the last entered digit
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Move to next input box if digit entered
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // On Backspace, clear current or move to previous box
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0 && inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    // Check if pasted data contains numeric digits
    if (!/^\d+$/.test(pasteData)) return;

    const digits = pasteData.slice(0, length).split('');
    const newOtp = [...otp];

    digits.forEach((digit, i) => {
      newOtp[i] = digit;
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = digit;
      }
    });

    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Focus last populated box or final box
    const nextFocusIndex = Math.min(digits.length, length - 1);
    if (inputRefs.current[nextFocusIndex]) {
      inputRefs.current[nextFocusIndex].focus();
    }
  };

  return (
    <div className="otp-container" onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={(el) => (inputRefs.current[index] = el)}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={`otp-box ${digit ? 'filled' : ''}`}
          aria-label={`OTP Digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
