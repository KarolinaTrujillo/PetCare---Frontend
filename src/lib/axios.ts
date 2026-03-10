import axios from 'axios';
export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_AUTH || 'http://localhost:3001'}/api`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});