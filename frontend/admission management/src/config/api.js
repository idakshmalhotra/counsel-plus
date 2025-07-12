// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://13.62.48.182:3000';

export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNIN: `${API_BASE_URL}/signin`,
  SIGNUP: `${API_BASE_URL}/signup`,
  VALIDATE_TOKEN: `${API_BASE_URL}/api/validate-token`,
  
  // Form endpoints
  SUBMIT_FORM: `${API_BASE_URL}/api/form/submit-form`,
  
  // Admin endpoints
  ALL_SUBMISSIONS: `${API_BASE_URL}/api/admin/all-submissions`,
  
  // Auth API endpoints (for SignupNew component)
  AUTH_SIGNUP: `${API_BASE_URL}/api/auth/signup`,
};

export default API_BASE_URL; 