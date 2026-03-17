const API_URL = "https://job-market-analyzer-backend.onrender.com";

export async function searchJobs(params: {
  q?: string;
  include?: string;
  exclude?: string;
  location?: string;
  remote?: string;
}) {
  const query = new URLSearchParams(params as any).toString();

  const res = await fetch(`${API_URL}/search?${query}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar vagas");
  }

  return res.json();
}