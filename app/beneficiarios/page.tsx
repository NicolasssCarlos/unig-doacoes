"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { Badge } from "@/components/badge"
import { Plus, Search, Edit, Trash2, Eye, Mail, Phone } from "lucide-react"

interface Contato {
  email: string
  telefone: string
}

interface Beneficiario {
  id: number
  nome: string
  contato: Contato
  totalSolicitacoes?: number
}

const mockBeneficiarios: Beneficiario[] = [
  {
    id: 1,
    nome: "Ana Paula Oliveira",
    contato: { email: "ana@email.com", telefone: "(21) 98888-1111" },
    totalSolicitacoes: 5,
  },
  {
    id: 2,
    nome: "Carlos Eduardo",
    contato: { email: "carlos@email.com", telefone: "(21) 98888-2222" },
    totalSolicitacoes: 3,
  },
  {
    id: 3,
    nome: "Fernanda Costa",
    contato: { email: "fernanda@email.com", telefone: "(21) 98888-3333" },
    totalSolicitacoes: 8,
  },
  {
    id: 4,
    nome: "Roberto Almeida",
    contato: { email: "roberto@email.com", telefone: "(21) 98888-4444" },
    totalSolicitacoes: 2,
  },
]

export default function BeneficiariosPage() {
  const [beneficiarios] = useState<Beneficiario[]>(mockBeneficiarios)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedBeneficiario, setSelectedBeneficiario] = useState<Beneficiario | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
  })

  const filteredBeneficiarios = beneficiarios.filter((b) =>
    b.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.contato.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleView = (beneficiario: Beneficiario) => {
    setSelectedBeneficiario(beneficiario)
    setIsViewModalOpen(true)
  }

  const handleEdit = (beneficiario: Beneficiario) => {
    setSelectedBeneficiario(beneficiario)
    setFormData({
      nome: beneficiario.nome,
      email: beneficiario.contato.email,
      telefone: beneficiario.contato.telefone,
    })
    setIsModalOpen(true)
  }

  const handleNew = () => {
    setSelectedBeneficiario(null)
    setFormData({
      nome: "",
      email: "",
      telefone: "",
    })
    setIsModalOpen(true)
  }

  const columns = [
    { key: "id", header: "ID" },
    { key: "nome", header: "Nome" },
    {
      key: "contato",
      header: "Contato",
      render: (beneficiario: Beneficiario) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs">
            <Mail className="h-3 w-3 text-muted-foreground" />
            {beneficiario.contato.email}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Phone className="h-3 w-3 text-muted-foreground" />
            {beneficiario.contato.telefone}
          </div>
        </div>
      ),
    },
    {
      key: "totalSolicitacoes",
      header: "Solicitacoes",
      render: (beneficiario: Beneficiario) => (
        <Badge variant="default">{beneficiario.totalSolicitacoes} solicitacoes</Badge>
      ),
    },
    {
      key: "acoes",
      header: "Acoes",
      render: (beneficiario: Beneficiario) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleView(beneficiario); }}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleEdit(beneficiario); }}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); }}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen">
      <PageHeader title="Beneficiarios" description="Gerencie os beneficiarios cadastrados">
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Beneficiario
        </Button>
      </PageHeader>

      <div className="p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar beneficiarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredBeneficiarios}
          emptyMessage="Nenhum beneficiario encontrado"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedBeneficiario ? "Editar Beneficiario" : "Novo Beneficiario"}
      >
        <form className="space-y-4">
          <Input
            label="Nome"
            id="nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Nome completo"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@exemplo.com"
            />
            <Input
              label="Telefone"
              id="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              placeholder="(00) 00000-0000"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {selectedBeneficiario ? "Salvar" : "Cadastrar"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalhes do Beneficiario"
      >
        {selectedBeneficiario && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nome</p>
              <p className="text-foreground font-medium">{selectedBeneficiario.nome}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">{selectedBeneficiario.contato.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telefone</p>
                <p className="text-foreground">{selectedBeneficiario.contato.telefone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Solicitacoes</p>
              <Badge variant="default">{selectedBeneficiario.totalSolicitacoes} solicitacoes</Badge>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
