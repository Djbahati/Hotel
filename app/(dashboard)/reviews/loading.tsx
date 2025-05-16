import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ReviewsLoading() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-36" />
          <Skeleton className="h-9 w-36" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ratings Overview Skeleton */}
        <Card className="md:col-span-1">
          <CardHeader>
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-6">
              <div className="text-center">
                <Skeleton className="h-12 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-24 mx-auto mb-2" />
                <Skeleton className="h-4 w-32 mx-auto" />
              </div>
            </div>

            <div className="space-y-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-2 flex-1 mx-2" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                ))}
            </div>

            <Skeleton className="h-1 w-full my-6" />

            <div className="space-y-4">
              <Skeleton className="h-5 w-32 mb-4" />
              <div className="grid grid-cols-2 gap-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i}>
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                      <Skeleton className="h-1 w-full mt-1" />
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List Skeleton */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-48" />
              </div>
              <Skeleton className="h-10 w-full sm:w-64" />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Skeleton className="h-10 flex-1" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-[130px]" />
                <Skeleton className="h-10 w-[130px]" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="border-b pb-4 mb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <Skeleton className="h-10 w-10 rounded-full mr-3" />
                      <div>
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-48 mb-2" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <Skeleton className="h-16 w-full mt-3" />
                  <div className="mt-4 flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
