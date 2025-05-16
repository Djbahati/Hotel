import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function BookingLoading() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64 mt-2" />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          {/* Step Indicator */}
          <div className="mb-6">
            <div className="flex items-center">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-1 flex-1 mx-2" />
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-1 flex-1 mx-2" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>
            <div className="flex justify-between mt-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* Search Form */}
          <Card className="mb-6">
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </CardContent>
            <div className="p-6 flex justify-between border-t">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-10 w-32" />
            </div>
          </Card>

          {/* Room Cards */}
          <div className="space-y-6">
            <Skeleton className="h-6 w-48" />

            {Array(3)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="md:flex">
                    <Skeleton className="h-48 md:h-auto md:w-1/3" />
                    <div className="p-4 md:w-2/3">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                      <Skeleton className="h-4 w-full mt-2" />
                      <Skeleton className="h-4 w-5/6 mt-1" />

                      <div className="flex flex-wrap gap-2 mt-3">
                        {Array(4)
                          .fill(0)
                          .map((_, j) => (
                            <Skeleton key={j} className="h-6 w-24" />
                          ))}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-10 w-32" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80">
          <Card className="mb-6">
            <CardHeader>
              <Skeleton className="h-6 w-36" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}

              <Skeleton className="h-1 w-full" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>

              <Skeleton className="h-1 w-full" />

              <div className="flex justify-between">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-24" />
              </div>

              <div className="pt-2">
                <Skeleton className="h-4 w-24 mb-2" />
                <div className="flex space-x-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mt-2" />
                    <div className="flex justify-between items-center mt-3">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
