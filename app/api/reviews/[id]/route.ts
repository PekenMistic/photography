import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/config';
import { reviews } from '@/lib/database/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch single review
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const review = await db.select()
      .from(reviews)
      .where(eq(reviews.id, params.id))
      .limit(1);

    if (review.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: review[0]
    });
  } catch (error) {
    console.error('Error fetching review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch review' },
      { status: 500 }
    );
  }
}

// PUT - Update review
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      clientName,
      email,
      rating,
      title,
      content,
      serviceType,
      location,
      imageUrl,
      videoUrl,
      featured,
      approved,
      bookingId
    } = body;

    const updatedReview = await db.update(reviews)
      .set({
        clientName,
        email,
        rating,
        title,
        content,
        serviceType,
        location,
        imageUrl,
        videoUrl,
        featured,
        approved,
        bookingId,
        updatedAt: new Date()
      })
      .where(eq(reviews.id, params.id))
      .returning();

    if (updatedReview.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedReview[0]
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

// DELETE - Delete review
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedReview = await db.delete(reviews)
      .where(eq(reviews.id, params.id))
      .returning();

    if (deletedReview.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
