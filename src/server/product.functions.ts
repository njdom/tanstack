import { createServerFn } from '@tanstack/react-start';
import { productMongo } from './product.mongo';
import { productFiltersSchema, productIdSchema, createProductSchema, updateProductSchema } from '@/schemas';
import { notFound } from '@tanstack/react-router';

export const getAllProducts = createServerFn({ method: 'GET' })
  .inputValidator(productFiltersSchema)
  .handler(async ({ data }) => {
    const products = await productMongo.findAll(data);
    return products;
  });

export const getProductById = createServerFn({ method: 'GET' })
  .inputValidator(productIdSchema)
  .handler(async ({ data }) => {
    const product = await productMongo.findById(data.id);
    if (!product) throw notFound();
    return product;
  });

export const getProductBrands = createServerFn({ method: 'GET' }).handler(async () => {
  const products = await productMongo.findAll();
  return [...new Set(products.map((p) => p.brand))].sort();
});

export const createProduct = createServerFn({ method: 'POST' })
  .inputValidator(createProductSchema)
  .handler(async ({ data }) => {
    return await productMongo.create(data);
  });

export const updateProduct = createServerFn({ method: 'POST' })
  .inputValidator(updateProductSchema)
  .handler(async ({ data }) => {
    const success = await productMongo.update(data.id, data.updates);
    if (!success) throw notFound();
    return { success: true };
  });

export const deleteProduct = createServerFn({ method: 'POST' })
  .inputValidator(productIdSchema)
  .handler(async ({ data }) => {
    const success = await productMongo.delete(data.id);
    if (!success) throw notFound();
    return { success: true };
  });
