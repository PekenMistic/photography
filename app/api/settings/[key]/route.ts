import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/config';
import { settings } from '@/lib/database/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const setting = await db.select().from(settings).where(eq(settings.key, params.key)).limit(1);
    if (setting.length === 0) {
      return NextResponse.json({ success: false, error: 'Setting not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: setting[0] });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch setting' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const body = await request.json();
    const { value, description } = body;

    // FIX: value === undefined check, bukan !value (supaya "false"/"0" tetap valid)
    if (value === undefined || value === null) {
      return NextResponse.json({ success: false, error: 'Value is required' }, { status: 400 });
    }

    // Upsert: update kalau ada, insert kalau belum ada
    const existing = await db.select().from(settings).where(eq(settings.key, params.key)).limit(1);

    if (existing.length === 0) {
      const created = await db.insert(settings).values({
        key: params.key,
        value: String(value),
        description: description || '',
      }).returning();
      return NextResponse.json({ success: true, data: created[0] });
    }

    const updated = await db.update(settings)
      .set({ value: String(value), description, updatedAt: new Date() })
      .where(eq(settings.key, params.key))
      .returning();

    return NextResponse.json({ success: true, data: updated[0] });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update setting' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const deleted = await db.delete(settings).where(eq(settings.key, params.key)).returning();
    if (deleted.length === 0) {
      return NextResponse.json({ success: false, error: 'Setting not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Setting deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete setting' }, { status: 500 });
  }
}
