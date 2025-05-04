import { Review } from '@/types/instructor';
import Link from 'next/link';

interface Props {
  reviews: Review[] | undefined;
}

export default function RecentReviews({ reviews = [] }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm divide-y">
      {reviews.map((review) => (
        <div key={review.id} className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <Link
                href={`/courses/${review.courseId}`}
                className="text-sm font-medium hover:text-blue-600"
              >
                {review.courseName}
              </Link>
              <p className="text-sm text-gray-500">by {review.studentName}</p>
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          
          <p className="mt-2 text-gray-600">{review.comment}</p>
          
          <p className="mt-2 text-xs text-gray-400">
            {new Date(review.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      ))}

      {reviews.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No reviews yet
        </p>
      )}
    </div>
  );
}
