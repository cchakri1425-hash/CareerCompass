import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import OTPInput from '../components/OTPInput';
import { useAuth } from '../context/AuthContext';
import './ResetPassword.css';

const ResetPassword = () => {
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { unverifiedEmail, resetPassword } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch('newPassword');

  const onSubmit = async (data) => {
    setServerError('');
    setServerSuccess('');

    if (otpCode.length !== 6) {
      setServerError('Please enter the complete 6-digit OTP code');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await resetPassword(unverifiedEmail, otpCode, data.newPassword);
      if (res.success) {
        setServerSuccess(res.message);
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setServerError(res.message);
      }
    } catch (err) {
      setServerError('Password reset failed. Please check your OTP and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter the 6-digit OTP code sent to your email along with your new password"
    >
      {/* Registered Email Badge */}
      {unverifiedEmail && (
        <div className="registered-email-badge">
          ✉️ {unverifiedEmail}
        </div>
      )}

      {/* Alert Banners */}
      {serverError && <div className="alert alert-error">⚠️ {serverError}</div>}
      {serverSuccess && <div className="alert alert-success">✅ {serverSuccess}</div>}

      <form className="auth-form reset-password-form" onSubmit={handleSubmit(onSubmit)}>
        {/* 6-Digit OTP Box Input */}
        <div className="form-group">
          <label className="form-label">Verification OTP Code</label>
          <OTPInput length={6} onChange={(val) => setOtpCode(val)} />
        </div>

        {/* New Password */}
        <div className="form-group">
          <label className="form-label" htmlFor="newPassword">
            New Password
          </label>
          <div className="input-wrapper">
            <input
              id="newPassword"
              type={showPassword ? 'text' : 'password'}
              className={`form-input ${errors.newPassword ? 'error' : ''}`}
              placeholder="••••••••"
              {...register('newPassword', {
                required: 'New password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.newPassword && <span className="field-error">{errors.newPassword.message}</span>}
        </div>

        {/* Confirm New Password */}
        <div className="form-group">
          <label className="form-label" htmlFor="confirmPassword">
            Confirm New Password
          </label>
          <div className="input-wrapper">
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="••••••••"
              {...register('confirmPassword', {
                required: 'Please confirm your new password',
                validate: (val) => val === newPassword || 'Passwords do not match',
              })}
            />
          </div>
          {errors.confirmPassword && (
            <span className="field-error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting || otpCode.length !== 6}
        >
          {isSubmitting ? (
            <>
              <div className="spinner"></div>
              <span>Resetting Password...</span>
            </>
          ) : (
            <span>Update Password</span>
          )}
        </button>
      </form>

      <div className="back-to-login-container">
        <Link to="/login" className="back-to-login-link">
          ← Cancel and return to Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
