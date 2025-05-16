import { Skeleton } from "@/components/ui/skeleton"

export default function PremiumLoading() {
  return (
    <div className="container mx-auto py-8 space-y-16">
      {/* Hero Section Skeleton */}
      <section className="relative rounded-2xl overflow-hidden bg-gray-100 h-[400px]">
        <div className="relative z-10 px-8 py-20 flex flex-col items-center text-center">
          <Skeleton className="h-6 w-40 mb-6" />
          <Skeleton className="h-14 w-3/4 max-w-2xl mb-4" />
          <Skeleton className="h-8 w-2/3 max-w-xl mb-10" />
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </section>

      {/* Key Benefits Section Skeleton */}
      <section className="space-y-10">
        <div className="text-center">
          <Skeleton className="h-6 w-32 mx-auto mb-4" />
          <Skeleton className="h-10 w-3/4 max-w-xl mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 max-w-lg mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="border rounded-lg p-6 space-y-4">
                <Skeleton className="h-14 w-14 rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
        </div>

        <div className="flex justify-center">
          <Skeleton className="h-10 w-48" />
        </div>
      </section>

      {/* Pricing Section Skeleton */}
      <section className="space-y-10">
        <div className="text-center">
          <Skeleton className="h-6 w-24 mx-auto mb-4" />
          <Skeleton className="h-10 w-3/4 max-w-xl mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 max-w-lg mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <Skeleton className="h-10 w-full max-w-md" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex-1 border rounded-lg p-6 space-y-6">
                  <div>
                    <Skeleton className="h-6 w-32 mb-4" />
                    <Skeleton className="h-8 w-24 mb-2" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <div className="space-y-3">
                    {Array(5)
                      .fill(0)
                      .map((_, j) => (
                        <div key={j} className="flex items-start">
                          <Skeleton className="h-5 w-5 mr-2 shrink-0" />
                          <Skeleton className="h-5 w-full" />
                        </div>
                      ))}
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Skeleton */}
      <section className="space-y-10">
        <div className="text-center">
          <Skeleton className="h-6 w-32 mx-auto mb-4" />
          <Skeleton className="h-10 w-3/4 max-w-xl mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 max-w-lg mx-auto" />
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[768px]">
            {Array(4)
              .fill(0)
              .map((_, categoryIndex) => (
                <div key={categoryIndex} className="mb-8">
                  <Skeleton className="h-8 w-48 mb-4" />
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="grid grid-cols-12 bg-gray-50 border-b">
                      <div className="col-span-6 p-4">
                        <Skeleton className="h-6 w-24" />
                      </div>
                      <div className="col-span-3 p-4 text-center">
                        <Skeleton className="h-6 w-16 mx-auto" />
                      </div>
                      <div className="col-span-3 p-4 text-center">
                        <Skeleton className="h-6 w-16 mx-auto" />
                      </div>
                    </div>
                    {Array(5)
                      .fill(0)
                      .map((_, featureIndex) => (
                        <div key={featureIndex} className={`grid grid-cols-12 ${featureIndex !== 4 ? "border-b" : ""}`}>
                          <div className="col-span-6 p-4">
                            <Skeleton className="h-5 w-full max-w-xs" />
                          </div>
                          <div className="col-span-3 p-4 flex justify-center">
                            <Skeleton className="h-5 w-5 rounded-full" />
                          </div>
                          <div className="col-span-3 p-4 flex justify-center">
                            <Skeleton className="h-5 w-5 rounded-full" />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Skeleton className="h-10 w-48" />
        </div>
      </section>

      {/* Testimonials Skeleton */}
      <section className="space-y-10">
        <div className="text-center">
          <Skeleton className="h-6 w-32 mx-auto mb-4" />
          <Skeleton className="h-10 w-3/4 max-w-xl mx-auto mb-4" />
          <Skeleton className="h-6 w-2/3 max-w-lg mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="border rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-20 w-20 rounded-full" />
                  <div>
                    <Skeleton className="h-6 w-32 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, j) => (
                      <Skeleton key={j} className="h-5 w-5" />
                    ))}
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="rounded-2xl overflow-hidden bg-gray-100 h-[300px]">
        <div className="relative z-10 px-8 py-16 flex flex-col items-center text-center">
          <Skeleton className="h-10 w-3/4 max-w-xl mx-auto mb-6" />
          <Skeleton className="h-6 w-2/3 max-w-lg mx-auto mb-8" />
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </section>
    </div>
  )
}
