"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

const COLORS = [
  "#7c3aed",
  "#6366f1",
  "#3b82f6",
  "#60a5fa",
  "#a78bfa",
  "#c4b5fd"
]

export default function SkillsPieChart({ data }: { data: any[] }) {

  if (!data || !data.length) return null

  return (
    <div className="w-full">

      <div className="flex items-center gap-6">

        {/* LEGENDA (mais estreita) */}
        <div className="hidden md:flex flex-col gap-2 text-sm text-gray-600 w-[28%]">

          {data.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">

              <span
                className="w-3 h-3 rounded"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />

              {/* TEXTO + NÚMERO JUNTOS */}
              <span className="truncate">
                {item.name}{" "}
                <span className="text-xs text-gray-400">
                  {item.count}
                </span>
              </span>

            </div>
          ))}

        </div>

        {/* GRÁFICO (maior) */}
        <div className="h-80 w-[72%]">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="name"
                outerRadius={110} // 👈 maior
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </div>
  )
}