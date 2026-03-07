type Job = {
  title: string
  company: string
  link: string
  score: number
}

export default function JobCard({ job }: { job: Job }) {

  const getColor = (score:number)=>{

    if(score >= 75) return "bg-purple-600"
    if(score >= 50) return "bg-yellow-500"

    return "bg-red-500"

  }

  return (

    <li className="border-b border-gray-200 pb-4">

      <a
        href={job.link}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-purple-700 hover:underline text-lg"
      >
        {job.title}
      </a>

      <p className="text-sm text-gray-500 mb-3">
        {job.company}
      </p>

      <div>

        <div className="flex justify-between text-sm mb-1">

          <span className="text-gray-600">
            Compatibilidade
          </span>

          <span className="font-semibold text-purple-700">
            {job.score}%
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded h-2">

          <div
            className={`${getColor(job.score)} h-2 rounded`}
            style={{ width: `${job.score}%` }}
          />

        </div>

      </div>

    </li>

  )

}