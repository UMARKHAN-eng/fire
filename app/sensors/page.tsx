import { SensorStatus } from "@/components/sensor-status"

export default function SensorsPage() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-6 w-6 text-red-500" />
          <span className="text-lg font-semibold">DisasterAlert</span>
        </div>
        <nav className="ml-auto flex items-center gap-4 md:gap-6">
          <a href="/dashboard" className="text-sm font-medium">
            Dashboard
          </a>
          <a href="/alerts" className="text-sm font-medium">
            Alerts
          </a>
          <a href="/sensors" className="text-sm font-medium text-primary">
            Sensors
          </a>
          <a href="/settings" className="text-sm font-medium">
            Settings
          </a>
        </nav>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            3
          </span>
        </Button>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Sensor Management</h1>
          <Button>Add New Sensor</Button>
        </div>
        <SensorStatus />
      </main>
    </div>
  )
}

import { AlertCircle, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
