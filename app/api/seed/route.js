import { NextResponse } from 'next/server';
import { ProductModel } from '@/lib/models';
import { seedProducts } from '@/lib/seed-data';

// POST /api/seed - Seed the database with initial products
export async function POST() {
  try {
    // Check if products already exist
    const existingProducts = await ProductModel.findAll();
    
    if (existingProducts.length > 0) {
      return NextResponse.json(
        { message: 'Database already seeded', count: existingProducts.length },
        { status: 200 }
      );
    }

    // Create seed products
    const createdProducts = [];
    for (const productData of seedProducts) {
      const product = await ProductModel.create(productData);
      createdProducts.push(product);
    }

    return NextResponse.json(
      { 
        message: 'Database seeded successfully', 
        count: createdProducts.length,
        products: createdProducts 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}