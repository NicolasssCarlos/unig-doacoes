import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/card"
import { Button } from "@/components/button"
import { Settings, Database, Bell, Shield, Palette } from "lucide-react"

const settingsSections = [
  {
    title: "Geral",
    description: "Configuracoes gerais do sistema",
    icon: Settings,
    items: ["Nome do sistema", "Timezone", "Idioma"],
  },
  {
    title: "Banco de Dados",
    description: "Configuracoes de conexao com o banco",
    icon: Database,
    items: ["String de conexao", "Pool de conexoes", "Backup automatico"],
  },
  {
    title: "Notificacoes",
    description: "Configuracoes de alertas e notificacoes",
    icon: Bell,
    items: ["Email de notificacao", "Alertas de estoque", "Resumo diario"],
  },
  {
    title: "Seguranca",
    description: "Configuracoes de seguranca e acesso",
    icon: Shield,
    items: ["Autenticacao", "Niveis de acesso", "Logs de auditoria"],
  },
  {
    title: "Aparencia",
    description: "Personalize a interface do sistema",
    icon: Palette,
    items: ["Tema", "Cores primarias", "Logo"],
  },
]

export default function ConfiguracoesPage() {
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Configuracoes" 
        description="Gerencie as configuracoes do sistema"
      />

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {settingsSections.map((section) => (
            <Card key={section.title}>
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <section.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
                  <ul className="mt-4 space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" size="sm" className="mt-4">
                    Configurar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
