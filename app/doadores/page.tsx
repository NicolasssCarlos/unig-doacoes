"use client"

import { useState } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { Badge } from "@/components/badge"
import { Plus, Search, Edit, Trash2, Eye, Mail, Phone, MapPin } from "lucide-react"

interface Contato {
  email: string
  telefone: string
}

interface Endereco {
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  uf: string
  cep: string
}

interface Doador {
  id: number
  nome: string
  contato: Contato
  endereco: Endereco
  totalItens?: number
}

const mockDoadores: Doador[] = [
  {
    id: 1,
    nome: "Joao Silva",
    contato: { email: "joao@email.com", telefone: "(21) 99999-1111" },
    endereco: { logradouro: "Rua das Flores", numero: "123", bairro: "Centro", cidade: "Nova Iguacu", uf: "RJ", cep: "26255-000" },
    totalItens: 15,
  },
  {
    id: 2,
    nome: "Maria Santos",
    contato: { email: "maria@email.com", telefone: "(21) 99999-2222" },
    endereco: { logradouro: "Av. Brasil", numero: "456", bairro: "Jardim", cidade: "Nova Iguacu", uf: "RJ", cep: "26255-100" },
    totalItens: 8,
  },
  {
    id: 3,
    nome: "Pedro Lima",
    contato: { email: "pedro@email.com", telefone: "(21) 99999-3333" },
    endereco: { logradouro: "Rua Principal", numero: "789", complemento: "Apt 101", bairro: "Vila Nova", cidade: "Nova Iguacu", uf: "RJ", cep: "26255-200" },
    totalItens: 23,
  },
]

export default function DoadoresPage() {
  const [doadores] = useState<Doador[]>(mockDoadores)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedDoador, setSelectedDoador] = useState<Doador | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
  })

  const filteredDoadores = doadores.filter((d) =>
    d.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.contato.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleView = (doador: Doador) => {
    setSelectedDoador(doador)
    setIsViewModalOpen(true)
  }

  const handleEdit = (doador: Doador) => {
    setSelectedDoador(doador)
    setFormData({
      nome: doador.nome,
      email: doador.contato.email,
      telefone: doador.contato.telefone,
      logradouro: doador.endereco.logradouro,
      numero: doador.endereco.numero,
      complemento: doador.endereco.complemento || "",
      bairro: doador.endereco.bairro,
      cidade: doador.endereco.cidade,
      uf: doador.endereco.uf,
      cep: doador.endereco.cep,
    })
    setIsModalOpen(true)
  }

  const handleNew = () => {
    setSelectedDoador(null)
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      cep: "",
    })
    setIsModalOpen(true)
  }

  const columns = [
    { key: "id", header: "ID" },
    { key: "nome", header: "Nome" },
    {
      key: "contato",
      header: "Contato",
      render: (doador: Doador) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-xs">
            <Mail className="h-3 w-3 text-muted-foreground" />
            {doador.contato.email}
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Phone className="h-3 w-3 text-muted-foreground" />
            {doador.contato.telefone}
          </div>
        </div>
      ),
    },
    {
      key: "endereco",
      header: "Endereco",
      render: (doador: Doador) => (
        <div className="flex items-center gap-1 text-xs">
          <MapPin className="h-3 w-3 text-muted-foreground" />
          {doador.endereco.cidade}/{doador.endereco.uf}
        </div>
      ),
    },
    {
      key: "totalItens",
      header: "Itens Doados",
      render: (doador: Doador) => (
        <Badge variant="success">{doador.totalItens} itens</Badge>
      ),
    },
    {
      key: "acoes",
      header: "Acoes",
      render: (doador: Doador) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleView(doador); }}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleEdit(doador); }}
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
      <PageHeader title="Doadores" description="Gerencie os doadores cadastrados">
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Doador
        </Button>
      </PageHeader>

      <div className="p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar doadores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredDoadores}
          emptyMessage="Nenhum doador encontrado"
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedDoador ? "Editar Doador" : "Novo Doador"}
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
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Input
                label="Logradouro"
                id="logradouro"
                value={formData.logradouro}
                onChange={(e) => setFormData({ ...formData, logradouro: e.target.value })}
                placeholder="Rua, Avenida..."
              />
            </div>
            <Input
              label="Numero"
              id="numero"
              value={formData.numero}
              onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
              placeholder="123"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Complemento"
              id="complemento"
              value={formData.complemento}
              onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
              placeholder="Apt, Sala..."
            />
            <Input
              label="Bairro"
              id="bairro"
              value={formData.bairro}
              onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
              placeholder="Bairro"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Cidade"
              id="cidade"
              value={formData.cidade}
              onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
              placeholder="Cidade"
            />
            <Input
              label="UF"
              id="uf"
              value={formData.uf}
              onChange={(e) => setFormData({ ...formData, uf: e.target.value })}
              placeholder="RJ"
            />
            <Input
              label="CEP"
              id="cep"
              value={formData.cep}
              onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
              placeholder="00000-000"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {selectedDoador ? "Salvar" : "Cadastrar"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detalhes do Doador"
      >
        {selectedDoador && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Nome</p>
              <p className="text-foreground font-medium">{selectedDoador.nome}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">{selectedDoador.contato.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telefone</p>
                <p className="text-foreground">{selectedDoador.contato.telefone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Endereco</p>
              <p className="text-foreground">
                {selectedDoador.endereco.logradouro}, {selectedDoador.endereco.numero}
                {selectedDoador.endereco.complemento && ` - ${selectedDoador.endereco.complemento}`}
              </p>
              <p className="text-foreground">
                {selectedDoador.endereco.bairro}, {selectedDoador.endereco.cidade}/{selectedDoador.endereco.uf}
              </p>
              <p className="text-foreground">CEP: {selectedDoador.endereco.cep}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total de Itens Doados</p>
              <Badge variant="success">{selectedDoador.totalItens} itens</Badge>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
