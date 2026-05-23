import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/card"
import { Users, Heart, Package, FileText, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    name: "Doadores",
    value: "124",
    change: "+12%",
    trend: "up",
    icon: Users,
    href: "/doadores",
  },
  {
    name: "Beneficiarios",
    value: "89",
    change: "+8%",
    trend: "up",
    icon: Heart,
    href: "/beneficiarios",
  },
  {
    name: "Itens Disponiveis",
    value: "256",
    change: "-5%",
    trend: "down",
    icon: Package,
    href: "/itens",
  },
  {
    name: "Solicitacoes Pendentes",
    value: "18",
    change: "+23%",
    trend: "up",
    icon: FileText,
    href: "/solicitacoes",
  },
]

const recentActivity = [
  { id: 1, type: "doacao", message: "Novo item doado por Joao Silva", time: "2 min atras" },
  { id: 2, type: "solicitacao", message: "Nova solicitacao de Maria Santos", time: "15 min atras" },
  { id: 3, type: "atendimento", message: "Solicitacao #45 foi atendida", time: "1 hora atras" },
  { id: 4, type: "cadastro", message: "Novo doador cadastrado", time: "2 horas atras" },
  { id: 5, type: "doacao", message: "5 itens doados por Pedro Lima", time: "3 horas atras" },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Dashboard" 
        description="Visao geral do sistema de doacoes"
      />

      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.name} className="relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <p className="mt-1 text-3xl font-bold text-foreground">{stat.value}</p>
                  <div className="mt-2 flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.trend === "up" ? "text-success" : "text-destructive"
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-muted-foreground">vs mes anterior</span>
                  </div>
                </div>
                <div className="rounded-lg bg-primary/10 p-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-foreground mb-4">Atividade Recente</h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-foreground mb-4">Resumo de Itens</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Roupas</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-secondary">
                    <div className="h-2 w-24 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Alimentos</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-secondary">
                    <div className="h-2 w-20 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">62%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Moveis</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-secondary">
                    <div className="h-2 w-14 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">43%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Eletronicos</span>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-32 rounded-full bg-secondary">
                    <div className="h-2 w-10 rounded-full bg-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">31%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
