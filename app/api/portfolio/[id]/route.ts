import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/config';
import { portfolioItems } from '@/lib/database/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch single portfolio item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const item = await db.select()
      .from(portfolioItems)
      .where(eq(portfolioItems.id, params.id))
      .limit(1);

    if (item.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: item[0]
    });
  } catch (error) {
    console.error('Error fetching portfolio item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio item' },
      { status: 500 }
    );
  }
}

// PUT - Update portfolio item
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, category, imageUrl, featured, tags } = body;

    const updatedItem = await db.update(portfolioItems)
      .set({
        title,
        description,
        category,
        imageUrl,
        featured,
        tags,
        updatedAt: new Date()
      })
      .where(eq(portfolioItems.id, params.id))
      .returning();

    if (updatedItem.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedItem[0]
    });
  } catch (error) {
    console.error('Error updating portfolio item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update portfolio item' },
      { status: 500 }
    );
  }
}

// DELETE - Delete portfolio item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedItem = await db.delete(portfolioItems)
      .where(eq(portfolioItems.id, params.id))
      .returning();

    if (deletedItem.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Portfolio item deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting portfolio item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete portfolio item' },
      { status: 500 }
    );
  }
}
