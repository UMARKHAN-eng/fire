"use client"

import { useState } from "react"
import { AlertCircle, AlertTriangle, Flame, Droplets, Wind } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const alerts = [
  {
    id: "alert-1",
    type: "Gas Leak",
    location: "Building A, Floor 2",
    severity: "Critical",
    timestamp: "2023-06-13T06:32:45",
    description: "High concentration of natural gas detected in the kitchen area.",
    icon: AlertCircle,
    color: "text-red-500",
    badgeColor: "bg-red-500",
  },
  {
    id: "alert-2",
    type: "Fire",
    location: "Server Room",
    severity: "Critical",
    timestamp: "2023-06-13T06:15:22",
    description: "Smoke and high temperature detected in the server room.",
    icon: Flame,
    color: "text-orange-500",
    badgeColor: "bg-orange-500",
  },
  {
    id: "alert-3",
    type: "Earthquake",
    location: "All Buildings",
    severity: "High",
    timestamp: "2023-06-13T05:45:10",
    description: "Seismic activity detected. Magnitude 4.5 earthquake.",
    icon: AlertTriangle,
    color: "text-yellow-500",
    badgeColor: "bg-yellow-500",
  },
  {
    id: "alert-4",
    type: "Flood",
    location: "Basement",
    severity: "Medium",
    timestamp: "2023-06-12T22:10:33",
    description: "Water level rising in the basement area.",
    icon: Droplets,
    color: "text-blue-500",
    badgeColor: "bg-blue-500",
  },
  {
    id: "alert-5",
    type: "Strong Wind",
    location: "Rooftop",
    severity: "Low",
    timestamp: "2023-06-12T18:22:15",
    description: "Wind speeds exceeding safety thresholds on the rooftop.",
    icon: Wind,
    color: "text-gray-500",
    badgeColor: "bg-gray-500",
  },
]

export function RecentAlerts() {
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [open, setOpen] = useState(false)

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert)
    setOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Showing the 5 most recent alerts from all sensors</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {alerts.map((alert) => {
                const Icon = alert.icon
                return (
                  <div
                    key={alert.id}
                    className="flex cursor-pointer items-start space-x-4 rounded-md border p-3 transition-colors hover:bg-muted/50"
                    onClick={() => handleAlertClick(alert)}
                  >
                    <Icon className={`mt-1 h-5 w-5 ${alert.color}`} />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{alert.type}</p>
                        <Badge variant="outline" className={`${alert.badgeColor} text-white`}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.location}</p>
                      <p className="text-xs text-muted-foreground">{new Date(alert.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {selectedAlert && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <selectedAlert.icon className={`h-5 w-5 ${selectedAlert.color}`} />
                {selectedAlert.type} Alert - {selectedAlert.severity}
              </DialogTitle>
              <DialogDescription>{new Date(selectedAlert.timestamp).toLocaleString()}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">Location</h4>
                <p className="text-sm text-muted-foreground">{selectedAlert.location}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Description</h4>
                <p className="text-sm text-muted-foreground">{selectedAlert.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Recommended Action</h4>
                <p className="text-sm text-muted-foreground">
                  Evacuate the area immediately and contact emergency services.
                </p>
              </div>
            </div>
            <DialogFooter className="flex space-x-2 sm:justify-between">
              <Button variant="outline">Mark as Resolved</Button>
              <div className="flex space-x-2">
                <Button variant="outline">Send SMS Alert</Button>
                <Button>View Affected Area</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
