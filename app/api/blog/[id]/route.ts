import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/config';
import { blogPosts } from '@/lib/database/schema';
import { eq } from 'drizzle-orm';

// GET - Fetch single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.id, params.id))
      .limit(1);

    if (post.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Increment views
    const currentViews = post[0]?.views || 0;
    await db.update(blogPosts)
      .set({ views: currentViews + 1 })
      .where(eq(blogPosts.id, params.id));

    return NextResponse.json({
      success: true,
      data: { ...post[0], views: currentViews + 1 }
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT - Update blog post
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      title,
      excerpt,
      content,
      author,
      category,
      tags,
      image,
      featured,
      published,
      readTime
    } = body;

    const updatedPost = await db.update(blogPosts)
      .set({
        title,
        excerpt,
        content,
        author,
        category,
        tags,
        image,
        featured,
        published,
        readTime,
        updatedAt: new Date()
      })
      .where(eq(blogPosts.id, params.id))
      .returning();

    if (updatedPost.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedPost[0]
    });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog post
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deletedPost = await db.delete(blogPosts)
      .where(eq(blogPosts.id, params.id))
      .returning();

    if (deletedPost.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
