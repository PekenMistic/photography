import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/config';
import { services } from '@/lib/database/schema';
import { desc, eq, and, SQL } from 'drizzle-orm';

// GET - Fetch all services
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');
    const popular = searchParams.get('popular');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build base query
    const baseQuery = db.select().from(services);

    // Build where conditions
    const whereConditions: SQL[] = [];
    if (active === 'true') {
      whereConditions.push(eq(services.active, true));
    }
    if (popular === 'true') {
      whereConditions.push(eq(services.popular, true));
    }
    if (category && category !== 'all') {
      whereConditions.push(eq(services.category, category));
    }

    // Execute query with or without conditions
    let serviceList;
    if (whereConditions.length === 0) {
      serviceList = await baseQuery
        .orderBy(desc(services.createdAt))
        .limit(limit)
        .offset(offset);
    } else if (whereConditions.length === 1) {
      serviceList = await baseQuery
        .where(whereConditions[0])
        .orderBy(desc(services.createdAt))
        .limit(limit)
        .offset(offset);
    } else {
      serviceList = await baseQuery
        .where(and(...whereConditions))
        .orderBy(desc(services.createdAt))
        .limit(limit)
        .offset(offset);
    }

    return NextResponse.json({
      success: true,
      data: serviceList,
      total: serviceList.length
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

// POST - Create new service
export async function POST(request: NextRequest) {
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

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Service name is required' },
        { status: 400 }
      );
    }

    const newService = await db.insert(services).values({
      name,
      description,
      priceFrom: priceFrom ? priceFrom.toString() : null,
      duration,
      features: features || [],
      category,
      imageUrl,
      popular: popular || false,
      active: active !== false // Default to true
    }).returning();

    return NextResponse.json({
      success: true,
      data: newService[0]
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create service' },
      { status: 500 }
    );
  }
}
