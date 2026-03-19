"use client"

import { usePathname, useRouter } from "next/navigation"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()

  const isAnalysis = pathname === "/analise"

  const action = isAnalysis
    ? {
        label: "Buscar vagas",
        onClick: () => router.push("/"),
      }
    : {
        label: "Ver análise",
        onClick: () => router.push("/analise"),
      }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">

        <h1
          onClick={() => router.push("/")}
          className="text-xl md:text-2xl font-bold text-purple-700 cursor-pointer"
        >
          Busca e Análise de Vagas
        </h1>

        <button
          onClick={action.onClick}
          className="
            cursor-pointer
            text-sm font-medium
            px-4 py-1.5
            rounded-full
            bg-purple-600 text-white
            hover:bg-purple-700
            transition
          "
        >
          {action.label}
        </button>

      </div>
    </header>
  )
}