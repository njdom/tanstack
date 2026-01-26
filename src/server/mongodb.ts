import { MongoClient, Db, Collection } from 'mongodb';
import type { Product } from '../types';

export interface ProductFilters {
  search?: string;
  category?: Product['category'];
  brand?: Product['brand'];
  inStock?: Product['inStock'];
}

class MongoDB {
  private static instance: MongoDB;
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private readonly MONGODB_URI: string;
  private readonly DB_NAME: string;

  private constructor() {
    this.MONGODB_URI =
      process.env.MONGODB_URI || 'mongodb://admin:admin123@localhost:27017/tanstack_products?authSource=admin';
    this.DB_NAME = process.env.MONGODB_DB_NAME || 'tanstack_products';
  }

  public static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }

  public async connect(): Promise<Db> {
    if (this.db) {
      return this.db;
    }

    try {
      this.client = new MongoClient(this.MONGODB_URI);
      await this.client.connect();
      this.db = this.client.db(this.DB_NAME);
      console.log('✅ Connected to MongoDB');
      return this.db;
    } catch (error) {
      console.error('❌ Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log('✅ Disconnected from MongoDB');
    }
  }

  public async getProductsCollection(): Promise<Collection<Product>> {
    const database = await this.connect();
    return database.collection<Product>('products');
  }

  public async getAllProducts(filters?: ProductFilters): Promise<Product[]> {
    const collection = await this.getProductsCollection();

    const query: any = {};
    const orConditions: any[] = [];

    if (filters?.search) {
      const regex = new RegExp(filters.search, 'i');
      orConditions.push({ name: regex }, { category: regex }, { brand: regex }, { description: regex });
    }

    if (filters?.category) query.category = filters.category;
    if (filters?.brand) query.brand = filters.brand;
    if (filters?.inStock !== undefined) query.inStock = filters.inStock;
    if (orConditions.length > 0) query.$or = orConditions;

    return await collection.find(query).toArray();
  }

  public async getProductById(id: number): Promise<Product | null> {
    const collection = await this.getProductsCollection();
    return await collection.findOne({ id });
  }

  public async createProduct(product: Omit<Product, '_id'>): Promise<Product> {
    const collection = await this.getProductsCollection();
    const result = await collection.insertOne(product as Product);
    return { ...product, _id: result.insertedId } as Product;
  }

  public async updateProduct(id: number, updates: Partial<Product>): Promise<boolean> {
    const collection = await this.getProductsCollection();
    const result = await collection.updateOne({ id }, { $set: updates });
    return result.modifiedCount > 0;
  }

  public async deleteProduct(id: number): Promise<boolean> {
    const collection = await this.getProductsCollection();
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  }
}

export const mongodb = MongoDB.getInstance();
