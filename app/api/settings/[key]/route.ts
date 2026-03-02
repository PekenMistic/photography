import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/config';
import { settings } from '@/lib/database/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch single setting
export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const setting = await db.select()
      .from(settings)
      .where(eq(settings.key, params.key))
      .limit(1);

    if (setting.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Setting not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: setting[0]
    });
  } catch (error) {
    console.error('Error fetching setting:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch setting' },
      { status: 500 }
    );
  }
}

// PUT - Update setting
export async function PUT(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const body = await request.json();
    const { value, description } = body;

    if (!value) {
      return NextResponse.json(
        { success: false, error: 'Value is required' },
        { status: 400 }
      );
    }

    const updatedSetting = await db.update(settings)
      .set({
        value,
        description,
        updatedAt: new Date()
      })
      .where(eq(settings.key, params.key))
      .returning();

    if (updatedSetting.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Setting not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedSetting[0]
    });
  } catch (error) {
    console.error('Error updating setting:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update setting' },
      { status: 500 }
    );
  }
}

// DELETE - Delete setting
export async function DELETE(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const deletedSetting = await db.delete(settings)
      .where(eq(settings.key, params.key))
      .returning();

    if (deletedSetting.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Setting not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Setting deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting setting:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete setting' },
      { status: 500 }
    );
  }
}
