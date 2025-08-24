import { NextResponse } from 'next/server';
import { DiscountModel, ProductModel } from '@/lib/models';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/admin/discounts - List all products with discount information
export async function GET() {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get all products with their discount information
    const products = await ProductModel.findWithDiscounts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products with discounts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products with discounts' },
      { status: 500 }
    );
  }
}

// POST /api/admin/discounts - Create new discount
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
    
    // Validate required fields
    if (!body.productId || !body.discountType || body.discountValue === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: productId, discountType, discountValue' },
        { status: 400 }
      );
    }

    // Create discount with user ID
    const discountData = {
      productId: body.productId,
      discountType: body.discountType,
      discountValue: parseFloat(body.discountValue),
      startDate: body.startDate ? new Date(body.startDate) : new Date(),
      endDate: body.endDate ? new Date(body.endDate) : null,
      createdBy: session.user.id
    };

    const discount = await DiscountModel.create(discountData);
    return NextResponse.json(discount, { status: 201 });
  } catch (error) {
    console.error('Error creating discount:', error);
    
    // Handle validation errors
    if (error.message.includes('Validation failed') || error.message.includes('already has an active discount')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create discount' },
      { status: 500 }
    );
  }
}