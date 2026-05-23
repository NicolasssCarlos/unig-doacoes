import { PageHeader } from "@/components/page-header"
import { Card } from "@/components/card"
import { BookOpen, MessageCircle, FileQuestion, ExternalLink } from "lucide-react"

const helpSections = [
  {
    title: "Documentacao",
    description: "Acesse a documentacao completa do sistema",
    icon: BookOpen,
    link: "#",
  },
  {
    title: "Suporte",
    description: "Entre em contato com nossa equipe de suporte",
    icon: MessageCircle,
    link: "#",
  },
  {
    title: "FAQ",
    description: "Perguntas frequentes sobre o sistema",
    icon: FileQuestion,
    link: "#",
  },
]

const faqs = [
  {
    question: "Como cadastrar um novo doador?",
    answer: "Acesse a pagina de Doadores e clique no botao 'Novo Doador'. Preencha os dados do formulario e clique em 'Cadastrar'.",
  },
  {
    question: "Como registrar uma nova doacao de itens?",
    answer: "Va ate a pagina de Itens, clique em 'Novo Item' e selecione o doador responsavel pela doacao.",
  },
  {
    question: "Como atender uma solicitacao?",
    answer: "Na pagina de Solicitacoes, clique no icone de edicao da solicitacao desejada e altere o status para 'Atendida'.",
  },
  {
    question: "Como visualizar o historico de um beneficiario?",
    answer: "Acesse a pagina de Beneficiarios e clique no icone de visualizacao para ver os detalhes e historico de solicitacoes.",
  },
]

export default function AjudaPage() {
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Ajuda" 
        description="Central de ajuda e suporte"
      />

      <div className="p-8 space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {helpSections.map((section) => (
            <Card key={section.title} className="hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="rounded-lg bg-primary/10 p-4 mb-4">
                  <section.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{section.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm text-primary">
                  Acessar
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card>
          <h3 className="text-lg font-semibold text-foreground mb-6">Perguntas Frequentes</h3>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-6 border-b border-border last:border-0 last:pb-0">
                <h4 className="font-medium text-foreground">{faq.question}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-foreground mb-4">Contato</h3>
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              Email: <span className="text-foreground">suporte@unig.edu.br</span>
            </p>
            <p className="text-muted-foreground">
              Telefone: <span className="text-foreground">(21) 3333-4444</span>
            </p>
            <p className="text-muted-foreground">
              Horario de atendimento: <span className="text-foreground">Segunda a Sexta, 8h as 18h</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
