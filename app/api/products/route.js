import { NextResponse } from 'next/server';
import { ProductModel } from '@/lib/models';
import { validateProductData } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/products - Fetch all products
export async function GET() {
  try {
    const products = await ProductModel.findAll();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST /api/products - Create new product (protected)
export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    // Validate product data
    const validation = validateProductData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    // Create product
    const product = await ProductModel.create({
      name: body.name.trim(),
      description: body.description.trim(),
      price: parseFloat(body.price),
      category: body.category.trim(),
      brand: body.brand.trim(),
      material: body.material?.trim() || null,
      care: body.care?.trim() || null,
      origin: body.origin?.trim() || null,
      stockQuantity: parseInt(body.stockQuantity),
      inStock: Boolean(body.inStock),
      featured: Boolean(body.featured),
      sizes: Array.isArray(body.sizes) ? body.sizes : [],
      colors: Array.isArray(body.colors) ? body.colors : [],
      images: Array.isArray(body.images) ? body.images : (body.image ? [body.image] : []),
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}