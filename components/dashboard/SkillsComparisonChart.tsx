"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

export default function SkillsComparisonChart({ data }: { data: any[] }) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer>
        <BarChart data={data} barGap={4} barCategoryGap="20%">

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />
          <YAxis />

          <Tooltip />

          {/* Mercado */}
          <Bar
            dataKey="market"
            fill="#7c3aed"
            radius={[4, 4, 0, 0]}
          />

          {/* Busca */}
          <Bar
            dataKey="search"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}