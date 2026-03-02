// components/Reviews.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StarIcon } from "lucide-react"

interface Review {
  id: number
  name: string
  rating: number
  comment: string
  date: string
}

interface ReviewsProps {
  reviews: Review[]
}

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardHeader>
            <CardTitle>{review.name}</CardTitle>
            <CardDescription>{review.date}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-5 w-5 ${
                    star <= review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p>{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
