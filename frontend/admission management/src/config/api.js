// API Configuration
const API_BASE_URL = 'https://dakshmalhotra.xyz';

export const API_ENDPOINTS = {
  // Auth endpoints
  SIGNIN: `${API_BASE_URL}/signin`,
  SIGNUP: `${API_BASE_URL}/signup`,
  VALIDATE_TOKEN: `${API_BASE_URL}/api/validate-token`,
  
  // Form endpoints
  SUBMIT_FORM: `${API_BASE_URL}/api/form/submit-form`,
  
  // Admin endpoints
  ALL_SUBMISSIONS: `${API_BASE_URL}/api/admin/all-submissions`,
};

export default API_BASE_URL; 