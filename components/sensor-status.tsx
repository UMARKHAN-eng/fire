"use client"

import { useState } from "react"
import { Check, X, AlertTriangle, Settings } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

const sensors = [
  {
    id: "sensor-1",
    name: "Gas Sensor A1",
    type: "Gas",
    location: "Kitchen Area",
    status: "Online",
    battery: 85,
    lastReading: "2023-06-13T06:45:22",
    lastMaintenance: "2023-05-15",
  },
  {
    id: "sensor-2",
    name: "Fire Sensor F1",
    type: "Fire",
    location: "Server Room",
    status: "Online",
    battery: 92,
    lastReading: "2023-06-13T06:45:10",
    lastMaintenance: "2023-05-10",
  },
  {
    id: "sensor-3",
    name: "Earthquake Sensor E1",
    type: "Earthquake",
    location: "Building Foundation",
    status: "Online",
    battery: 78,
    lastReading: "2023-06-13T06:44:55",
    lastMaintenance: "2023-04-22",
  },
  {
    id: "sensor-4",
    name: "Gas Sensor A2",
    type: "Gas",
    location: "Laboratory",
    status: "Warning",
    battery: 35,
    lastReading: "2023-06-13T06:40:12",
    lastMaintenance: "2023-03-15",
  },
  {
    id: "sensor-5",
    name: "Fire Sensor F2",
    type: "Fire",
    location: "Electrical Room",
    status: "Offline",
    battery: 0,
    lastReading: "2023-06-12T14:22:45",
    lastMaintenance: "2023-02-28",
  },
  {
    id: "sensor-6",
    name: "Flood Sensor W1",
    type: "Flood",
    location: "Basement",
    status: "Online",
    battery: 90,
    lastReading: "2023-06-13T06:43:33",
    lastMaintenance: "2023-05-05",
  },
  {
    id: "sensor-7",
    name: "Gas Sensor A3",
    type: "Gas",
    location: "Cafeteria",
    status: "Offline",
    battery: 0,
    lastReading: "2023-06-11T09:15:22",
    lastMaintenance: "2023-04-10",
  },
  {
    id: "sensor-8",
    name: "Wind Sensor W1",
    type: "Wind",
    location: "Rooftop",
    status: "Online",
    battery: 72,
    lastReading: "2023-06-13T06:42:18",
    lastMaintenance: "2023-05-20",
  },
]

export function SensorStatus() {
  const [selectedSensor, setSelectedSensor] = useState(null)
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const handleSensorClick = (sensor) => {
    setSelectedSensor(sensor)
    setOpen(true)
  }

  const filteredSensors =
    activeTab === "all"
      ? sensors
      : sensors.filter((sensor) => {
          if (activeTab === "online") return sensor.status === "Online"
          if (activeTab === "warning") return sensor.status === "Warning"
          if (activeTab === "offline") return sensor.status === "Offline"
          return true
        })

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Sensor Status</CardTitle>
          <CardDescription>Monitor and manage all connected sensors</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Sensors</TabsTrigger>
              <TabsTrigger value="online">Online</TabsTrigger>
              <TabsTrigger value="warning">Warning</TabsTrigger>
              <TabsTrigger value="offline">Offline</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {filteredSensors.map((sensor) => (
                  <div
                    key={sensor.id}
                    className="flex cursor-pointer items-start space-x-4 rounded-md border p-3 transition-colors hover:bg-muted/50"
                    onClick={() => handleSensorClick(sensor)}
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{sensor.name}</p>
                        <Badge
                          variant="outline"
                          className={`${
                            sensor.status === "Online"
                              ? "bg-green-500"
                              : sensor.status === "Warning"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          } text-white`}
                        >
                          {sensor.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">{sensor.location}</p>
                        <p className="text-sm text-muted-foreground">Battery: {sensor.battery}%</p>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last reading: {new Date(sensor.lastReading).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Tabs>
        </CardContent>
      </Card>

      {selectedSensor && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedSensor.name}</DialogTitle>
              <DialogDescription>
                {selectedSensor.type} sensor located at {selectedSensor.location}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Status</Label>
                  <div className="flex items-center space-x-2 pt-1">
                    {selectedSensor.status === "Online" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : selectedSensor.status === "Warning" ? (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                    <span>{selectedSensor.status}</span>
                  </div>
                </div>
                <div>
                  <Label>Battery</Label>
                  <div className="pt-1">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full ${
                            selectedSensor.battery > 60
                              ? "bg-green-500"
                              : selectedSensor.battery > 30
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${selectedSensor.battery}%` }}
                        />
                      </div>
                      <span className="text-sm">{selectedSensor.battery}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Label>Last Reading</Label>
                <div className="pt-1 text-sm">{new Date(selectedSensor.lastReading).toLocaleString()}</div>
              </div>
              <div>
                <Label>Last Maintenance</Label>
                <div className="pt-1 text-sm">{selectedSensor.lastMaintenance}</div>
              </div>
              <div>
                <Label>Threshold Settings</Label>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <Label className="text-xs" htmlFor="warning-threshold">
                      Warning
                    </Label>
                    <Input id="warning-threshold" defaultValue="50" className="h-8" />
                  </div>
                  <div>
                    <Label className="text-xs" htmlFor="critical-threshold">
                      Critical
                    </Label>
                    <Input id="critical-threshold" defaultValue="75" className="h-8" />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex space-x-2 sm:justify-between">
              <Button variant="outline" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                Configure
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline">Test Sensor</Button>
                <Button>Restart Sensor</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
