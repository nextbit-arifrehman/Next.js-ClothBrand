import { NextResponse } from 'next/server';
import { DiscountModel } from '@/lib/models';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// PUT /api/admin/discounts/[id] - Update existing discount
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
    
    // Prepare update data
    const updateData = {};
    
    if (body.productId !== undefined) {
      updateData.productId = body.productId;
    }
    
    if (body.discountType !== undefined) {
      updateData.discountType = body.discountType;
    }
    
    if (body.discountValue !== undefined) {
      updateData.discountValue = parseFloat(body.discountValue);
    }
    
    if (body.startDate !== undefined) {
      updateData.startDate = body.startDate ? new Date(body.startDate) : null;
    }
    
    if (body.endDate !== undefined) {
      updateData.endDate = body.endDate ? new Date(body.endDate) : null;
    }
    
    if (body.isActive !== undefined) {
      updateData.isActive = Boolean(body.isActive);
    }

    const discount = await DiscountModel.update(id, updateData);
    
    if (!discount) {
      return NextResponse.json(
        { error: 'Discount not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(discount);
  } catch (error) {
    console.error('Error updating discount:', error);
    
    // Handle validation errors
    if (error.message.includes('Validation failed') || 
        error.message.includes('already has an active discount') ||
        error.message.includes('not found')) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update discount' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/discounts/[id] - Remove discount
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
    
    const deleted = await DiscountModel.delete(id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Discount not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Discount deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting discount:', error);
    return NextResponse.json(
      { error: 'Failed to delete discount' },
      { status: 500 }
    );
  }
}