import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Toggle between Login & Register mode
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setServerError('');
    setServerSuccess('');
    reset();
  };

  const onSubmit = async (data) => {
    setServerError('');
    setServerSuccess('');
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        // Sign Up Flow - Saves details locally & prompts for Log In
        const res = await registerUser(data.fullName, data.email, data.password);
        if (res.success) {
          setServerSuccess('Account created successfully! Please log in with the exact details you just signed up with.');
          setIsSignUp(false); // Switch view mode to Log In
          reset({ email: data.email, password: '' });
        } else {
          setServerError(res.message || 'Something went wrong while signing up.');
        }
      } else {
        // Log In Flow - Verifies against exact signed up credentials
        const res = await login(data.email, data.password, data.rememberMe);
        if (res.success) {
          navigate('/');
        } else {
          setServerError(res.message || 'Something went wrong. Invalid email or password.');
        }
      }
    } catch (err) {
      setServerError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title={isSignUp ? 'Create an Account' : 'Welcome Back'}
      subtitle={
        isSignUp
          ? 'Start your career navigation journey with us'
          : 'Please enter your credentials to access your account'
      }
    >
      {/* Alert Error / Success Messages */}
      {serverError && <div className="alert alert-error">⚠️ {serverError}</div>}
      {serverSuccess && <div className="alert alert-success">✅ {serverSuccess}</div>}

      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name field (Only in Sign Up mode) */}
        {isSignUp && (
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">
              Full Name
            </label>
            <div className="input-wrapper">
              <input
                id="fullName"
                type="text"
                className={`form-input ${errors.fullName ? 'error' : ''}`}
                placeholder="John Doe"
                {...register('fullName', {
                  required: 'Full name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                })}
              />
            </div>
            {errors.fullName && <span className="field-error">{errors.fullName.message}</span>}
          </div>
        )}

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

        {/* Password Field with Show/Hide Toggle */}
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <div className="input-wrapper">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="••••••••"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.password && <span className="field-error">{errors.password.message}</span>}
        </div>

        {/* Remember Me & Forgot Password (Only in Login mode) */}
        {!isSignUp && (
          <div className="form-options-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="custom-checkbox"
                {...register('rememberMe')}
              />
              <span>Remember Me</span>
            </label>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>
        )}

        {/* Purple Gradient Action Button */}
        <button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="spinner"></div>
              <span>Processing...</span>
            </>
          ) : (
            <span>{isSignUp ? 'Sign Up' : 'Log In'}</span>
          )}
        </button>

        {!isSignUp && (
          <button
            type="button"
            className="btn-secondary"
            style={{
              marginTop: '0.75rem',
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.75rem',
              border: '1px solid var(--border-color, #e2e8f0)',
              background: 'rgba(99, 102, 241, 0.08)',
              color: 'var(--primary-color, #6366f1)',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}
            onClick={async () => {
              setIsSubmitting(true);
              const res = await login('demo@careercompass.com', 'password123');
              if (res.success) {
                navigate('/');
              } else {
                setServerError(res.message);
              }
              setIsSubmitting(false);
            }}
          >
            <span>🚀 Quick Demo Login (1-Click)</span>
          </button>
        )}
      </form>

      {/* Divider with "OR" */}
      <div className="divider-container">
        <div className="divider-line"></div>
        <span className="divider-text">OR</span>
        <div className="divider-line"></div>
      </div>

      {/* Social Login Buttons */}
      <div className="social-buttons-container">
        <button type="button" className="btn-social" onClick={() => alert('Google authentication service connected')}>
          <svg className="social-icon" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <button type="button" className="btn-social" onClick={() => alert('LinkedIn authentication service connected')}>
          <svg className="social-icon" viewBox="0 0 24 24">
            <path
              fill="#0A66C2"
              d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z"
            />
          </svg>
          <span>Continue with LinkedIn</span>
        </button>

        <button type="button" className="btn-social" onClick={() => alert('Apple authentication service connected')}>
          <svg className="social-icon" viewBox="0 0 24 24">
            <path
              fill="#000000"
              d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.35c.67-.82 1.13-1.96.99-3.1-.98.04-2.17.65-2.87 1.47-.63.73-1.18 1.9-1.03 3.02 1.1.08 2.24-.56 2.91-1.39z"
            />
          </svg>
          <span>Continue with Apple</span>
        </button>
      </div>

      {/* Auth Toggle Link */}
      <div className="auth-footer-text">
        <span>{isSignUp ? 'Already have an account?' : "Don't have an account?"}</span>
        <button
          type="button"
          onClick={toggleAuthMode}
          className="auth-footer-link"
          style={{ background: 'none', border: 'none', color: '#4F46E5', cursor: 'pointer' }}
        >
          {isSignUp ? 'Log In' : 'Sign Up'}
        </button>
      </div>
    </AuthLayout>
  );
};
export default Login;
