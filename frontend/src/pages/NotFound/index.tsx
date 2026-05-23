import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaHome, FaArrowLeft } from "react-icons/fa"
import { FiBox } from "react-icons/fi"

export default function NotFound() {
  const navigate = useNavigate()
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true)
      setTimeout(() => setIsGlitching(false), 150)
    }, 3000)

    return () => {
      clearInterval(glitchInterval)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-slate-50">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className={`text-6xl lg:text-8xl font-black mb-4 tracking-tighter text-slate-800 ${isGlitching ? 'animate-pulse' : ''}`}>
            404
          </h1>
          
          <div className="space-y-3">
            <h2 className="text-xl lg:text-2xl font-semibold text-slate-800 mb-2">
              Страница не найдена
            </h2>
            <p className="text-slate-500 text-sm lg:text-base max-w-md mx-auto">
              К сожалению, запрашиваемая страница не существует или была перемещена.
              Проверьте правильность URL или вернитесь на главную.
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <div className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
            <code className="text-xs text-slate-500 font-mono">404 Not Found</code>
          </div>
          <div className="w-1 h-1 rounded-full bg-slate-300" />
          <div className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
            <code className="text-xs text-slate-500 font-mono flex items-center gap-1">
              <FiBox className="text-[10px]" />
              WorkFact Journal
            </code>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white border border-slate-200 text-slate-600 font-medium text-sm transition-all hover:bg-slate-50 hover:text-slate-800 cursor-pointer shadow-sm"
          >
            <FaArrowLeft className="text-sm transition-transform group-hover:-translate-x-1" />
            Вернуться назад
          </button>
          
          <button
            onClick={() => navigate("/")}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-orange-600 text-white font-medium text-sm transition-all hover:bg-orange-700 hover:shadow-md cursor-pointer"
          >
            <FaHome className="text-sm transition-transform group-hover:-translate-y-0.5" />
            На главную
          </button>
        </div>
      </div>
    </div>
  )
}