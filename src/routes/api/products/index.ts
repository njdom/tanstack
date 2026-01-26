import { createFileRoute } from '@tanstack/react-router';
import { json } from '@tanstack/react-start';
import { productMongo } from '@/server/product.mongo';

export const Route = createFileRoute('/api/products/')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);
          const params = {
            search: url.searchParams.get('search') || undefined,
            category: url.searchParams.get('category') || undefined,
            brand: url.searchParams.get('brand') || undefined,
            inStock: url.searchParams.get('inStock') === 'true' ? true : undefined,
          };

          const products = await productMongo.findAll(params);
          return json(products);
        } catch (error) {
          console.error('Error fetching products:', error);
          return json({ error: 'Failed to fetch products' }, { status: 500 });
        }
      },

      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const product = await productMongo.create(body);
          return json(product, { status: 201 });
        } catch (error) {
          console.error('Error creating product:', error);
          return json({ error: 'Failed to create product' }, { status: 500 });
        }
      },
    },
  },
});
