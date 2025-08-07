"use client"

import { useState } from "react"
import { AlertCircle, Bell, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RecentAlerts } from "@/components/recent-alerts"

export default function AlertsPage() {
  const [searchQuery, setSearchQuery] = useState("")

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
          <a href="/alerts" className="text-sm font-medium text-primary">
            Alerts
          </a>
          <a href="/sensors" className="text-sm font-medium">
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
          <h1 className="text-2xl font-semibold">Alert Management</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search alerts..."
                className="w-[200px] pl-8 md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Alert Filters</CardTitle>
              <CardDescription>Filter alerts by type, severity, and date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="grid gap-2">
                  <Label>Alert Type</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="gas">Gas Leak</SelectItem>
                      <SelectItem value="fire">Fire</SelectItem>
                      <SelectItem value="earthquake">Earthquake</SelectItem>
                      <SelectItem value="flood">Flood</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Severity</Label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Time Period</Label>
                  <Select defaultValue="24h">
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full md:w-[300px]">
            <CardHeader>
              <CardTitle>Alert Statistics</CardTitle>
              <CardDescription>Summary of recent alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Alerts (24h)</span>
                  <Badge variant="secondary">18</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Critical Alerts</span>
                  <Badge variant="destructive">5</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Resolved</span>
                  <Badge variant="outline" className="bg-green-500 text-white">
                    10
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending</span>
                  <Badge variant="outline" className="bg-yellow-500 text-white">
                    8
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Alerts</TabsTrigger>
            <TabsTrigger value="history">Alert History</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            <RecentAlerts />
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Alert History</CardTitle>
                <CardDescription>View all past alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10 text-muted-foreground">
                  Historical alert data will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="resolved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resolved Alerts</CardTitle>
                <CardDescription>Alerts that have been resolved</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10 text-muted-foreground">
                  Resolved alert data will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function Label({ children, className, ...props }) {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </label>
  )
}
