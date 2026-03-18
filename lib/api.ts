const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

const fetchWithTimeout = async (url: string, timeout = 10000): Promise<Response> => {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(id)
    return res
  } catch (err) {
    clearTimeout(id)
    throw new Error("Timeout ou erro de conexão")
  }
}

export const fetchSafe = async <T = any>(url: string): Promise<T> => {
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetchWithTimeout(url, 10000)

      if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`)
      }

      const text = await res.text()

      try {
        return JSON.parse(text)
      } catch {
        throw new Error("Resposta não é JSON válido (backend pode estar iniciando)")
      }

    } catch (err) {
      console.warn(`Tentativa ${i + 1} falhou`, err)

      if (i === 2) {
        throw new Error("Servidor demorou para responder. Tente novamente em alguns segundos.")
      }

      await delay(2000)
    }
  }

  throw new Error("Falha inesperada")
}