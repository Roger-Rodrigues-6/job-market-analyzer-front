"use client"

import { useState, useRef, useEffect } from "react"
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
  const [english,setEnglish] = useState("include")

  const [includeSkills,setIncludeSkills] = useState<string[]>([])
  const [excludeSkills,setExcludeSkills] = useState<string[]>([])
  const [excludeCompanies,setExcludeCompanies] = useState<string[]>([])

  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    const saved = localStorage.getItem("job_search")

    if(!saved) return

    try{

      const data = JSON.parse(saved)

      setQuery(data.query || "")
      setLocation(data.location || "")
      setPeriod(data.period || "24h")
      setRemote(data.remote || "remote")
      setEnglish(data.english || "include")

      setIncludeSkills(data.includeSkills || [])
      setExcludeSkills(data.excludeSkills || [])
      setExcludeCompanies(data.excludeCompanies || [])

    }catch(err){
      console.error("Erro ao carregar busca salva",err)
    }

  }, [])

  const search = async () => {

    setLoading(true)

    try{

      const baseUrl = process.env.NEXT_PUBLIC_API_URL

      if(!baseUrl){
        throw new Error("API não configurada")
      }

      localStorage.setItem(
        "job_search",
        JSON.stringify({
          query,
          location,
          period,
          remote,
          english,
          includeSkills,
          excludeSkills,
          excludeCompanies
        })
      )

      const params = new URLSearchParams()

      if(query) params.append("q",query)

      if(includeSkills.length)
        params.append("include",includeSkills.join(","))

      if(excludeSkills.length)
        params.append("exclude",excludeSkills.join(","))

      if(excludeCompanies.length)
        params.append("exclude_companies",excludeCompanies.join(","))

      if(location)
        params.append("location",location)

      if(period)
        params.append("period",period)

      if(remote)
        params.append("remote",remote)

      if(english)
        params.append("english",english)

      const res = await fetch(`${baseUrl}/search?${params}`)

      if(!res.ok){
        throw new Error("Erro na API")
      }

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

      <header className="bg-white border-b border-gray-200">

        <div className="max-w-4xl mx-auto px-4 py-4">

          <h1 className="text-2xl font-bold text-purple-700">
            Busca e Análise de Vagas
          </h1>

        </div>

      </header>


      <div className="max-w-4xl mx-auto p-4 space-y-6">


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

            <TagInput
              label="Excluir empresas"
              tags={excludeCompanies}
              setTags={setExcludeCompanies}
              placeholder="ex: bairesdev"
              variant="exclude"
            />

            <Input
              label="Localidade"
              value={location}
              placeholder="ex: Brasil"
              onChange={setLocation}
            />

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


            <div>

              <label className="label-base">
                Inglês
              </label>

              <select
                className="input-base"
                value={english}
                onChange={(e)=>setEnglish(e.target.value)}
              >

                <option value="include">
                  Incluir vagas com inglês
                </option>

                <option value="only">
                  Buscar apenas vagas em inglês
                </option>

                <option value="exclude">
                  Remover vagas com inglês
                </option>

              </select>

            </div>


            <Button
              onClick={search}
              loading={loading}
            >
              Buscar vagas
            </Button>

          </div>

        </Card>


        {data && (

          <div ref={resultRef} className="space-y-6">

            <Card>

              <h2 className="text-lg font-semibold text-gray-900">
                {data.total_jobs || 0} vagas encontradas
              </h2>

            </Card>

            <div className="grid md:grid-cols-3 gap-6">


              <div className="md:col-span-2">

                <Card>

                  <h3 className="font-semibold text-gray-900 mb-4">
                    Vagas encontradas
                  </h3>

                  <ul className="space-y-4">

                    {(data.jobs || []).map((job:any,index:number)=>(
                      <JobCard key={index} job={job}/>
                    ))}

                  </ul>

                </Card>

              </div>


              <div>

                <Card>

                  <h3 className="font-semibold mb-3">
                    Análise do mercado
                  </h3>

                  <p className="text-gray-700 mb-4">
                    {data.summary || ""}
                  </p>

                  <h4 className="font-semibold mb-2">
                    Tecnologias mais encontradas
                  </h4>

                  <ul className="text-sm space-y-1">

                    {(data.skills || []).map((skill:any)=>(
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