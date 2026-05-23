import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "./components/providers/ThemeProvider"
import { DashboardLayout } from "./components/Layout/DashboardLayout"
import { useInitializeApp } from "./hooks/useInitializeApp"
import { Toaster } from "react-hot-toast"
import LoadingSpinner from "./components/UI/LoadingSpinner"
import NotFound from "./pages/NotFound"

function MainApp() {
  const {
    isLoading,
    initialized,
    error
  } = useInitializeApp()

  useEffect(() => {
    if (error && initialized) {
      console.error("Initialization error:", error)
    }
  }, [error, initialized])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <ThemeProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          success: {
            style: {
              background: '#22C55E',
              color: '#FFFFFF',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: '#FFFFFF',
            },
          },
        }}
      />
      <div className="min-h-screen bg-slate-50">
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<></>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  )
}