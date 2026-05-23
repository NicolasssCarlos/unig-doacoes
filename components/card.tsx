interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-xl border border-border bg-card p-6 ${className}`}>
      {children}
    </div>
  )
}

interface CardHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
}

export function CardHeader({ title, description, action }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}
