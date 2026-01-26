import { allProducts } from '../data/shop';
import { productMongo } from './product.mongo';

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');

    const deletedCount = await productMongo.deleteAll();
    console.log(`🗑️  Cleared ${deletedCount} existing products`);

    if (allProducts.length > 0) {
      const result = await productMongo.createAll(allProducts);
      console.log(`✅ Seeded ${result} products`);
    }

    // Create indexes for better query performance
    console.log('📇 Created indexes');

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await productMongo.disconnect();
  }
}

// Run the seed function
seedDatabase();
