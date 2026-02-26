import axios from 'axios';
import { ApiResponse, Language, Translation } from '../types';

const API_URL = process.env.REACT_APP_API_URL || '';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const translationApi = {
  // Get all available languages
  getLanguages: async (): Promise<Language[]> => {
    try {
      const response = await api.get<ApiResponse<Language[]>>('/languages');
      return response.data.data || [];
    } catch (error) {
      console.error('Error fetching languages:', error);
      throw error;
    }
  },

  // Get translation by language code
  getTranslation: async (languageCode: string): Promise<Translation> => {
    try {
      const response = await api.get<ApiResponse<Translation>>(
        `/translations/${languageCode.toUpperCase()}`
      );
      if (!response.data.data) {
        throw new Error('Translation not found');
      }
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching translation for ${languageCode}:`, error);
      throw error;
    }
  },

  // Create new translation (admin only)
  createTranslation: async (translation: Partial<Translation>): Promise<Translation> => {
    try {
      const response = await api.post<ApiResponse<Translation>>('/translations', translation);
      if (!response.data.data) {
        throw new Error('Failed to create translation');
      }
      return response.data.data;
    } catch (error) {
      console.error('Error creating translation:', error);
      throw error;
    }
  },

  // Update translation (admin only)
  updateTranslation: async (
    languageCode: string,
    translation: Partial<Translation>
  ): Promise<Translation> => {
    try {
      const response = await api.put<ApiResponse<Translation>>(
        `/translations/${languageCode.toUpperCase()}`,
        translation
      );
      if (!response.data.data) {
        throw new Error('Failed to update translation');
      }
      return response.data.data;
    } catch (error) {
      console.error(`Error updating translation for ${languageCode}:`, error);
      throw error;
    }
  },
};

export default api;
