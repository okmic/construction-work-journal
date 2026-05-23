import React from 'react'

type SpinnerSize = 'sm' | 'md' | 'lg'
type SpinnerTheme = 'light'

interface LoadingSpinnerProps {
  size?: SpinnerSize
  theme?: SpinnerTheme
  text?: string
  fullScreen?: boolean
  className?: string
}

const sizeMap = {
  sm: { container: 'w-16 h-16', dot: 'w-1.5 h-1.5', text: 'text-sm' },
  md: { container: 'w-24 h-24', dot: 'w-2 h-2', text: 'text-base' },
  lg: { container: 'w-32 h-32', dot: 'w-2.5 h-2.5', text: 'text-lg' }
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text = 'Загрузка...',
  fullScreen = false,
  className = ''
}) => {
  const spinnerContent = (
    <div className={`flex flex-col items-center justify-center gap-4 ${sizeMap[size].container} ${className}`}>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`${sizeMap[size].dot} bg-orange-600 rounded-full animate-bounce`}
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: '0.6s'
            }}
          />
        ))}
      </div>
      {text && (
        <p className={`${sizeMap[size].text} text-slate-600 font-medium w-screen text-center`}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50">
        {spinnerContent}
      </div>
    )
  }

  return spinnerContent
}