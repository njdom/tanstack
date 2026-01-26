import type { Product } from '@/types';
import { ApiClient } from './api.client';

const API_BASE = '/api/products';

interface GetAllParams {
  search?: Product['name'];
  category?: Product['category'];
  brand?: Product['brand'];
  inStock?: Product['inStock'];
}

export class ProductsApi extends ApiClient {
  async getAll(params?: GetAllParams): Promise<Product[]> {
    const searchParams = new URLSearchParams();

    if (params?.search) searchParams.set('search', params.search);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.brand) searchParams.set('brand', params.brand);
    if (params?.inStock) searchParams.set('inStock', 'true');

    const queryString = searchParams.toString();
    const url = queryString ? `${API_BASE}?${queryString}` : API_BASE;

    return this.get(url);
  }

  async getById(id: Product['_id']) {
    return this.get(`${API_BASE}/${id}`);
  }

  async create(product: Omit<Product, '_id'>): Promise<Product> {
    return this.post(API_BASE, product);
  }

  async update(id: Product['_id'], updates: Partial<Product>): Promise<void> {
    return this.put(`${API_BASE}/${id}`, updates);
  }

  async delete(id: Product['_id']): Promise<void> {
    return this.delete(`${API_BASE}/${id}`);
  }
};

export const productsApi = new ProductsApi();
