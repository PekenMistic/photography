import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/config';
import { services } from '@/lib/database/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch single service
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const service = await db.select()
      .from(services)
      .where(eq(services.id, params.id))
      .limit(1);

    if (service.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: service[0]
    });
  } catch (error) {
    console.error('Error fetching service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch service' },
      { status: 500 }
    );
  }
}

// PUT - Update service
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      priceFrom,
      duration,
      features,
      category,
      imageUrl,
      popular,
      active
    } = body;

    const updatedService = await db.update(services)
      .set({
        name,
        description,
        priceFrom: priceFrom ? priceFrom.toString() : null,
        duration,
        features,
        category,
        imageUrl,
        popular,
        active,
        updatedAt: new Date()
      })
      .where(eq(services.id, params.id))
      .returning();

    if (updatedService.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedService[0]
    });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update service' },
      { status: 500 }
    );
  }
}

// DELETE - Delete service
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedService = await db.delete(services)
      .where(eq(services.id, params.id))
      .returning();

    if (deletedService.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Service not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete service' },
      { status: 500 }
    );
  }
}
