// RAWG API Key
export const API_KEY = "b7aa4ec2db5b4786ae71522bcceaa596";

// Helper function untuk build query string
export const buildApiUrl = (endpoint, params = {}) => {
  const queryParams = new URLSearchParams({
    key: API_KEY,
    ...params
  });
  return `${endpoint}?${queryParams.toString()}`;
};