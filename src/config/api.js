// API Configuration with Environment Detection
const getApiConfig = () => {
  const isDevelopment = import.meta.env.DEV || import.meta.env.VITE_APP_ENV === 'development';
  const isProduction = import.meta.env.PROD || import.meta.env.VITE_APP_ENV === 'production';

  let API_BASE_URL;

  if (isDevelopment) {
    // Development environment
    API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  } else if (isProduction) {
    // Production environment
    API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-live-backend-url.com';
  } else {
    // Fallback
    API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  }

  return {
    API_BASE_URL,
    isDevelopment,
    isProduction,
    // Helper function to get full API endpoint
    getEndpoint: (path) => `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`,
  };
};

export const apiConfig = getApiConfig();
export default apiConfig;
