import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/config';
import { messages } from '@/lib/database/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch single message
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const message = await db.select()
      .from(messages)
      .where(eq(messages.id, params.id))
      .limit(1);

    if (message.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: message[0]
    });
  } catch (error) {
    console.error('Error fetching message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch message' },
      { status: 500 }
    );
  }
}

// PUT - Update message
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, status, priority } = body;

    const updatedMessage = await db.update(messages)
      .set({
        name,
        email,
        phone,
        subject,
        message,
        status,
        priority,
        updatedAt: new Date()
      })
      .where(eq(messages.id, params.id))
      .returning();

    if (updatedMessage.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedMessage[0]
    });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

// DELETE - Delete message
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedMessage = await db.delete(messages)
      .where(eq(messages.id, params.id))
      .returning();

    if (deletedMessage.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
