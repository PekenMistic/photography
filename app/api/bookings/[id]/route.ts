import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/config';
import { bookings } from '@/lib/database/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch single booking
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await db.select()
      .from(bookings)
      .where(eq(bookings.id, params.id))
      .limit(1);

    if (booking.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking[0]
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

// PUT - Update booking
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      clientName,
      email,
      phone,
      eventType,
      eventDate,
      eventTime,
      location,
      duration,
      price,
      status,
      notes,
      serviceId
    } = body;

    const updatedBooking = await db.update(bookings)
      .set({
        clientName,
        email,
        phone,
        eventType,
        eventDate,
        eventTime,
        location,
        duration,
        price: price ? price.toString() : null,
        status,
        notes,
        serviceId,
        updatedAt: new Date()
      })
      .where(eq(bookings.id, params.id))
      .returning();

    if (updatedBooking.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedBooking[0]
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// DELETE - Delete booking
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedBooking = await db.delete(bookings)
      .where(eq(bookings.id, params.id))
      .returning();

    if (deletedBooking.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}
