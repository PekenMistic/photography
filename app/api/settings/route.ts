import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/config';
import { settings } from '@/lib/database/schema';

// GET - Fetch all settings
export async function GET() {
  try {
    const settingsList = await db.select().from(settings);

    return NextResponse.json({
      success: true,
      data: settingsList
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

// POST - Create new setting
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value, description } = body;

    if (!key || !value) {
      return NextResponse.json(
        { success: false, error: 'Key and value are required' },
        { status: 400 }
      );
    }

    const newSetting = await db.insert(settings).values({
      key,
      value,
      description: description || ''
    }).returning();

    return NextResponse.json({
      success: true,
      data: newSetting[0]
    });
  } catch (error) {
    console.error('Error creating setting:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create setting' },
      { status: 500 }
    );
  }
}
