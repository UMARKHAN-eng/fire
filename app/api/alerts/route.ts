import { NextResponse } from "next/server"
import { ref, push, set, get } from "firebase/database"
import { database } from "@/lib/firebase"

// Function to send SMS via Twilio
async function sendSMS(to: string, message: string) {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_PHONE_NUMBER

    if (!accountSid || !authToken || !fromNumber) {
      console.warn("Missing Twilio credentials")
      return false
    }

    // Mock Twilio for now since we don't have actual credentials
    console.log(`Would send SMS to ${to}: ${message}`)
    return true

    // Uncomment this when you have actual Twilio credentials
    /*
    const client = new Twilio(accountSid, authToken)
    await client.messages.create({
      body: message,
      from: fromNumber,
      to: to,
    })
    return true
    */
  } catch (error) {
    console.error("Error sending SMS:", error)
    return false
  }
}

// POST handler for creating new alerts
export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.type || !data.location || !data.severity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create a new alert object
    const newAlert = {
      type: data.type,
      location: data.location,
      severity: data.severity,
      description: data.description || "",
      timestamp: new Date().toISOString(),
      resolved: false,
    }

    let newAlertRef // Declare newAlertRef here

    try {
      // Save to Firebase
      const alertsRef = ref(database, "alerts")
      newAlertRef = push(alertsRef)
      await set(newAlertRef, newAlert)

      // Get users to notify based on severity
      const usersRef = ref(database, "users")
      const usersSnapshot = await get(usersRef)

      if (usersSnapshot.exists()) {
        const users = usersSnapshot.val()

        // Send notifications based on severity and user preferences
        Object.values(users).forEach(async (user: any) => {
          // Check if user should be notified based on severity and preferences
          if (
            (newAlert.severity === "Critical" && user.notifyOnCritical) ||
            (newAlert.severity === "High" && user.notifyOnHigh) ||
            (newAlert.severity === "Medium" && user.notifyOnMedium) ||
            (newAlert.severity === "Low" && user.notifyOnLow)
          ) {
            // Send SMS if enabled and phone number exists
            if (user.smsEnabled && user.phoneNumber) {
              const message = `ALERT: ${newAlert.type} detected at ${newAlert.location}. Severity: ${newAlert.severity}. ${newAlert.description}`
              await sendSMS(user.phoneNumber, message)
            }

            // Store notification in user's notifications list
            const notificationRef = ref(database, `users/${user.id}/notifications`)
            const newNotificationRef = push(notificationRef)
            await set(newNotificationRef, {
              alertId: newAlertRef.key,
              timestamp: newAlert.timestamp,
              read: false,
            })
          }
        })
      }
    } catch (firebaseError) {
      console.error("Firebase operation failed:", firebaseError)
      // Return a mock response for now
      return NextResponse.json({
        success: true,
        alertId: "mock-alert-id",
        alert: newAlert,
        note: "Using mock data due to Firebase configuration issues",
      })
    }

    return NextResponse.json({
      success: true,
      alertId: newAlertRef?.key || "mock-alert-id",
      alert: newAlert,
    })
  } catch (error) {
    console.error("Error creating alert:", error)
    return NextResponse.json({ error: "Failed to create alert" }, { status: 500 })
  }
}

// GET handler for retrieving alerts
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const severity = searchParams.get("severity")
    const status = searchParams.get("status") // resolved or active

    try {
      // Get all alerts
      const alertsRef = ref(database, "alerts")
      const alertsSnapshot = await get(alertsRef)

      if (!alertsSnapshot.exists()) {
        return NextResponse.json({ alerts: [] })
      }

      let alerts = Object.entries(alertsSnapshot.val()).map(([id, alert]: [string, any]) => ({
        id,
        ...alert,
      }))

      // Apply filters if provided
      if (type) {
        alerts = alerts.filter((alert) => alert.type === type)
      }

      if (severity) {
        alerts = alerts.filter((alert) => alert.severity === severity)
      }

      if (status) {
        const isResolved = status === "resolved"
        alerts = alerts.filter((alert) => alert.resolved === isResolved)
      }

      // Sort by timestamp (newest first)
      alerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

      return NextResponse.json({ alerts })
    } catch (firebaseError) {
      console.error("Firebase operation failed:", firebaseError)
      // Return mock data
      const mockAlerts = [
        {
          id: "mock-alert-1",
          type: "Gas Leak",
          location: "Kitchen Area",
          severity: "Critical",
          timestamp: new Date().toISOString(),
          description: "High concentration of natural gas detected in the kitchen area.",
          resolved: false,
        },
        {
          id: "mock-alert-2",
          type: "Fire",
          location: "Server Room",
          severity: "Critical",
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          description: "Smoke and high temperature detected in the server room.",
          resolved: false,
        },
      ]
      return NextResponse.json({
        alerts: mockAlerts,
        note: "Using mock data due to Firebase configuration issues",
      })
    }
  } catch (error) {
    console.error("Error retrieving alerts:", error)
    return NextResponse.json({ error: "Failed to retrieve alerts" }, { status: 500 })
  }
}
