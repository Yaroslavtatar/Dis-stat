import { ServerStats } from "@/components/server-stats"
import { ActivityChart } from "@/components/activity-chart"

export default function Home() {
  // В реальном приложении эти данные должны быть получены с сервера
  const serverStats = {
    memberCount: 1234,
    messageCount: 56789,
    channelCount: 20,
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Обзор сервера</h1>
      <ServerStats {...serverStats} />
      <div className="mt-8">
        <ActivityChart />
      </div>
    </div>
  )
}

