import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import OTPInput from '../components/OTPInput';
import { useAuth } from '../context/AuthContext';
import './VerifyOTP.css';

const VerifyOTP = () => {
  const [otpCode, setOtpCode] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { unverifiedEmail, verifyOTP, resendOTP } = useAuth();
  const navigate = useNavigate();

  // 60-second Countdown Timer Effect
  useEffect(() => {
    let interval = null;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer]);

  // Handle Verify OTP Submission
  const handleVerify = async (e) => {
    e.preventDefault();
    setServerError('');
    setServerSuccess('');

    if (otpCode.length !== 6) {
      setServerError('Please enter the full 6-digit verification OTP');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await verifyOTP(otpCode);
      if (res.success) {
        setServerSuccess(res.message);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1200);
      } else {
        setServerError(res.message);
      }
    } catch (err) {
      setServerError('OTP verification failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Resend OTP Request
  const handleResend = async () => {
    if (!canResend) return;

    setServerError('');
    setServerSuccess('');
    setCanResend(false);
    setTimer(60);

    try {
      const res = await resendOTP();
      if (res.success) {
        setServerSuccess(res.message);
      } else {
        setServerError(res.message);
      }
    } catch (err) {
      setServerError('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="We've sent a 6-digit OTP verification code to your email address"
    >
      {/* Display Registered Email Address Badge */}
      {unverifiedEmail && (
        <div className="registered-email-badge">
          ✉️ {unverifiedEmail}
        </div>
      )}

      {/* Alert Error / Success Messages */}
      {serverError && <div className="alert alert-error">⚠️ {serverError}</div>}
      {serverSuccess && <div className="alert alert-success">✅ {serverSuccess}</div>}

      <form onSubmit={handleVerify}>
        {/* Reusable 6-Box OTP Component */}
        <OTPInput length={6} onChange={(val) => setOtpCode(val)} />

        {/* Timer & Resend Button */}
        <div className="timer-container">
          <span className="timer-text">
            {canResend ? (
              "Didn't receive the code?"
            ) : (
              <>
                Resend code in <span className="timer-count">{timer}s</span>
              </>
            )}
          </span>

          <button
            type="button"
            className="btn-resend"
            disabled={!canResend}
            onClick={handleResend}
          >
            Resend OTP
          </button>
        </div>

        {/* Submit Action Button */}
        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting || otpCode.length !== 6}
        >
          {isSubmitting ? (
            <>
              <div className="spinner"></div>
              <span>Verifying OTP...</span>
            </>
          ) : (
            <span>Verify & Continue</span>
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default VerifyOTP;
