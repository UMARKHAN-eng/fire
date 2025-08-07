"use client"

import { useState } from "react"
import { AlertCircle, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [twilioSettings, setTwilioSettings] = useState({
    accountSid: "AC1234567890abcdef1234567890abcdef",
    authToken: "••••••••••••••••••••••••••••••••",
    fromNumber: "+15551234567",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    smsEnabled: true,
    emailEnabled: true,
    pushEnabled: true,
    smsThreshold: "high",
    emailThreshold: "medium",
    pushThreshold: "low",
  })

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
          <a href="/sensors" className="text-sm font-medium">
            Sensors
          </a>
          <a href="/settings" className="text-sm font-medium text-primary">
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
          <h1 className="text-2xl font-semibold">System Settings</h1>
        </div>
        <Tabs defaultValue="notifications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how and when alerts are sent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications" className="text-base">
                        SMS Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Receive alerts via SMS text messages</p>
                    </div>
                    <Switch
                      id="sms-notifications"
                      checked={notificationSettings.smsEnabled}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, smsEnabled: checked })
                      }
                    />
                  </div>
                  {notificationSettings.smsEnabled && (
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="sms-threshold">Minimum severity for SMS alerts</Label>
                      <Select
                        value={notificationSettings.smsThreshold}
                        onValueChange={(value) =>
                          setNotificationSettings({ ...notificationSettings, smsThreshold: value })
                        }
                      >
                        <SelectTrigger id="sms-threshold" className="w-full">
                          <SelectValue placeholder="Select threshold" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical only</SelectItem>
                          <SelectItem value="high">High and above</SelectItem>
                          <SelectItem value="medium">Medium and above</SelectItem>
                          <SelectItem value="low">All alerts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="text-base">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notificationSettings.emailEnabled}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, emailEnabled: checked })
                      }
                    />
                  </div>
                  {notificationSettings.emailEnabled && (
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="email-threshold">Minimum severity for email alerts</Label>
                      <Select
                        value={notificationSettings.emailThreshold}
                        onValueChange={(value) =>
                          setNotificationSettings({ ...notificationSettings, emailThreshold: value })
                        }
                      >
                        <SelectTrigger id="email-threshold" className="w-full">
                          <SelectValue placeholder="Select threshold" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical only</SelectItem>
                          <SelectItem value="high">High and above</SelectItem>
                          <SelectItem value="medium">Medium and above</SelectItem>
                          <SelectItem value="low">All alerts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications" className="text-base">
                        Push Notifications
                      </Label>
                      <p className="text-sm text-muted-foreground">Receive alerts via mobile app push notifications</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notificationSettings.pushEnabled}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({ ...notificationSettings, pushEnabled: checked })
                      }
                    />
                  </div>
                  {notificationSettings.pushEnabled && (
                    <div className="ml-6 space-y-2">
                      <Label htmlFor="push-threshold">Minimum severity for push notifications</Label>
                      <Select
                        value={notificationSettings.pushThreshold}
                        onValueChange={(value) =>
                          setNotificationSettings({ ...notificationSettings, pushThreshold: value })
                        }
                      >
                        <SelectTrigger id="push-threshold" className="w-full">
                          <SelectValue placeholder="Select threshold" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical only</SelectItem>
                          <SelectItem value="high">High and above</SelectItem>
                          <SelectItem value="medium">Medium and above</SelectItem>
                          <SelectItem value="low">All alerts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="integrations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Twilio Integration</CardTitle>
                <CardDescription>Configure SMS notifications via Twilio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="account-sid">Account SID</Label>
                  <Input
                    id="account-sid"
                    value={twilioSettings.accountSid}
                    onChange={(e) => setTwilioSettings({ ...twilioSettings, accountSid: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="auth-token">Auth Token</Label>
                  <Input
                    id="auth-token"
                    type="password"
                    value={twilioSettings.authToken}
                    onChange={(e) => setTwilioSettings({ ...twilioSettings, authToken: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="from-number">From Number</Label>
                  <Input
                    id="from-number"
                    value={twilioSettings.fromNumber}
                    onChange={(e) => setTwilioSettings({ ...twilioSettings, fromNumber: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Test Connection</Button>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Firebase Integration</CardTitle>
                <CardDescription>Configure Firebase for real-time data and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="firebase-api-key">API Key</Label>
                  <Input id="firebase-api-key" type="password" value="••••••••••••••••••••••••••••••••" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="firebase-project-id">Project ID</Label>
                  <Input id="firebase-project-id" value="disaster-alert-system" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage system users and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10 text-muted-foreground">
                  User management interface will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="system" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Configure system-wide settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10 text-muted-foreground">
                  System configuration options will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
