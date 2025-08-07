// This script seeds the Firebase database with initial data for testing

// Sample data for sensors
const sensors = [
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
  {
    id: "sensor-3",
    name: "Earthquake Sensor E1",
    type: "Earthquake",
    location: "Building Foundation",
    status: "Online",
    battery: 78,
    lastReading: new Date().toISOString(),
    lastMaintenance: "2023-04-22",
    thresholds: {
      warning: 3.0,
      critical: 4.5,
    },
  },
]

// Sample data for alerts
const alerts = [
  {
    id: "alert-1",
    type: "Gas Leak",
    location: "Kitchen Area",
    severity: "Critical",
    timestamp: new Date().toISOString(),
    description: "High concentration of natural gas detected in the kitchen area.",
    sensorId: "sensor-1",
    resolved: false,
  },
  {
    id: "alert-2",
    type: "Fire",
    location: "Server Room",
    severity: "Critical",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
    description: "Smoke and high temperature detected in the server room.",
    sensorId: "sensor-2",
    resolved: false,
  },
  {
    id: "alert-3",
    type: "Earthquake",
    location: "All Buildings",
    severity: "High",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    description: "Seismic activity detected. Magnitude 4.5 earthquake.",
    sensorId: "sensor-3",
    resolved: false,
  },
]

// Sample data for users
const users = [
  {
    id: "user-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    phoneNumber: "+15551234567",
    smsEnabled: true,
    emailEnabled: true,
    pushEnabled: true,
    notifyOnCritical: true,
    notifyOnHigh: true,
    notifyOnMedium: true,
    notifyOnLow: false,
    notifications: [],
  },
  {
    id: "user-2",
    name: "Emergency Responder",
    email: "responder@example.com",
    role: "responder",
    phoneNumber: "+15559876543",
    smsEnabled: true,
    emailEnabled: true,
    pushEnabled: true,
    notifyOnCritical: true,
    notifyOnHigh: true,
    notifyOnMedium: false,
    notifyOnLow: false,
    notifications: [],
  },
]

// Sample readings data
const readings = {
  "sensor-1": [
    {
      gasLevel: 15,
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    },
    {
      gasLevel: 25,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
    {
      gasLevel: 55, // Critical level
      timestamp: new Date().toISOString(),
    },
  ],
  "sensor-2": [
    {
      temperature: 30,
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    },
    {
      temperature: 45,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
    {
      temperature: 65, // Critical level
      timestamp: new Date().toISOString(),
    },
  ],
  "sensor-3": [
    {
      magnitude: 2.0,
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    },
    {
      magnitude: 3.5,
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
    {
      magnitude: 4.5, // Critical level
      timestamp: new Date().toISOString(),
    },
  ],
}

// Log the data that would be sent to Firebase
console.log("Sensors data:", JSON.stringify(sensors, null, 2))
console.log("Alerts data:", JSON.stringify(alerts, null, 2))
console.log("Users data:", JSON.stringify(users, null, 2))
console.log("Readings data:", JSON.stringify(readings, null, 2))

console.log("\nTo use this data with Firebase, you would need to:")
console.log("1. Initialize Firebase Admin SDK")
console.log("2. Use the admin.database().ref() method to get references to your database paths")
console.log("3. Use the set() method to write this data to those references")
console.log("\nExample:")
console.log("const admin = require('firebase-admin');")
console.log("admin.initializeApp();")
console.log("const db = admin.database();")
console.log("db.ref('sensors').set(sensors);")
console.log("db.ref('alerts').set(alerts);")
console.log("db.ref('users').set(users);")
console.log("db.ref('readings').set(readings);")

// In a real implementation, you would use Firebase Admin SDK to write this data
// This script is for demonstration purposes only
