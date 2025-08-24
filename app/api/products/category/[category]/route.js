import { NextResponse } from 'next/server';
import { ProductModel } from '@/lib/models';

// GET /api/products/category/[category] - Fetch products by category
export async function GET(request, { params } = {}) {
  try {
    // Validate params
    if (!params?.category) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    const { category } = params;
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : null;
    
    const products = await ProductModel.findByCategory(category, limit);
    
    if (products.length === 0) {
      return NextResponse.json(
        { error: 'No products found for this category' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}