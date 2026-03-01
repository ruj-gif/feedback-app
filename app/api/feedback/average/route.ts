import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const aggregate = await prisma.feedback.aggregate({
      _avg: { rating: true },
      _count: { _all: true },
    })

    const averageRating = aggregate._avg.rating ?? 0

    return NextResponse.json({
      averageRating: Number(averageRating.toFixed(2)),
      totalFeedbacks: aggregate._count._all,
    })
  } catch (error) {
    console.error("Error calculating average rating", error)
    return NextResponse.json(
      { error: "Failed to calculate average rating" },
      { status: 500 },
    )
  }
}
