import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  try {
    const body = await request.json()
    const { message, rating } = body as {
      message?: string
      rating?: number
    }

    if (
      message !== undefined &&
      (typeof message !== "string" || !message.trim())
    ) {
      return NextResponse.json(
        { error: "Message, if provided, must be a non-empty string" },
        { status: 400 },
      )
    }

    if (rating !== undefined) {
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
    }

    if (message === undefined && rating === undefined) {
      return NextResponse.json(
        { error: "At least one of message or rating must be provided" },
        { status: 400 },
      )
    }

    const updated = await prisma.feedback.update({
      where: { id },
      data: {
        ...(message !== undefined ? { message: message.trim() } : {}),
        ...(rating !== undefined ? { rating } : {}),
      },
    })

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      message: updated.message,
      rating: updated.rating,
      anonymous: updated.anonymous,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
      displayName: updated.anonymous ? "Anonymous" : updated.name,
    })
  } catch (error: unknown) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2025") {
      return NextResponse.json({ error: "Feedback not found" }, { status: 404 })
    }

    console.error("Error updating feedback", error)
    return NextResponse.json(
      { error: "Failed to update feedback" },
      { status: 500 },
    )
  }
}
