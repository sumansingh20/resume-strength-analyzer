export const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""

export const authHeader = (): Record<string, string> => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token")
    console.log("🔍 AuthHeader - Token from localStorage:", token ? `${token.substring(0, 20)}...` : "null")
    if (token) {
      return { Authorization: `Bearer ${token}` }
    }
  }
  return {}
}

export const jsonHeaders = () => ({
  "Content-Type": "application/json",
  ...authHeader(),
})

export const swrFetcher = async (url: string) => {
  const response = await fetch(url, { headers: authHeader() })
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
  }
  return response.json()
}
