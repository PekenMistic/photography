import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, rating, review } = body

    // Validate required fields
    if (!name || !email || !rating || !review) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Log the review (in a real app, you'd save to database)
    console.log('New Review Submitted:', {
      name,
      email,
      rating,
      review,
      timestamp: new Date().toISOString()
    })

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json(
      { message: 'Review submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error submitting review:', error)
    return NextResponse.json(
      { message: 'Error submitting review' },
      { status: 500 }
    )
  }
}