"use client"

import { useState, useRef } from "react"
import Input from "@/components/Input"
import TagInput from "@/components/TagInput"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import JobCard from "@/components/jobs/JobCard"

export default function Home() {

  const [data,setData] = useState<any>(null)
  const [loading,setLoading] = useState(false)

  const [query,setQuery] = useState("")
  const [location,setLocation] = useState("")
  const [period,setPeriod] = useState("24h")
  const [remote,setRemote] = useState("remote")
  const [english,setEnglish] = useState(false)

  const [includeSkills,setIncludeSkills] = useState<string[]>([])
  const [excludeSkills,setExcludeSkills] = useState<string[]>([])

  const resultRef = useRef<HTMLDivElement>(null)

  const search = async () => {

    setLoading(true)

    try{

      const res = await fetch("http://127.0.0.1:8000/search")
      const json = await res.json()

      setData(json)

      setTimeout(()=>{
        resultRef.current?.scrollIntoView({behavior:"smooth"})
      },100)

    }catch(err){

      console.error("Erro ao buscar vagas",err)

    }finally{

      setLoading(false)

    }

  }

  return (

    <main className="min-h-screen bg-gray-50">

      {/* HEADER */}

      <header className="bg-white border-b border-gray-200">

        <div className="max-w-4xl mx-auto px-4 py-4">

          <h1 className="text-2xl font-bold text-purple-700">
            Busca e Análise de Vagas
          </h1>

        </div>

      </header>


      <div className="max-w-4xl mx-auto p-4 space-y-6">


        {/* FORM */}

        <Card>

          <div className="space-y-4">

            <Input
              label="Cargo ou habilidades"
              value={query}
              placeholder="ex: react remoto"
              onChange={setQuery}
            />

            <TagInput
              label="Incluir habilidades"
              tags={includeSkills}
              setTags={setIncludeSkills}
              placeholder="digite e pressione enter"
            />

            <TagInput
              label="Excluir habilidades"
              tags={excludeSkills}
              setTags={setExcludeSkills}
              placeholder="digite e pressione enter"
              variant="exclude"
            />

            <Input
              label="Localidade"
              value={location}
              placeholder="ex: Brasil"
              onChange={setLocation}
            />

            {/* DATA */}

            <div>

              <label className="label-base">
                Data da vaga
              </label>

              <select
                className="input-base"
                value={period}
                onChange={(e)=>setPeriod(e.target.value)}
              >

                <option value="24h">Últimas 24 horas</option>
                <option value="7d">Última semana</option>

              </select>

            </div>


            {/* MODALIDADE */}

            <div>

              <label className="label-base">
                Modalidade
              </label>

              <select
                className="input-base"
                value={remote}
                onChange={(e)=>setRemote(e.target.value)}
              >

                <option value="remote">Remoto</option>
                <option value="hybrid">Híbrido</option>
                <option value="onsite">Presencial</option>

              </select>

            </div>


            {/* INGLES */}

            <div className="flex items-center">

              <input
                type="checkbox"
                checked={english}
                onChange={()=>setEnglish(!english)}
                className="mr-2 accent-purple-600"
              />

              <span className="text-sm text-gray-800">
                Aceita vagas com exigência de inglês
              </span>

            </div>


            <Button
              onClick={search}
              loading={loading}
            >
              Buscar vagas
            </Button>

          </div>

        </Card>



        {/* RESULTADOS */}

        {data && (

          <div ref={resultRef} className="space-y-6">

            {/* RESUMO */}

            <Card>

              <h2 className="text-lg font-semibold text-gray-900">
                {data.total_jobs} vagas encontradas
              </h2>

            </Card>


            {/* GRID RESULTADOS */}

            <div className="grid md:grid-cols-3 gap-6">


              {/* VAGAS */}

              <div className="md:col-span-2">

                <Card>

                  <h3 className="font-semibold text-gray-900 mb-4">
                    Vagas encontradas
                  </h3>

                  <ul className="space-y-4">

                    {data.jobs.map((job:any,index:number)=>(
                      <JobCard key={index} job={job}/>
                    ))}

                  </ul>

                </Card>

              </div>


              {/* ANALISE */}

              <div>

                <Card>

                  <h3 className="font-semibold mb-3">
                    Análise do mercado
                  </h3>

                  <p className="text-gray-700 mb-4">
                    {data.summary}
                  </p>

                  <h4 className="font-semibold mb-2">
                    Tecnologias mais encontradas
                  </h4>

                  <ul className="text-sm space-y-1">

                    {data.skills.map((skill:any)=>(
                      <li key={skill.name}>
                        {skill.name} - {skill.count}
                      </li>
                    ))}

                  </ul>

                </Card>

              </div>

            </div>

          </div>

        )}

      </div>

    </main>

  )

}