import { fetchSafe } from "@/lib/api"

const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  throw new Error("API_URL não definida")
}

export async function searchJobs(params: {
  q?: string
  include?: string
  exclude?: string
  location?: string
  remote?: string
  period?: string
  english?: string
}) {
  const query = new URLSearchParams(params as any).toString()

  const url = `${API_URL}/search?${query}`

  return fetchSafe(url)
}