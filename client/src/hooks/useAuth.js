import { useAuth as useAuthContext } from '../context/AuthContext';

/**
 * Custom hook wrapper for AuthContext
 */
export const useAuth = () => {
  return useAuthContext();
};

export default useAuth;
