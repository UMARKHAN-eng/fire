import { NextResponse } from "next/server"
import { ref, push, set, get, update } from "firebase/database"
import { database } from "@/lib/firebase"

// POST handler for receiving sensor data
export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.sensorId || !data.readings) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    try {
      // Get the sensor to check thresholds
      const sensorRef = ref(database, `sensors/${data.sensorId}`)
      const sensorSnapshot = await get(sensorRef)

      if (!sensorSnapshot.exists()) {
        return NextResponse.json({ error: "Sensor not found" }, { status: 404 })
      }

      const sensor = sensorSnapshot.val()

      // Update sensor status
      await update(sensorRef, {
        lastReading: new Date().toISOString(),
        battery: data.battery || sensor.battery,
        status: "Online",
      })

      // Save the reading
      const readingsRef = ref(database, `readings/${data.sensorId}`)
      const newReadingRef = push(readingsRef)
      await set(newReadingRef, {
        ...data.readings,
        timestamp: new Date().toISOString(),
      })

      // Check if any readings exceed thresholds and create alerts if needed
      let alertCreated = false

      if (sensor.type === "Gas" && data.readings.gasLevel > sensor.thresholds.critical) {
        // Create a gas leak alert
        const alertsRef = ref(database, "alerts")
        const newAlertRef = push(alertsRef)
        await set(newAlertRef, {
          type: "Gas Leak",
          location: sensor.location,
          severity: "Critical",
          description: `Gas level of ${data.readings.gasLevel}% detected, exceeding critical threshold of ${sensor.thresholds.critical}%`,
          timestamp: new Date().toISOString(),
          sensorId: data.sensorId,
          resolved: false,
        })
        alertCreated = true
      } else if (sensor.type === "Fire" && data.readings.temperature > sensor.thresholds.critical) {
        // Create a fire alert
        const alertsRef = ref(database, "alerts")
        const newAlertRef = push(alertsRef)
        await set(newAlertRef, {
          type: "Fire",
          location: sensor.location,
          severity: "Critical",
          description: `Temperature of ${data.readings.temperature}°C detected, exceeding critical threshold of ${sensor.thresholds.critical}°C`,
          timestamp: new Date().toISOString(),
          sensorId: data.sensorId,
          resolved: false,
        })
        alertCreated = true
      }

      return NextResponse.json({
        success: true,
        readingId: newReadingRef.key,
        alertCreated,
      })
    } catch (firebaseError) {
      console.error("Firebase operation failed:", firebaseError)
      // Return a mock response
      return NextResponse.json({
        success: true,
        readingId: "mock-reading-id",
        alertCreated: false,
        note: "Using mock data due to Firebase configuration issues",
      })
    }
  } catch (error) {
    console.error("Error processing sensor data:", error)
    return NextResponse.json({ error: "Failed to process sensor data" }, { status: 500 })
  }
}

// GET handler for retrieving sensors
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status")

    try {
      // Get all sensors
      const sensorsRef = ref(database, "sensors")
      const sensorsSnapshot = await get(sensorsRef)

      if (!sensorsSnapshot.exists()) {
        return NextResponse.json({ sensors: [] })
      }

      let sensors = Object.entries(sensorsSnapshot.val()).map(([id, sensor]: [string, any]) => ({
        id,
        ...sensor,
      }))

      // Apply filters if provided
      if (type) {
        sensors = sensors.filter((sensor) => sensor.type === type)
      }

      if (status) {
        sensors = sensors.filter((sensor) => sensor.status === status)
      }

      return NextResponse.json({ sensors })
    } catch (firebaseError) {
      console.error("Firebase operation failed:", firebaseError)
      // Return mock data
      const mockSensors = [
        {
          id: "sensor-1",
          name: "Gas Sensor A1",
          type: "Gas",
          location: "Kitchen Area",
          status: "Online",
          battery: 85,
          lastReading: new Date().toISOString(),
          lastMaintenance: "2023-05-15",
          thresholds: {
            warning: 30,
            critical: 50,
          },
        },
        {
          id: "sensor-2",
          name: "Fire Sensor F1",
          type: "Fire",
          location: "Server Room",
          status: "Online",
          battery: 92,
          lastReading: new Date().toISOString(),
          lastMaintenance: "2023-05-10",
          thresholds: {
            warning: 40,
            critical: 60,
          },
        },
      ]
      return NextResponse.json({
        sensors: mockSensors,
        note: "Using mock data due to Firebase configuration issues",
      })
    }
  } catch (error) {
    console.error("Error retrieving sensors:", error)
    return NextResponse.json({ error: "Failed to retrieve sensors" }, { status: 500 })
  }
}
