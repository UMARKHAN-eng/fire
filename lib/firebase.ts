import { initializeApp, getApps } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://demo-project-default-rtdb.firebaseio.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789012:web:abc123def456ghi789jkl",
}

// Initialize Firebase only if it hasn't been initialized already
// and only if we're in a browser environment or if all required config is present
let app
let database
let auth

try {
  if (
    typeof window !== "undefined" ||
    (firebaseConfig.apiKey !== "demo-api-key" &&
      firebaseConfig.databaseURL !== "https://demo-project-default-rtdb.firebaseio.com")
  ) {
    // Check if Firebase is already initialized
    if (!getApps().length) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }

    // Initialize services
    database = getDatabase(app)
    auth = getAuth(app)
  }
} catch (error) {
  console.error("Firebase initialization error:", error)

  // Create mock objects for SSR/build time
  database = {
    // Mock implementation
    ref: () => ({
      push: () => ({ key: "mock-key" }),
      set: () => Promise.resolve(),
      get: () => Promise.resolve({ exists: () => false, val: () => ({}) }),
    }),
  }

  auth = {
    // Mock implementation
    currentUser: null,
    onAuthStateChanged: () => {},
  }
}

export { database, auth }
export default app
