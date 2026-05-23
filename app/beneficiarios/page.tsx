"use client"

import { useState } from "react"
import useSWR from "swr"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { Badge } from "@/components/badge"
import { Plus, Search, Edit, Trash2, Eye, Mail, Phone, Loader2 } from "lucide-react"
import { beneficiarioApi, type Beneficiario } from "@/lib/api"

export default function BeneficiariosPage() {
  const { data: beneficiarios, error, isLoading, mutate } = useSWR("beneficiarios", beneficiarioApi.listar)
  
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedBeneficiario, setSelectedBeneficiario] = useState<Beneficiario | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
  })

  const filteredBeneficiarios = (beneficiarios || []).filter((b) =>
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

  const handleDelete = async (beneficiario: Beneficiario) => {
    if (!beneficiario.id) return
    if (!confirm(`Tem certeza que deseja excluir o beneficiario "${beneficiario.nome}"?`)) return
    
    try {
      await beneficiarioApi.excluir(beneficiario.id)
      mutate()
    } catch (err) {
      alert("Erro ao excluir beneficiario")
      console.error(err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const beneficiarioData: Omit<Beneficiario, "id"> = {
      nome: formData.nome,
      contato: {
        email: formData.email,
        telefone: formData.telefone,
      },
    }

    try {
      if (selectedBeneficiario?.id) {
        await beneficiarioApi.atualizar(selectedBeneficiario.id, beneficiarioData)
      } else {
        await beneficiarioApi.criar(beneficiarioData)
      }
      mutate()
      setIsModalOpen(false)
    } catch (err) {
      alert("Erro ao salvar beneficiario")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
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
      key: "solicitacoes",
      header: "Solicitacoes",
      render: (beneficiario: Beneficiario) => (
        <Badge variant="default">{beneficiario.solicitacoes?.length || 0} solicitacoes</Badge>
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
            onClick={(e) => { e.stopPropagation(); handleDelete(beneficiario); }}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ]

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-2">Erro ao carregar beneficiarios</p>
          <p className="text-muted-foreground text-sm">Verifique se a API esta rodando</p>
          <Button onClick={() => mutate()} className="mt-4">Tentar novamente</Button>
        </div>
      </div>
    )
  }

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

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredBeneficiarios}
            emptyMessage="Nenhum beneficiario encontrado"
          />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedBeneficiario ? "Editar Beneficiario" : "Novo Beneficiario"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome"
            id="nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Nome completo"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Email"
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@exemplo.com"
              required
            />
            <Input
              label="Telefone"
              id="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
              placeholder="(00) 00000-0000"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
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
              <Badge variant="default">{selectedBeneficiario.solicitacoes?.length || 0} solicitacoes</Badge>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
