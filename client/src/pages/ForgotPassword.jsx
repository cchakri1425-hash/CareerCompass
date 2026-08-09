import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setServerError('');
    setServerSuccess('');
    setIsSubmitting(true);

    try {
      const res = await forgotPassword(data.email);
      if (res.success) {
        setServerSuccess(res.message);
        setTimeout(() => {
          navigate('/reset-password');
        }, 1200);
      } else {
        setServerError(res.message);
      }
    } catch (err) {
      setServerError('Failed to process forgot password request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your account email to receive a 6-digit verification OTP code"
    >
      {/* Alert Banners */}
      {serverError && <div className="alert alert-error">⚠️ {serverError}</div>}
      {serverSuccess && <div className="alert alert-success">✅ {serverSuccess}</div>}

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Registered Email Address
          </label>
          <div className="input-wrapper">
            <input
              id="email"
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="name@example.com"
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address format',
                },
              })}
            />
          </div>
          {errors.email && <span className="field-error">{errors.email.message}</span>}
        </div>

        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="spinner"></div>
              <span>Sending OTP...</span>
            </>
          ) : (
            <span>Send Reset Code</span>
          )}
        </button>
      </form>

      <div className="back-to-login-container">
        <Link to="/login" className="back-to-login-link">
          ← Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
