import Card from "@/components/ui/Card"

export default function JobCard({ job }: any) {

  return (

    <li>

      <Card>

        <div className="space-y-2">

          <a
            href={job.job_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 font-semibold hover:underline"
          >
            {job.title}
          </a>

          <div className="text-sm text-gray-600">
            {job.company}
          </div>

          {job.match_count > 0 && (

            <div className="flex flex-wrap gap-2 mt-2">

              {job.matched_skills.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}

            </div>

          )}

        </div>

      </Card>

    </li>

  )

}
