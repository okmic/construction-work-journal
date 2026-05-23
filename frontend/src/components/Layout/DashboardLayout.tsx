import React from 'react'
import { Outlet } from 'react-router-dom'
import { useTheme } from '../providers/ThemeProvider'

export const DashboardLayout: React.FC = () => {
  const { colors } = useTheme()

  return (
    <div 
      className="min-h-screen w-full font-inter"
      style={{ 
        backgroundColor: colors.background,
        color: colors.textSecondary
      }}
    >
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Outlet />
      </main>
    </div>
  )
}