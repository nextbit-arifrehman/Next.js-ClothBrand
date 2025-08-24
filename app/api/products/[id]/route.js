import { NextResponse } from 'next/server';
import { ProductModel } from '@/lib/models';
import { validateProductData } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/products/[id] - Fetch single product
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const product = await ProductModel.findById(id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Update product (protected)
export async function PUT(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();
    
    // Validate product data
    const validation = validateProductData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    // Update product
    const product = await ProductModel.update(id, {
      name: body.name.trim(),
      description: body.description.trim(),
      price: parseFloat(body.price),
      image: body.image?.trim() || null,
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// PATCH /api/products/[id] - Partial update product (protected)
export async function PATCH(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await request.json();
    
    // For PATCH, we only update the fields that are provided
    const updateData = {};
    
    if (body.hasOwnProperty('featured')) {
      updateData.featured = Boolean(body.featured);
    }
    
    if (body.hasOwnProperty('name')) {
      updateData.name = body.name.trim();
    }
    
    if (body.hasOwnProperty('description')) {
      updateData.description = body.description.trim();
    }
    
    if (body.hasOwnProperty('price')) {
      updateData.price = parseFloat(body.price);
    }
    
    if (body.hasOwnProperty('inStock')) {
      updateData.inStock = Boolean(body.inStock);
    }

    // Update product with only the provided fields
    const product = await ProductModel.update(id, updateData);

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Delete product (protected)
export async function DELETE(request, { params }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const deleted = await ProductModel.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}