import { NextResponse } from 'next/server';
import { db } from '@/lib/database/config';
import { portfolioItems, bookings, messages, reviews } from '@/lib/database/schema';
import { count, sum, avg, eq } from 'drizzle-orm';

// GET - Fetch dashboard statistics
export async function GET() {
  try {
    // Get total counts
    const [portfolioCount] = await db.select({ count: count() }).from(portfolioItems);
    const [bookingCount] = await db.select({ count: count() }).from(bookings);
    const [messageCount] = await db.select({ count: count() }).from(messages);
    const [reviewCount] = await db.select({ count: count() }).from(reviews);

    // Get unread messages count
    const [unreadMessagesCount] = await db
      .select({ count: count() })
      .from(messages)
      .where(eq(messages.status, 'unread'));

    // Get pending bookings count
    const [pendingBookingsCount] = await db
      .select({ count: count() })
      .from(bookings)
      .where(eq(bookings.status, 'pending'));

    // Get total revenue
    const [revenueResult] = await db
      .select({ total: sum(bookings.price) })
      .from(bookings)
      .where(eq(bookings.status, 'completed'));

    // Get average rating
    const [ratingResult] = await db
      .select({ average: avg(reviews.rating) })
      .from(reviews)
      .where(eq(reviews.approved, true));

    // Get recent bookings
    const recentBookings = await db
      .select({
        id: bookings.id,
        clientName: bookings.clientName,
        eventType: bookings.eventType,
        eventDate: bookings.eventDate,
        status: bookings.status,
        price: bookings.price
      })
      .from(bookings)
      .orderBy(bookings.createdAt)
      .limit(5);

    // Get booking status distribution
    const bookingStatusStats = await db
      .select({
        status: bookings.status,
        count: count()
      })
      .from(bookings)
      .groupBy(bookings.status);

    // Get monthly revenue (last 6 months)
    const monthlyRevenue = await db
      .select({
        month: bookings.eventDate,
        revenue: sum(bookings.price)
      })
      .from(bookings)
      .where(eq(bookings.status, 'completed'))
      .groupBy(bookings.eventDate)
      .limit(6);

    const stats = {
      totalPortfolioItems: portfolioCount.count,
      totalBookings: bookingCount.count,
      totalMessages: messageCount.count,
      totalReviews: reviewCount.count,
      unreadMessages: unreadMessagesCount.count,
      pendingBookings: pendingBookingsCount.count,
      totalRevenue: parseFloat(revenueResult.total || '0'),
      averageRating: parseFloat(ratingResult.average || '0'),
      recentBookings,
      bookingStatusStats,
      monthlyRevenue
    };

    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
