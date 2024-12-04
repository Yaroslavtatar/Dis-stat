import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { date: "2023-01-01", activeUsers: 400 },
  { date: "2023-01-02", activeUsers: 300 },
  { date: "2023-01-03", activeUsers: 520 },
  { date: "2023-01-04", activeUsers: 450 },
  { date: "2023-01-05", activeUsers: 600 },
  { date: "2023-01-06", activeUsers: 580 },
  { date: "2023-01-07", activeUsers: 650 },
]

export function ActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Активность пользователей</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            activeUsers: {
              label: "Активные пользователи",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="activeUsers" stroke="var(--color-activeUsers)" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

