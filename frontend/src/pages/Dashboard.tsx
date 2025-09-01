import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts"

const radarData = [
  { metric: "Skills", score: 72 },
  { metric: "Experience", score: 64 },
  { metric: "ATS", score: 78 },
  { metric: "Impact", score: 55 },
]

const trend = Array.from({ length: 6 }, (_v, i) => ({ month: `M${i + 1}`, score: Math.round(60 + Math.random() * 20) }))

export default function Dashboard() {
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">
          Recent Uploads: <b>3</b>
        </div>
        <div className="p-4 border rounded">
          Avg Strength: <b>68</b>
        </div>
        <div className="p-4 border rounded">
          Missing Skills Found: <b>24</b>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded p-3">
          <h2 className="font-medium mb-2">Sub-score Radar</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <Radar dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="border rounded p-3">
          <h2 className="font-medium mb-2">Strength Trend</h2>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={trend}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#16a34a" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="border rounded p-3">
        <h2 className="font-medium mb-2">Top Missing Skills</h2>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart
              data={[
                { name: "Spring", v: 12 },
                { name: "Docker", v: 8 },
                { name: "Kubernetes", v: 6 },
              ]}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="v" fill="#7c3aed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
