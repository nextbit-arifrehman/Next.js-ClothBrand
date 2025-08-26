import { NextResponse } from 'next/server';
import { ProductModel } from '@/lib/models';
export const dynamic = "force-dynamic"; 

// GET /api/categories - Fetch all categories
export async function GET() {
  try {
    const categories = await ProductModel.getCategories();
    
    // Get product count for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const products = await ProductModel.findByCategory(category);
        return {
          name: category,
          displayName: category.charAt(0).toUpperCase() + category.slice(1),
          count: products.length
        };
      })
    );
    
    return NextResponse.json(categoriesWithCounts);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}