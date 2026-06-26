/**
 * API utility for OctoFit Tracker
 * Requires VITE_CODESPACE_NAME environment variable to be set in .env.local
 */

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (!codespaceName || codespaceName === 'undefined') {
    console.warn(
      'VITE_CODESPACE_NAME is not set. Please add it to .env.local',
      'Format: https://<codespace-name>-8000.app.github.dev/api'
    );
    return null;
  }
  
  return `https://${codespaceName}-8000.app.github.dev/api`;
};

export const fetchFromApi = async (endpoint) => {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    throw new Error('API base URL not configured. Please set VITE_CODESPACE_NAME in .env.local');
  }

  const url = `${baseUrl}${endpoint}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};

/**
 * Extract data array from paginated or direct response
 * Handles both { data: [...] } and [...] formats
 */
export const extractDataArray = (response) => {
  if (Array.isArray(response)) {
    return response;
  }
  if (response && Array.isArray(response.data)) {
    return response.data;
  }
  return [];
};
