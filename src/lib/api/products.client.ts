import type { Product } from '@/types';

const API_BASE = '/api/products';

interface GetAllParams {
  search?: Product['name'];
  category?: Product['category'];
  brand?: Product['brand'];
  inStock?: Product['inStock'];
}

export const productsApi = {
  async getAll(params?: GetAllParams): Promise<Product[]> {
    const searchParams = new URLSearchParams();

    if (params?.search) searchParams.set('search', params.search);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.brand) searchParams.set('brand', params.brand);
    if (params?.inStock) searchParams.set('inStock', 'true');

    const queryString = searchParams.toString();
    const url = queryString ? `${API_BASE}?${queryString}` : API_BASE;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch products: ${response.statusText}`);
    return response.json();
  },

  async getById(id: Product['_id']) {
    const response = await fetch(`${API_BASE}/${id}`);

    if (!response.ok)
      throw new Error(
        response.status === 404 ? 'Product not found' : `Failed to fetch product: ${response.statusText}`,
      );

    return response.json() as Promise<Product>;
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

  async update(id: Product['_id'], updates: Partial<Product>): Promise<void> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });

    if (!response.ok) throw new Error(`Failed to update product: ${response.statusText}`);
  },

  async delete(id: Product['_id']): Promise<void> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error(`Failed to delete product: ${response.statusText}`);
  },
};
