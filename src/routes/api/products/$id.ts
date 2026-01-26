import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { mongodb } from '@/server/mongodb'

export const Route = createFileRoute('/api/products/$id')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        try {
          const id = parseInt(params.id)
          if (isNaN(id)) {
            return json({ error: 'Invalid product ID' }, { status: 400 })
          }

          const product = await mongodb.getProductById(id)
          
          if (!product) {
            return json({ error: 'Product not found' }, { status: 404 })
          }

          return json(product)
        } catch (error) {
          console.error(`Error fetching product ${params.id}:`, error)
          return json({ error: 'Failed to fetch product' }, { status: 500 })
        }
      },

      PUT: async ({ params, request }) => {
        try {
          const id = parseInt(params.id)
          if (isNaN(id)) {
            return json({ error: 'Invalid product ID' }, { status: 400 })
          }

          const body = await request.json()
          const success = await mongodb.updateProduct(id, body)

          if (!success) {
            return json({ error: 'Product not found or not updated' }, { status: 404 })
          }

          return json({ success: true, message: 'Product updated' })
        } catch (error) {
          console.error(`Error updating product ${params.id}:`, error)
          return json({ error: 'Failed to update product' }, { status: 500 })
        }
      },

      DELETE: async ({ params }) => {
        try {
          const id = parseInt(params.id)
          if (isNaN(id)) {
            return json({ error: 'Invalid product ID' }, { status: 400 })
          }

          const success = await mongodb.deleteProduct(id)

          if (!success) {
            return json({ error: 'Product not found or not deleted' }, { status: 404 })
          }

          return json({ success: true, message: 'Product deleted' })
        } catch (error) {
          console.error(`Error deleting product ${params.id}:`, error)
          return json({ error: 'Failed to delete product' }, { status: 500 })
        }
      },
    },
  },
})
