import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { registerUser } = useAuth();
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
      const res = await registerUser(data.fullName, data.email, data.password);
      if (res.success) {
        setServerSuccess('Account created successfully! Redirecting to Log In page...');
        setTimeout(() => navigate('/login'), 1200);
      } else {
        setServerError(res.message || 'Something went wrong while creating your account.');
      }
    } catch (err) {
      setServerError('An unexpected error occurred during signup. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Start your career navigation journey with Career Compass"
    >
      {/* Alert Messages */}
      {serverError && <div className="alert alert-error">⚠️ {serverError}</div>}
      {serverSuccess && <div className="alert alert-success">✅ {serverSuccess}</div>}

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">
            Full Name
          </label>
          <div className="input-wrapper">
            <input
              id="fullName"
              type="text"
              className={`form-input ${errors.fullName ? 'error' : ''}`}
              placeholder="e.g. Alex Johnson"
              {...register('fullName', {
                required: 'Full name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
              })}
            />
          </div>
          {errors.fullName && <span className="field-error">{errors.fullName.message}</span>}
        </div>

        {/* Email Address */}
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address
          </label>
          <div className="input-wrapper">
            <input
              id="email"
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="alex@example.com"
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
            />
          </div>
          {errors.email && <span className="field-error">{errors.email.message}</span>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <div className="input-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="At least 6 characters"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.password && <span className="field-error">{errors.password.message}</span>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="btn-spinner-container">
              <span className="btn-spinner"></span> Creating Account...
            </span>
          ) : (
            'Sign Up'
          )}
        </button>

        {/* Mode Switch Footer */}
        <div className="form-footer">
          Already have an account?{' '}
          <Link to="/login" className="toggle-mode-btn">
            Log In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signup;
