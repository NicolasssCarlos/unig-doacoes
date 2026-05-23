"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Users, 
  Heart, 
  Package, 
  FileText,
  Settings,
  HelpCircle
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Doadores", href: "/doadores", icon: Users },
  { name: "Beneficiarios", href: "/beneficiarios", icon: Heart },
  { name: "Itens", href: "/itens", icon: Package },
  { name: "Solicitacoes", href: "/solicitacoes", icon: FileText },
]

const secondaryNavigation = [
  { name: "Configuracoes", href: "/configuracoes", icon: Settings },
  { name: "Ajuda", href: "/ajuda", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex w-64 flex-col bg-card border-r border-border">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Heart className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold text-foreground">UNIG Doacoes</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Principal
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}

        <div className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Sistema
        </div>
        {secondaryNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-sm font-medium text-foreground">
            AD
          </div>
          <div className="flex-1 truncate">
            <p className="text-sm font-medium text-foreground">Admin</p>
            <p className="text-xs text-muted-foreground">admin@unig.edu.br</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
