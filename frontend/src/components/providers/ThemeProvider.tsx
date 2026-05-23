import React, { createContext, useContext, type ReactNode } from 'react'

interface ThemeContextType {
  colors: {
    slateDark: '#1E293B'
    concrete: '#94A3B8'
    brickOrange: '#EA580C'
    safetyYellow: '#EAB308'
    grassGreen: '#22C55E'
    documentBlue: '#3B82F6'
    white: '#FFFFFF'
    grayLight: '#F8FAFC'
    grayMedium: '#CBD5E1'
    grayDark: '#334155'
    success: '#22C55E'
    error: '#EF4444'
    warning: '#EAB308'
    info: '#3B82F6'
    textSecondary: 'rgba(30, 41, 59, 0.6)'
    background: '#F8FAFC'
    surface: '#FFFFFF'
    border: '#E2E8F0'
    cardShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)'
  }
  gradients: {
    primary: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)'
    accent: 'linear-gradient(135deg, #EA580C 0%, #F97316 100%)'
  }
  radius: {
    small: '4px'
    medium: '8px'
    large: '12px'
    full: '50%'
  }
  font: {
    family: {
      primary: 'Inter, system-ui, sans-serif'
      mono: 'JetBrains Mono, monospace'
    }
    size: {
      h1: '32px'
      h2: '24px'
      h3: '18px'
      body: '14px'
      small: '12px'
      caption: '11px'
    }
    weight: {
      light: 300
      regular: 400
      medium: 500
      semiBold: 600
      bold: 700
    }
  }
  spacing: {
    xs: '4px'
    sm: '8px'
    md: '12px'
    base: '16px'
    lg: '24px'
    xl: '32px'
  }
  animation: {
    duration: {
      fast: '150ms'
      normal: '200ms'
      slow: '300ms'
    }
  }
  shadows: {
    card: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)'
    button: '0px 2px 4px rgba(234, 88, 12, 0.2)'
  }
  breakpoints: {
    sm: '640px'
    md: '768px'
    lg: '1024px'
    xl: '1280px'
    '2xl': '1536px'
  }
}

const theme: ThemeContextType = {
  colors: {
    slateDark: '#1E293B',
    concrete: '#94A3B8',
    brickOrange: '#EA580C',
    safetyYellow: '#EAB308',
    grassGreen: '#22C55E',
    documentBlue: '#3B82F6',
    white: '#FFFFFF',
    grayLight: '#F8FAFC',
    grayMedium: '#CBD5E1',
    grayDark: '#334155',
    success: '#22C55E',
    error: '#EF4444',
    warning: '#EAB308',
    info: '#3B82F6',
    textSecondary: 'rgba(30, 41, 59, 0.6)',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    border: '#E2E8F0',
    cardShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)'
  },
  gradients: {
    primary: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
    accent: 'linear-gradient(135deg, #EA580C 0%, #F97316 100%)'
  },
  radius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    full: '50%'
  },
  font: {
    family: {
      primary: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    size: {
      h1: '32px',
      h2: '24px',
      h3: '18px',
      body: '14px',
      small: '12px',
      caption: '11px'
    },
    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    base: '16px',
    lg: '24px',
    xl: '32px'
  },
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms'
    }
  },
  shadows: {
    card: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)',
    button: '0px 2px 4px rgba(234, 88, 12, 0.2)'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}