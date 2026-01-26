import { Product } from "@/types";
import { ObjectId } from "mongodb";

interface BaseDocument {
  _id: string;
}

export interface BaseModel<T extends BaseDocument> {
  create(data: Omit<T, '_id'>): Promise<T>;
  findById(id: T['_id']): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: T['_id'], data: Partial<T>): Promise<boolean>;
  delete(id: T['_id']): Promise<boolean>;
}

export type ProductDocument = Omit<Product, '_id'> & { _id: ObjectId };
export interface ProductFilters {
  search?: string;
  category?: Product['category'];
  brand?: Product['brand'];
  inStock?: Product['inStock'];
}
