"use client"

import SkillsPieChart from "@/components/dashboard/SkillsPieChart"
import SkillsComparisonChart from "@/components/dashboard/SkillsComparisonChart"
import { useState } from "react"
import Card from "@/components/ui/Card"

const mockSkills = [
  { name: "React", count: 42 },
  { name: "TypeScript", count: 35 },
  { name: "Node.js", count: 28 },
  { name: "Next.js", count: 20 },
  { name: "Docker", count: 18 },
  { name: "AWS", count: 14 },
]

const mockComparison = [
  { name: "React", market: 42, search: 30 },
  { name: "TypeScript", market: 35, search: 22 },
  { name: "Node.js", market: 28, search: 18 },
  { name: "Next.js", market: 20, search: 25 },
  { name: "Docker", market: 18, search: 8 },
  { name: "AWS", market: 14, search: 5 },
]

export default function AnalisePage() {

  const [cargo, setCargo] = useState("")
  const [localidade, setLocalidade] = useState("")
  const [modalidade, setModalidade] = useState<string[]>([])

  const hasFilters = cargo || localidade || modalidade.length

  return (
    <main className="min-h-screen">

      <div className="max-w-5xl mx-auto p-4 space-y-6">

        {/* FILTROS */}
        <Card>
          <div className="space-y-4">

            <input
              className="input-base"
              placeholder="Cargo (ex: Backend)"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
            />

            <input
              className="input-base"
              placeholder="Localidade (ex: Brasil)"
              value={localidade}
              onChange={(e) => setLocalidade(e.target.value)}
            />

            <div>
              <label className="label-base">Modalidade</label>

              <div className="flex gap-4 mt-2">

                {["remoto", "híbrido", "presencial"].map((m) => (
                  <label key={m} className="flex items-center gap-2 text-sm">

                    <input
                      type="checkbox"
                      checked={modalidade.includes(m)}
                      onChange={() => {
                        if (modalidade.includes(m)) {
                          setModalidade(modalidade.filter(x => x !== m))
                        } else {
                          setModalidade([...modalidade, m])
                        }
                      }}
                    />

                    {m}
                  </label>
                ))}

              </div>
            </div>

          </div>
        </Card>

        {/* ESTADO VAZIO */}
        {!hasFilters && (
          <Card>
            <h2 className="text-lg font-semibold mb-2">
              Análise de mercado
            </h2>

            <p className="text-gray-600 text-sm">
              Selecione um cargo ou filtros para visualizar as tecnologias mais
              pedidas nas vagas e a comparação com as buscas dos usuários.
            </p>
          </Card>
        )}

        {/* RESULTADOS */}
        {hasFilters && (
          <>
            {/* PIZZA + TEXTO */}
            <Card>

              <h2 className="font-semibold mb-4">
                Tecnologias mais encontradas
              </h2>

              <div className="grid md:grid-cols-3 gap-6">

                {/* GRÁFICO + LEGENDA */}
                <div className="md:col-span-2">
                  <SkillsPieChart data={mockSkills} />
                </div>

                {/* TEXTO */}
                <div className="text-sm text-gray-700 space-y-3">

                  <p>
                    As tecnologias mais presentes nas vagas são{" "}
                    <strong>React</strong>, <strong>TypeScript</strong> e{" "}
                    <strong>Node.js</strong>.
                  </p>

                  <p>
                    Isso indica uma forte demanda por stacks modernas de
                    desenvolvimento web, especialmente voltadas para aplicações
                    escaláveis.
                  </p>

                  <p className="text-xs text-gray-500">
                    As informações são baseadas nas vagas analisadas para os filtros selecionados.
                  </p>

                </div>

              </div>

            </Card>

            {/* COMPARAÇÃO + TEXTO */}
            <Card>

              <h2 className="font-semibold mb-2">
                Comparação: mercado vs busca
              </h2>

              <div className="grid md:grid-cols-3 gap-6">

                {/* GRÁFICO */}
                <div className="md:col-span-2">

                  {/* LEGENDA */}
                  <div className="flex gap-4 text-xs text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-purple-600 rounded"></span>
                      Mercado
                    </span>

                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-blue-500 rounded"></span>
                      Busca
                    </span>
                  </div>

                  <SkillsComparisonChart data={mockComparison} />

                </div>

                {/* TEXTO */}
                <div className="text-sm text-gray-700 space-y-3">

                  <p>
                    Para <strong>{cargo || "o cargo selecionado"}</strong>, o mercado
                    mostra maior demanda por <strong>Node.js</strong> e{" "}
                    <strong>Docker</strong>.
                  </p>

                  <p>
                    Já nas buscas, tecnologias como <strong>Docker</strong> e{" "}
                    <strong>AWS</strong> aparecem com menor frequência,
                    indicando uma possível oportunidade de aprendizado.
                  </p>

                  <p className="text-xs text-gray-500">
                    Essa análise evidencia diferenças entre o que o mercado exige
                    e o que os profissionais estão priorizando.
                  </p>

                </div>

              </div>

            </Card>
          </>
        )}

      </div>

    </main>
  )
}