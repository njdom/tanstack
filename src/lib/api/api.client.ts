import { createIsomorphicFn } from '@tanstack/react-start';

const getApiBaseUrl = createIsomorphicFn()
  .server(() => {
    return process.env.API_BASE_URL || 'http://localhost:3000';
  })
  .client(() => {
    return '';
  });

export class ApiClient {
  private baseUrl = getApiBaseUrl();

  async get(url: string) {
    return this.apiRequest(url, { method: 'GET' });
  }

  async post(url: string, data: Record<string, unknown>) {
    return this.apiRequest(url, { method: 'POST', body: JSON.stringify(data) });
  }

  async put(url: string, data: Record<string, unknown>) {
    return this.apiRequest(url, { method: 'PUT', body: JSON.stringify(data) });
  }

  async delete(url: string) {
    return this.apiRequest(url, { method: 'DELETE' });
  }

  private async apiRequest(url: string, options: RequestInit) {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}
