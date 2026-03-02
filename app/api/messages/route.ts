import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/config';
import { messages } from '@/lib/database/schema';
import { desc, eq, and, ilike, SQL } from 'drizzle-orm';

// GET - Fetch all messages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build base query
    const baseQuery = db.select().from(messages);

    // Build where conditions
    const whereConditions: SQL[] = [];
    if (status && status !== 'all') {
      whereConditions.push(eq(messages.status, status));
    }
    if (priority && priority !== 'all') {
      whereConditions.push(eq(messages.priority, priority));
    }
    if (search) {
      whereConditions.push(ilike(messages.subject, `%${search}%`));
    }

    // Execute query with or without conditions
    let messageList;
    if (whereConditions.length === 0) {
      messageList = await baseQuery
        .orderBy(desc(messages.createdAt))
        .limit(limit)
        .offset(offset);
    } else if (whereConditions.length === 1) {
      messageList = await baseQuery
        .where(whereConditions[0])
        .orderBy(desc(messages.createdAt))
        .limit(limit)
        .offset(offset);
    } else {
      messageList = await baseQuery
        .where(and(...whereConditions))
        .orderBy(desc(messages.createdAt))
        .limit(limit)
        .offset(offset);
    }

    return NextResponse.json({
      success: true,
      data: messageList,
      total: messageList.length
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// POST - Create new message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message, priority } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newMessage = await db.insert(messages).values({
      name,
      email,
      phone,
      subject,
      message,
      priority: priority || 'normal',
      status: 'unread'
    }).returning();

    return NextResponse.json({
      success: true,
      data: newMessage[0]
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create message' },
      { status: 500 }
    );
  }
}
