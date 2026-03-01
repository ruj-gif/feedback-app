const API_BASE = process.env.NEXT_PUBLIC_API_URL!

export async function getFeedbacks() {
  const res = await fetch(`${API_BASE}/feedback/`)
  return res.json()
}

export async function submitFeedback(data: { name: string; message: string; rating: number; anonymous: boolean }) {
  await fetch(`${API_BASE}/feedback/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
}