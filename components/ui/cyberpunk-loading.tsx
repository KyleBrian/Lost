export function CyberpunkLoading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-secondary/20 rounded-full animate-pulse delay-75"></div>
        <div className="absolute inset-2 border-4 border-t-secondary rounded-full animate-spin delay-75"></div>
      </div>
    </div>
  )
}

