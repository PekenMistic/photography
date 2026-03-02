import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database/config';
import { blogPosts } from '@/lib/database/schema';
import { eq, desc, and } from 'drizzle-orm';

// GET - Fetch all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    // Build query with filters
    let posts;

    if (published === 'true' && category && featured === 'true') {
      posts = await db.select().from(blogPosts)
        .where(and(
          eq(blogPosts.published, true),
          eq(blogPosts.category, category),
          eq(blogPosts.featured, true)
        ))
        .orderBy(desc(blogPosts.createdAt));
    } else if (published === 'true' && category) {
      posts = await db.select().from(blogPosts)
        .where(and(
          eq(blogPosts.published, true),
          eq(blogPosts.category, category)
        ))
        .orderBy(desc(blogPosts.createdAt));
    } else if (published === 'true' && featured === 'true') {
      posts = await db.select().from(blogPosts)
        .where(and(
          eq(blogPosts.published, true),
          eq(blogPosts.featured, true)
        ))
        .orderBy(desc(blogPosts.createdAt));
    } else if (category && featured === 'true') {
      posts = await db.select().from(blogPosts)
        .where(and(
          eq(blogPosts.category, category),
          eq(blogPosts.featured, true)
        ))
        .orderBy(desc(blogPosts.createdAt));
    } else if (published === 'true') {
      posts = await db.select().from(blogPosts)
        .where(eq(blogPosts.published, true))
        .orderBy(desc(blogPosts.createdAt));
    } else if (category) {
      posts = await db.select().from(blogPosts)
        .where(eq(blogPosts.category, category))
        .orderBy(desc(blogPosts.createdAt));
    } else if (featured === 'true') {
      posts = await db.select().from(blogPosts)
        .where(eq(blogPosts.featured, true))
        .orderBy(desc(blogPosts.createdAt));
    } else {
      posts = await db.select().from(blogPosts)
        .orderBy(desc(blogPosts.createdAt));
    }

    return NextResponse.json({
      success: true,
      data: posts
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
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

    if (!title || !content || !author) {
      return NextResponse.json(
        { success: false, error: 'Title, content, and author are required' },
        { status: 400 }
      );
    }

    const newPost = await db.insert(blogPosts).values({
      title,
      excerpt: excerpt || '',
      content,
      author,
      date: new Date().toISOString().split('T')[0], // Add required date field
      category: category || 'General',
      tags: tags || [],
      image: image || '/placeholder.svg?height=400&width=600',
      featured: featured || false,
      published: published !== false, // Default to true
      readTime: readTime || '5 min read',
      views: 0,
      likes: 0
    }).returning();

    return NextResponse.json({
      success: true,
      data: newPost[0]
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
