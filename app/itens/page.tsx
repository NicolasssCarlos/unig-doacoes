"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Select } from "@/components/select"
import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { Badge } from "@/components/badge"
import { Plus, Search, Edit, Trash2, Eye, User } from "lucide-react"

type StatusItem = "DISPONIVEL" | "INDISPONIVEL"

interface Item {
  id: number
  nome: string
  quantidade: number
  status: StatusItem
  doador: {
    id: number
    nome: string
  }
}

const mockItens: Item[] = [
  {
    id: 1,
    nome: "Camisetas",
    quantidade: 25,
    status: "DISPONIVEL",
    doador: { id: 1, nome: "Joao Silva" },
  },
  {
    id: 2,
    nome: "Calcas Jeans",
    quantidade: 15,
    status: "DISPONIVEL",
    doador: { id: 2, nome: "Maria Santos" },
  },
  {
    id: 3,
    nome: "Sapatos",
    quantidade: 0,
    status: "INDISPONIVEL",
    doador: { id: 1, nome: "Joao Silva" },
  },
  {
    id: 4,
    nome: "Cobertores",
    quantidade: 10,
    status: "DISPONIVEL",
    doador: { id: 3, nome: "Pedro Lima" },
  },
  {
    id: 5,
    nome: "Alimentos Nao Pereciveis",
    quantidade: 50,
    status: "DISPONIVEL",
    doador: { id: 2, nome: "Maria Santos" },
  },
]

const statusOptions = [
  { value: "DISPONIVEL", label: "Disponivel" },
  { value: "INDISPONIVEL", label: "Indisponivel" },
]

const doadorOptions = [
  { value: "1", label: "Joao Silva" },
  { value: "2", label: "Maria Santos" },
  { value: "3", label: "Pedro Lima" },
]

export default function ItensPage() {
  const [itens] = useState<Item[]>(mockItens)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    quantidade: "",
    status: "",
    doadorId: "",
  })

  const filteredItens = itens.filter((item) => {
    const matchesSearch = item.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !filterStatus || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleView = (item: Item) => {
    setSelectedItem(item)
    setIsViewModalOpen(true)
  }

  const handleEdit = (item: Item) => {
    setSelectedItem(item)
    setFormData({
      nome: item.nome,
      quantidade: item.quantidade.toString(),
      status: item.status,
      doadorId: item.doador.id.toString(),
    })
    setIsModalOpen(true)
  }

  const handleNew = () => {
    setSelectedItem(null)
    setFormData({
      nome: "",
      quantidade: "",
      status: "",
      doadorId: "",
    })
    setIsModalOpen(true)
  }

  const columns = [
    { key: "id", header: "ID" },
    { key: "nome", header: "Nome" },
    {
      key: "quantidade",
      header: "Quantidade",
      render: (item: Item) => (
        <span className="font-medium">{item.quantidade} unidades</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: Item) => (
        <Badge variant={item.status === "DISPONIVEL" ? "success" : "warning"}>
          {item.status === "DISPONIVEL" ? "Disponivel" : "Indisponivel"}
        </Badge>
      ),
    },
    {
      key: "doador",
      header: "Doador",
      render: (item: Item) => (
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span>{item.doador.nome}</span>
        </div>
      ),
    },
    {
      key: "acoes",
      header: "Acoes",
      render: (item: Item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleView(item); }}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleEdit(item); }}
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
      <PageHeader title="Itens" description="Gerencie os itens disponiveis para doacao">
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Item
        </Button>
      </PageHeader>

      <div className="p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar itens..."
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

        <DataTable
          columns={columns}
          data={filteredItens}
          emptyMessage="Nenhum item encontrado"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedItem ? "Editar Item" : "Novo Item"}
      >
        <form className="space-y-4">
          <Input
            label="Nome"
            id="nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Nome do item"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Quantidade"
              id="quantidade"
              type="number"
              value={formData.quantidade}
              onChange={(e) => setFormData({ ...formData, quantidade: e.target.value })}
              placeholder="0"
            />
            <Select
              label="Status"
              id="status"
              options={statusOptions}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            />
          </div>
          <Select
            label="Doador"
            id="doador"
            options={doadorOptions}
            value={formData.doadorId}
            onChange={(e) => setFormData({ ...formData, doadorId: e.target.value })}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {selectedItem ? "Salvar" : "Cadastrar"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalhes do Item"
      >
        {selectedItem && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nome</p>
              <p className="text-foreground font-medium">{selectedItem.nome}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Quantidade</p>
                <p className="text-foreground">{selectedItem.quantidade} unidades</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={selectedItem.status === "DISPONIVEL" ? "success" : "warning"}>
                  {selectedItem.status === "DISPONIVEL" ? "Disponivel" : "Indisponivel"}
                </Badge>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Doador</p>
              <p className="text-foreground">{selectedItem.doador.nome}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
