import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, message, rating, anonymous } = body as {
      name?: string
      message?: string
      rating?: number
      anonymous?: boolean
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      )
    }

    if (
      typeof rating !== "number" ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        { error: "Rating must be an integer between 1 and 5" },
        { status: 400 },
      )
    }

    const isAnonymous = Boolean(anonymous)

    if (!isAnonymous && (!name || !name.trim())) {
      return NextResponse.json(
        { error: "Name is required when not anonymous" },
        { status: 400 },
      )
    }

    const created = await prisma.feedback.create({
      data: {
        name: isAnonymous ? "Anonymous" : name!.trim(),
        message: message.trim(),
        rating,
        anonymous: isAnonymous,
      },
    })

    return NextResponse.json(
      {
        id: created.id,
        name: created.name,
        message: created.message,
        rating: created.rating,
        anonymous: created.anonymous,
        createdAt: created.createdAt,
        updatedAt: created.updatedAt,
        displayName: created.anonymous ? "Anonymous" : created.name,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating feedback", error)
    return NextResponse.json(
      { error: "Failed to create feedback" },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(
      feedbacks.map((f) => ({
        id: f.id,
        name: f.name,
        message: f.message,
        rating: f.rating,
        anonymous: f.anonymous,
        createdAt: f.createdAt,
        updatedAt: f.updatedAt,
        displayName: f.anonymous ? "Anonymous" : f.name,
      })),
    )
  } catch (error) {
    console.error("Error fetching feedback", error)
    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 },
    )
  }
}
