import { NextResponse } from 'next/server';
import { ProductModel } from '@/lib/models';

// GET /api/products/discounted - Get products with active discounts for homepage
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 8;
    
    // Validate limit parameter
    if (limit < 1 || limit > 50) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 50' },
        { status: 400 }
      );
    }

    const discountedProducts = await ProductModel.findDiscounted(limit);
    return NextResponse.json(discountedProducts);
  } catch (error) {
    console.error('Error fetching discounted products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch discounted products' },
      { status: 500 }
    );
  }
}