


import { NextResponse } from "next/server";
import { DiscountModel } from "@/lib/models";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic"; 


// PUT /api/admin/discounts/[id]
export async function PUT(request, context) {
  try {
    // Safely extract params with better error handling
    if (!context || typeof context !== 'object') {
      return NextResponse.json({ error: "Invalid request context" }, { status: 400 });
    }
    
    const params = context.params || {};
    const id = params.id;
    
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid discount ID" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const updateData = {
      ...(body.productId !== undefined && { productId: body.productId }),
      ...(body.discountType !== undefined && { discountType: body.discountType }),
      ...(body.discountValue !== undefined && { discountValue: parseFloat(body.discountValue) }),
      ...(body.startDate !== undefined && { startDate: body.startDate ? new Date(body.startDate) : null }),
      ...(body.endDate !== undefined && { endDate: body.endDate ? new Date(body.endDate) : null }),
      ...(body.isActive !== undefined && { isActive: Boolean(body.isActive) }),
    };

    const discount = await DiscountModel.update(id, updateData);
    if (!discount) {
      return NextResponse.json({ error: "Discount not found" }, { status: 404 });
    }

    return NextResponse.json(discount);
  } catch (error) {
    console.error("Error updating discount:", error);
    if (
      error.message.includes("Validation failed") ||
      error.message.includes("already has an active discount") ||
      error.message.includes("not found")
    ) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to update discount" }, { status: 500 });
  }
}

// DELETE /api/admin/discounts/[id]
export async function DELETE(request, context) {
  try {
    // Safely extract params with better error handling
    if (!context || typeof context !== 'object') {
      return NextResponse.json({ error: "Invalid request context" }, { status: 400 });
    }
    
    const params = context.params || {};
    const id = params.id;
    
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid discount ID" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deleted = await DiscountModel.delete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Discount not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Discount deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting discount:", error);
    return NextResponse.json({ error: "Failed to delete discount" }, { status: 500 });
  }
}
