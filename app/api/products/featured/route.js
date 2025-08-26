import { NextResponse } from 'next/server';
import { ProductModel } from '@/lib/models';
export const dynamic = "force-dynamic"; 

// GET /api/products/featured - Fetch featured products
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 6;
    
    const products = await ProductModel.findFeatured(limit);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured products' },
      { status: 500 }
    );
  }
}