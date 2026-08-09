import axios from 'axios';

const API_BASE = '/api/dashboard';

export const dashboardService = {
  // Get complete user dashboard data
  getDashboardData: async (userId) => {
    try {
      const response = await axios.get(`${API_BASE}/${userId}`);
      if (response.data.success) {
        localStorage.setItem(`dashboard_${userId}`, JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (err) {
      console.warn('Backend connection unavailable, utilizing local dashboard fallback.');
      const localData = localStorage.getItem(`dashboard_${userId}`);
      return {
        success: true,
        data: localData ? JSON.parse(localData) : null,
        isFallback: true
      };
    }
  },

  // Save/Update full or partial dashboard data
  updateDashboardData: async (userId, data) => {
    // Save to local storage for instant UI responsiveness
    const currentLocal = localStorage.getItem(`dashboard_${userId}`);
    let merged = currentLocal ? JSON.parse(currentLocal) : {};
    merged = { ...merged, ...data };
    localStorage.setItem(`dashboard_${userId}`, JSON.stringify(merged));

    try {
      const response = await axios.put(`${API_BASE}/${userId}`, data);
      return response.data;
    } catch (err) {
      return { success: true, data: merged, isFallback: true };
    }
  },

  // Save customization options
  updateCustomization: async (userId, customization) => {
    try {
      const response = await axios.put(`${API_BASE}/${userId}/customization`, customization);
      return response.data;
    } catch (err) {
      return { success: true, customization, isFallback: true };
    }
  }
};

export default dashboardService;
