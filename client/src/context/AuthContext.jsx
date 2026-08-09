import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [unverifiedEmail, setUnverifiedEmail] = useState(() => localStorage.getItem('unverifiedEmail') || '');

  // User Journey Selections
  const [selectedEducation, setSelectedEducation] = useState(
    () => localStorage.getItem('selectedEducation') || 'Class 8-10'
  );
  const [selectedStream, setSelectedStream] = useState(
    () => localStorage.getItem('selectedStream') || 'MPC'
  );
  const [selectedInterest, setSelectedInterest] = useState(
    () => localStorage.getItem('selectedInterest') || 'Technology'
  );
  const [targetCareer, setTargetCareer] = useState(
    () => localStorage.getItem('targetCareer') || 'software-engineer'
  );
  const [quizResults, setQuizResults] = useState(() => {
    const saved = localStorage.getItem('quizResults');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(true);

  // Helper to load registered users list from localStorage
  const getRegisteredUsers = () => {
    try {
      const saved = localStorage.getItem('registeredUsers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  // Check auth state on initial mount
  useEffect(() => {
    const initAuth = () => {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');
      if (savedToken && savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setToken(savedToken);
          if (parsedUser.educationLevel) setSelectedEducation(parsedUser.educationLevel);
          if (parsedUser.stream) setSelectedStream(parsedUser.stream);
          if (parsedUser.interest) setSelectedInterest(parsedUser.interest);
          if (parsedUser.targetCareer) setTargetCareer(parsedUser.targetCareer);
        } catch {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Save/clear token in localStorage
  const saveAuthSession = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.removeItem('unverifiedEmail');
    setUnverifiedEmail('');
  };

  // Login handler
  const login = async (email, password, rememberMe = false) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const users = getRegisteredUsers();

      const matchedUser = users.find(
        (u) => u.email.toLowerCase() === cleanEmail && u.password === password
      );

      if (matchedUser) {
        const { password: _, ...userSession } = matchedUser;
        saveAuthSession('local_user_token_' + Date.now(), userSession);
        return { success: true, user: userSession };
      }

      return {
        success: false,
        message: 'Invalid email or password. Please check your credentials.',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Something went wrong during login.',
      };
    }
  };

  // Register / Sign Up handler
  const registerUser = async (fullName, email, password) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const users = getRegisteredUsers();

      const existingUser = users.find((u) => u.email.toLowerCase() === cleanEmail);
      if (existingUser) {
        return {
          success: false,
          message: 'An account with this email already exists. Please log in.',
        };
      }

      const newUser = {
        id: 'user_' + Date.now(),
        fullName: fullName.trim(),
        email: cleanEmail,
        password: password,
        educationLevel: selectedEducation || 'Class 8-10',
        stream: selectedStream || 'MPC',
        interest: selectedInterest || 'Technology',
        targetCareer: targetCareer || 'software-engineer',
        role: 'student',
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...users, newUser];
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      localStorage.setItem('lastSignedUpEmail', cleanEmail);

      return {
        success: true,
        message: 'Account created successfully! Please log in.',
        user: newUser,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Something went wrong while creating your account.',
      };
    }
  };

  // Verify OTP handler
  const verifyOTP = async (otpCode, targetEmail = null) => {
    const emailToVerify = targetEmail || unverifiedEmail;
    const users = getRegisteredUsers();
    const matchedUser = users.find((u) => u.email.toLowerCase() === (emailToVerify || '').toLowerCase());
    const userSession = matchedUser
      ? (({ password, ...rest }) => rest)(matchedUser)
      : { id: 'local_user', email: emailToVerify, fullName: 'User' };
    saveAuthSession('local_user_token_' + Date.now(), userSession);
    return { success: true, message: 'Verification successful!', user: userSession };
  };

  // Resend OTP handler
  const resendOTP = async () => {
    return { success: true, message: 'OTP sent successfully!' };
  };

  // Forgot Password handler
  const forgotPassword = async (email) => {
    const cleanEmail = email.trim().toLowerCase();
    const users = getRegisteredUsers();
    const exists = users.some((u) => u.email.toLowerCase() === cleanEmail);
    if (!exists) {
      return { success: false, message: 'Email not found.' };
    }
    setUnverifiedEmail(cleanEmail);
    localStorage.setItem('unverifiedEmail', cleanEmail);
    return { success: true, message: 'Password reset code sent.', email: cleanEmail };
  };

  // Reset Password handler
  const resetPassword = async (email, otp, newPassword) => {
    const cleanEmail = email.trim().toLowerCase();
    const users = getRegisteredUsers();
    const userIndex = users.findIndex((u) => u.email.toLowerCase() === cleanEmail);
    if (userIndex === -1) {
      return { success: false, message: 'User not found.' };
    }
    users[userIndex].password = newPassword;
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    return { success: true, message: 'Password reset successfully! Please log in.' };
  };

  // Update Education Level handler
  const updateEducation = async (level) => {
    setSelectedEducation(level);
    localStorage.setItem('selectedEducation', level);
    if (user) {
      const updatedUser = { ...user, educationLevel: level };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Update Stream handler
  const updateStream = async (str) => {
    setSelectedStream(str);
    localStorage.setItem('selectedStream', str);
    if (user) {
      const updatedUser = { ...user, stream: str };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Update Interest handler
  const updateInterest = async (interest) => {
    setSelectedInterest(interest);
    localStorage.setItem('selectedInterest', interest);
    if (user) {
      const updatedUser = { ...user, interest };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Update Target Career handler
  const updateTargetCareer = async (careerId) => {
    setTargetCareer(careerId);
    localStorage.setItem('targetCareer', careerId);
    if (user) {
      const updatedUser = { ...user, targetCareer: careerId };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  // Save Quiz Results handler
  const saveQuizResults = async (results) => {
    setQuizResults(results);
    localStorage.setItem('quizResults', JSON.stringify(results));
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    setToken(null);
    setUnverifiedEmail('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('unverifiedEmail');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        unverifiedEmail,
        setUnverifiedEmail,
        selectedEducation,
        setSelectedEducation,
        updateEducation,
        selectedStream,
        setSelectedStream,
        updateStream,
        selectedInterest,
        setSelectedInterest,
        updateInterest,
        targetCareer,
        setTargetCareer,
        updateTargetCareer,
        quizResults,
        saveQuizResults,
        loading,
        login,
        registerUser,
        verifyOTP,
        resendOTP,
        forgotPassword,
        resetPassword,
        logout,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

