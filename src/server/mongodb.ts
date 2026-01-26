import { MongoClient, Db } from 'mongodb';

export class MongoDB {
  protected static instance: MongoDB;
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private readonly MONGODB_URI: string;
  private readonly DB_NAME: string;

  protected constructor() {
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

  public async connect() {
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

  public async disconnect() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.log('✅ Disconnected from MongoDB');
    }
  }

  
}

export const mongodb = MongoDB.getInstance();
