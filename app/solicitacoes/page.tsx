"use client"

import { useState } from "react"
import useSWR from "swr"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Select } from "@/components/select"
import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { Badge } from "@/components/badge"
import { Plus, Search, Edit, Trash2, Eye, User, Loader2 } from "lucide-react"
import { solicitacaoApi, beneficiarioApi, type Solicitacao, type Beneficiario } from "@/lib/api"

const statusOptions = [
  { value: "PENDENTE", label: "Pendente" },
  { value: "ATENDIDA", label: "Atendida" },
]

export default function SolicitacoesPage() {
  const { data: solicitacoes, error, isLoading, mutate } = useSWR("solicitacoes", solicitacaoApi.listar)
  const { data: beneficiarios } = useSWR("beneficiarios", beneficiarioApi.listar)
  
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedSolicitacao, setSelectedSolicitacao] = useState<Solicitacao | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    descricao: "",
    status: "PENDENTE" as "PENDENTE" | "ATENDIDA",
    beneficiarioId: "",
  })

  const beneficiarioOptions = (beneficiarios || []).map((b) => ({
    value: b.id?.toString() || "",
    label: b.nome,
  }))

  const filteredSolicitacoes = (solicitacoes || []).filter((sol) => {
    const matchesSearch = sol.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sol.beneficiario?.nome?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !filterStatus || sol.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleView = (solicitacao: Solicitacao) => {
    setSelectedSolicitacao(solicitacao)
    setIsViewModalOpen(true)
  }

  const handleEdit = (solicitacao: Solicitacao) => {
    setSelectedSolicitacao(solicitacao)
    setFormData({
      descricao: solicitacao.descricao,
      status: solicitacao.status,
      beneficiarioId: solicitacao.beneficiario?.id?.toString() || "",
    })
    setIsModalOpen(true)
  }

  const handleNew = () => {
    setSelectedSolicitacao(null)
    setFormData({
      descricao: "",
      status: "PENDENTE",
      beneficiarioId: "",
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (solicitacao: Solicitacao) => {
    if (!solicitacao.id) return
    if (!confirm(`Tem certeza que deseja excluir esta solicitacao?`)) return
    
    try {
      await solicitacaoApi.excluir(solicitacao.id)
      mutate()
    } catch (err) {
      alert("Erro ao excluir solicitacao")
      console.error(err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const beneficiarioSelecionado = beneficiarios?.find(b => b.id?.toString() === formData.beneficiarioId)
    
    const solicitacaoData: Omit<Solicitacao, "id"> = {
      descricao: formData.descricao,
      status: formData.status,
      beneficiario: beneficiarioSelecionado,
    }

    try {
      if (selectedSolicitacao?.id) {
        await solicitacaoApi.atualizar(selectedSolicitacao.id, solicitacaoData)
      } else {
        await solicitacaoApi.criar(solicitacaoData)
      }
      mutate()
      setIsModalOpen(false)
    } catch (err) {
      alert("Erro ao salvar solicitacao")
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const columns = [
    { key: "id", header: "ID" },
    {
      key: "descricao",
      header: "Descricao",
      render: (sol: Solicitacao) => (
        <span className="line-clamp-2 max-w-xs">{sol.descricao}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (sol: Solicitacao) => (
        <Badge variant={sol.status === "ATENDIDA" ? "success" : "warning"}>
          {sol.status === "ATENDIDA" ? "Atendida" : "Pendente"}
        </Badge>
      ),
    },
    {
      key: "beneficiario",
      header: "Beneficiario",
      render: (sol: Solicitacao) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>{sol.beneficiario?.nome || "-"}</span>
        </div>
      ),
    },
    {
      key: "acoes",
      header: "Acoes",
      render: (sol: Solicitacao) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleView(sol); }}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleEdit(sol); }}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(sol); }}
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
          <p className="text-destructive mb-2">Erro ao carregar solicitacoes</p>
          <p className="text-muted-foreground text-sm">Verifique se a API esta rodando</p>
          <Button onClick={() => mutate()} className="mt-4">Tentar novamente</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <PageHeader title="Solicitacoes" description="Gerencie as solicitacoes de doacao">
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Solicitacao
        </Button>
      </PageHeader>

      <div className="p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar solicitacoes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-40"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredSolicitacoes}
            emptyMessage="Nenhuma solicitacao encontrada"
          />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedSolicitacao ? "Editar Solicitacao" : "Nova Solicitacao"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="descricao" className="text-sm font-medium text-foreground">
              Descricao
            </label>
            <textarea
              id="descricao"
              rows={3}
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              placeholder="Descreva a solicitacao..."
              required
              className="mt-1.5 flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Status"
              id="status"
              options={statusOptions}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as "PENDENTE" | "ATENDIDA" })}
            />
            <Select
              label="Beneficiario"
              id="beneficiario"
              options={beneficiarioOptions}
              value={formData.beneficiarioId}
              onChange={(e) => setFormData({ ...formData, beneficiarioId: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {selectedSolicitacao ? "Salvar" : "Cadastrar"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalhes da Solicitacao"
      >
        {selectedSolicitacao && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Descricao</p>
              <p className="text-foreground">{selectedSolicitacao.descricao}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={selectedSolicitacao.status === "ATENDIDA" ? "success" : "warning"}>
                  {selectedSolicitacao.status === "ATENDIDA" ? "Atendida" : "Pendente"}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Beneficiario</p>
                <p className="text-foreground">{selectedSolicitacao.beneficiario?.nome || "-"}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
