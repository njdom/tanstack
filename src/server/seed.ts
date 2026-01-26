import { mongodb } from './mongodb'
import { allProducts } from '../data/shop'

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...')
    
    await mongodb.connect()
    const collection = await mongodb.getProductsCollection()

    // Clear existing products
    const deleteResult = await collection.deleteMany({})
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing products`)

    // Insert products
    if (allProducts.length > 0) {
      const result = await collection.insertMany(allProducts)
      console.log(`✅ Seeded ${result.insertedCount} products`)
    }

    // Create indexes for better query performance
    await collection.createIndex({ id: 1 }, { unique: true })
    await collection.createIndex({ category: 1 })
    await collection.createIndex({ brand: 1 })
    await collection.createIndex({ name: 'text', description: 'text' })
    console.log('📇 Created indexes')

    console.log('🎉 Database seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await mongodb.disconnect()
  }
}

// Run the seed function
seedDatabase()
