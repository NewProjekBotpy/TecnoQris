import { cn } from "@/lib/utils"

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-10 h-10"
  };

  const ringThickness = {
    sm: "2px",
    md: "3px",
    lg: "4px"
  };

  return (
    <div 
      className={cn("relative flex items-center justify-center", sizeClasses[size], className)}
      role="status"
      aria-label="Loading"
      data-testid="spinner"
      {...props}
    >
      <div 
        className="absolute inset-0 rounded-full animate-spin"
        style={{
          background: 'conic-gradient(from 0deg, transparent 0%, #3b82f6 50%, #8b5cf6 100%)',
          WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${ringThickness[size]}), #000 calc(100% - ${ringThickness[size]}))`,
          mask: `radial-gradient(farthest-side, transparent calc(100% - ${ringThickness[size]}), #000 calc(100% - ${ringThickness[size]}))`
        }}
      />
      <div 
        className="absolute inset-[25%] rounded-full animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)'
        }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function PageLoader({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4" data-testid="page-loader">
      <div className="relative">
        <div 
          className="w-12 h-12 rounded-full animate-spin"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, #3b82f6 40%, #8b5cf6 70%, #3b82f6 100%)',
            WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))',
            mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))'
          }}
        />
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)'
          }}
        />
        <div 
          className="absolute inset-[30%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}
        />
      </div>
      {message && (
        <p className="text-sm text-muted-foreground animate-pulse">{message}</p>
      )}
    </div>
  );
}

function ButtonSpinner({ className }: { className?: string }) {
  return (
    <div 
      className={cn("w-4 h-4 rounded-full animate-spin", className)}
      style={{
        background: 'conic-gradient(from 0deg, transparent 0%, currentColor 100%)',
        WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
        mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))'
      }}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export { Spinner, PageLoader, ButtonSpinner }
