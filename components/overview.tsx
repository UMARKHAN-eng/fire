"use client"

import {
  AreaChart as RechartsAreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function Overview() {
  const sensorData = [
    { time: "00:00", gas: 20, fire: 5, earthquake: 0 },
    { time: "03:00", gas: 15, fire: 5, earthquake: 0 },
    { time: "06:00", gas: 18, fire: 6, earthquake: 0 },
    { time: "09:00", gas: 25, fire: 7, earthquake: 0 },
    { time: "12:00", gas: 35, fire: 10, earthquake: 0 },
    { time: "15:00", gas: 45, fire: 15, earthquake: 1 },
    { time: "18:00", gas: 60, fire: 25, earthquake: 2 },
    { time: "21:00", gas: 40, fire: 16, earthquake: 0 },
    { time: "24:00", gas: 30, fire: 10, earthquake: 0 },
  ]

  const alertData = [
    { name: "Gas Leak", value: 12 },
    { name: "Fire", value: 8 },
    { name: "Earthquake", value: 3 },
    { name: "Flood", value: 5 },
    { name: "Other", value: 2 },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Sensor Activity</CardTitle>
          <CardDescription>Sensor readings over the last 24 hours</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartContainer
            config={{
              gas: {
                label: "Gas Level",
                color: "hsl(142.1 76.2% 36.3%)", // green-600
              },
              fire: {
                label: "Fire Risk",
                color: "hsl(0 84.2% 60.2%)", // red-500
              },
              earthquake: {
                label: "Seismic Activity",
                color: "hsl(48 96.5% 53.1%)", // yellow-400
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsAreaChart data={sensorData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-gas)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-gas)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorFire" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-fire)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-fire)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEarthquake" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-earthquake)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-earthquake)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="gas" stroke="var(--color-gas)" fillOpacity={1} fill="url(#colorGas)" />
                <Area
                  type="monotone"
                  dataKey="fire"
                  stroke="var(--color-fire)"
                  fillOpacity={1}
                  fill="url(#colorFire)"
                />
                <Area
                  type="monotone"
                  dataKey="earthquake"
                  stroke="var(--color-earthquake)"
                  fillOpacity={1}
                  fill="url(#colorEarthquake)"
                />
              </RechartsAreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Alert Distribution</CardTitle>
          <CardDescription>Alerts by type in the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: {
                label: "Number of Alerts",
                color: "hsl(0 84.2% 60.2%)", // red-500
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={alertData} margin={{ top: 10, right: 30, left: 20, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
