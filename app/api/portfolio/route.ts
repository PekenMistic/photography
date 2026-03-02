import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/config';
import { portfolioItems } from '@/lib/database/schema';
import { desc, eq, and, ilike, SQL } from 'drizzle-orm';

// GET - Fetch all portfolio items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build base query
    const baseQuery = db.select().from(portfolioItems);

    // Build where conditions
    const whereConditions: SQL[] = [];
    if (category && category !== 'All') {
      whereConditions.push(eq(portfolioItems.category, category));
    }
    if (featured === 'true') {
      whereConditions.push(eq(portfolioItems.featured, true));
    }
    if (search) {
      whereConditions.push(ilike(portfolioItems.title, `%${search}%`));
    }

    // Execute query with or without conditions
    let items;
    if (whereConditions.length === 0) {
      items = await baseQuery
        .orderBy(desc(portfolioItems.createdAt))
        .limit(limit)
        .offset(offset);
    } else if (whereConditions.length === 1) {
      items = await baseQuery
        .where(whereConditions[0])
        .orderBy(desc(portfolioItems.createdAt))
        .limit(limit)
        .offset(offset);
    } else {
      items = await baseQuery
        .where(and(...whereConditions))
        .orderBy(desc(portfolioItems.createdAt))
        .limit(limit)
        .offset(offset);
    }

    return NextResponse.json({
      success: true,
      data: items,
      total: items.length
    });
  } catch (error) {
    console.error('Error fetching portfolio items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio items' },
      { status: 500 }
    );
  }
}

// POST - Create new portfolio item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, category, imageUrl, featured, tags } = body;

    if (!title || !category || !imageUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newItem = await db.insert(portfolioItems).values({
      title,
      description,
      category,
      imageUrl,
      featured: featured || false,
      tags: tags || [],
    }).returning();

    return NextResponse.json({
      success: true,
      data: newItem[0]
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating portfolio item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create portfolio item' },
      { status: 500 }
    );
  }
}
