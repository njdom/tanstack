import type { Product } from '@/types';

const API_BASE = '/api/products';

export const productsApi = {
  async getAll(params?: { search?: string; category?: string; brand?: string; inStock?: boolean }): Promise<Product[]> {
    const url = new URL(API_BASE, window.location.origin);

    if (params?.search) url.searchParams.set('search', params.search);
    if (params?.category) url.searchParams.set('category', params.category);
    if (params?.brand) url.searchParams.set('brand', params.brand);
    if (params?.inStock) url.searchParams.set('inStock', 'true');

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`Failed to fetch products: ${response.statusText}`);
    return response.json();
  },

  async getById(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE}/${id}`);

    if (!response.ok)
      throw new Error(
        response.status === 404 ? 'Product not found' : `Failed to fetch product: ${response.statusText}`,
      );

    return response.json();
  },

  async create(product: Omit<Product, '_id'>): Promise<Product> {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error(`Failed to create product: ${response.statusText}`);
    return response.json();
  },

  async update(id: number, updates: Partial<Product>): Promise<void> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!response.ok) throw new Error(`Failed to update product: ${response.statusText}`);
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error(`Failed to delete product: ${response.statusText}`);
  },
};
