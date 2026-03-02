import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/config';
import { faqs } from '@/lib/database/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch single FAQ
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const faq = await db.select()
      .from(faqs)
      .where(eq(faqs.id, params.id))
      .limit(1);

    if (faq.length === 0) {
      return NextResponse.json(
        { success: false, error: 'FAQ not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: faq[0]
    });
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch FAQ' },
      { status: 500 }
    );
  }
}

// PUT - Update FAQ
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      question,
      answer,
      category,
      order,
      active
    } = body;

    const updatedFaq = await db.update(faqs)
      .set({
        question,
        answer,
        category,
        order,
        active,
        updatedAt: new Date()
      })
      .where(eq(faqs.id, params.id))
      .returning();

    if (updatedFaq.length === 0) {
      return NextResponse.json(
        { success: false, error: 'FAQ not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedFaq[0]
    });
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update FAQ' },
      { status: 500 }
    );
  }
}

// DELETE - Delete FAQ
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedFaq = await db.delete(faqs)
      .where(eq(faqs.id, params.id))
      .returning();

    if (deletedFaq.length === 0) {
      return NextResponse.json(
        { success: false, error: 'FAQ not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'FAQ deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete FAQ' },
      { status: 500 }
    );
  }
}
