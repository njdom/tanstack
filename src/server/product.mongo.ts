import { Product } from "@/types";
import { MongoDB } from "./mongodb";
import { ObjectId } from "mongodb";
import { BaseModel, ProductDocument, ProductFilters } from "./types";

class ProductMongo extends MongoDB implements BaseModel<Product> {
  protected static instance: ProductMongo;
  private constructor() {
    super();
  }

  public static getInstance(): ProductMongo {
    if (!ProductMongo.instance) {
      ProductMongo.instance = new ProductMongo();
    }
    return ProductMongo.instance;
  }

  private toProduct(doc: ProductDocument): Product {
    return {
      ...doc,
      _id: doc._id.toHexString(),
    };
  }

  public async getProductsCollection() {
    const database = await this.connect();
    return database.collection<ProductDocument>('products');
  }

  public async findAll(filters?: ProductFilters) {
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

    const documents = await collection.find(query).toArray();
    return documents.map(this.toProduct);
  }

  public async findById(id: Product['_id']): Promise<Product | null> {
    const collection = await this.getProductsCollection();
    const document = await collection.findOne({ _id: new ObjectId(id) });
    return document ? this.toProduct(document) : null;
  }

  public async create(product: Omit<Product, '_id'>) {
    const collection = await this.getProductsCollection();
    const result = await collection.insertOne(product as any);
    return { ...product, _id: result.insertedId.toHexString() };
  }

  public async update(id: Product['_id'], updates: Partial<Omit<Product, '_id'>>) {
    const collection = await this.getProductsCollection();
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    return result.modifiedCount > 0;
  }

  public async delete(id: Product['_id']) {
    const collection = await this.getProductsCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  public async deleteAll() {
    const collection = await this.getProductsCollection();
    const result = await collection.deleteMany({});
    return result.deletedCount;
  }

  public async createAll(products: Omit<Product, '_id'>[]) {
    const collection = await this.getProductsCollection();
    const result = await collection.insertMany(products as any);
    return result.insertedCount;
  }
}

export const productMongo = ProductMongo.getInstance();