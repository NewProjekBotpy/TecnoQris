import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle, AlertTriangle, Info, X, QrCode } from "lucide-react"

type ToastType = "success" | "error" | "warning" | "info" | "default"

function getToastType(variant?: string): ToastType {
  switch (variant) {
    case "destructive":
      return "error"
    case "success":
      return "success"
    case "warning":
      return "warning"
    case "info":
      return "info"
    default:
      return "default"
  }
}

function ToastIcon({ type }: { type: ToastType }) {
  const iconClasses = "h-5 w-5 shrink-0"
  
  switch (type) {
    case "success":
      return <CheckCircle2 className={cn(iconClasses, "text-emerald-400")} />
    case "error":
      return <XCircle className={cn(iconClasses, "text-red-400")} />
    case "warning":
      return <AlertTriangle className={cn(iconClasses, "text-amber-400")} />
    case "info":
      return <Info className={cn(iconClasses, "text-blue-400")} />
    default:
      return <QrCode className={cn(iconClasses, "text-blue-400")} />
  }
}

const QR_PATTERN = [
  1, 0, 1, 1,
  0, 1, 0, 1,
  1, 1, 0, 0,
  0, 1, 1, 1
]

function QrPatternDecor() {
  return (
    <div className="absolute top-0 right-0 w-16 h-16 opacity-10 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-4 gap-0.5">
        {QR_PATTERN.map((filled, i) => (
          <div
            key={i}
            className={cn(
              "w-full h-full rounded-sm",
              filled ? "bg-blue-400" : "bg-transparent"
            )}
            style={{ 
              opacity: filled ? 0.6 : 0
            }}
          />
        ))}
      </div>
    </div>
  )
}

interface TecnoQrisToastProps {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: string
  open?: boolean
  onClose: () => void
}

function TecnoQrisToast({ id, title, description, variant, open, onClose }: TecnoQrisToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const type = getToastType(variant)

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => {
        setIsVisible(true)
      })
      const timer = setTimeout(() => {
        handleClose()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [open])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  if (!open) return null

  const borderGradient = type === "error" 
    ? "from-red-500/50 via-red-600/30 to-transparent"
    : type === "success"
    ? "from-emerald-500/50 via-emerald-600/30 to-transparent"
    : type === "warning"
    ? "from-amber-500/50 via-amber-600/30 to-transparent"
    : "from-blue-500/50 via-cyan-500/30 to-transparent"

  const glowColor = type === "error"
    ? "shadow-red-500/20"
    : type === "success"
    ? "shadow-emerald-500/20"
    : type === "warning"
    ? "shadow-amber-500/20"
    : "shadow-blue-500/20"

  return (
    <div
      className={cn(
        "relative w-full max-w-sm overflow-hidden rounded-xl",
        "transition-all duration-300 ease-out",
        isVisible && !isExiting 
          ? "translate-x-0 opacity-100 scale-100" 
          : "translate-x-full opacity-0 scale-95",
        `shadow-lg ${glowColor}`
      )}
      data-testid={`toast-${id}`}
    >
      <div className={cn(
        "absolute inset-0 rounded-xl p-[1px]",
        "bg-gradient-to-br",
        borderGradient
      )}>
        <div className="absolute inset-[1px] rounded-xl bg-slate-900/95 backdrop-blur-xl" />
      </div>
      
      <div className="relative p-4">
        <QrPatternDecor />
        
        <div className="flex items-start gap-3">
          <div className={cn(
            "flex items-center justify-center w-10 h-10 rounded-lg",
            "bg-gradient-to-br",
            type === "error" ? "from-red-500/20 to-red-600/10" :
            type === "success" ? "from-emerald-500/20 to-emerald-600/10" :
            type === "warning" ? "from-amber-500/20 to-amber-600/10" :
            "from-blue-500/20 to-cyan-500/10"
          )}>
            <ToastIcon type={type} />
          </div>
          
          <div className="flex-1 min-w-0 pt-0.5">
            {title && (
              <h4 className="text-sm font-semibold text-white leading-tight">
                {title}
              </h4>
            )}
            {description && (
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          
          <button
            onClick={handleClose}
            className={cn(
              "shrink-0 p-1.5 rounded-lg",
              "text-slate-500 hover:text-white",
              "hover:bg-slate-800/50",
              "transition-colors duration-200"
            )}
            data-testid={`toast-close-${id}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800 overflow-hidden rounded-b-xl">
          <div 
            className={cn(
              "h-full",
              "bg-gradient-to-r",
              type === "error" ? "from-red-500 to-red-600" :
              type === "success" ? "from-emerald-500 to-emerald-600" :
              type === "warning" ? "from-amber-500 to-amber-600" :
              "from-blue-500 to-cyan-500",
              "animate-[shrink_4s_linear_forwards]"
            )}
            style={{
              animation: isVisible ? "shrink 4s linear forwards" : "none"
            }}
          />
        </div>
      </div>
    </div>
  )
}

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <>
      <style>
        {`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}
      </style>
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map(({ id, title, description, variant, open, ...props }) => (
          <div key={id} className="pointer-events-auto">
            <TecnoQrisToast
              id={id}
              title={title}
              description={description}
              variant={variant ?? undefined}
              open={open}
              onClose={() => dismiss(id)}
            />
          </div>
        ))}
      </div>
    </>
  )
}
