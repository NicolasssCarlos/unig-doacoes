"use client"

import { useState } from "react"
import useSWR from "swr"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { DataTable } from "@/components/data-table"
import { Modal } from "@/components/modal"
import { Badge } from "@/components/badge"
import { Plus, Search, Edit, Trash2, Eye, Mail, Phone, MapPin, Loader2 } from "lucide-react"
import { doadorApi, type Doador } from "@/lib/api"

export default function DoadoresPage() {
  const { data: doadores, error, isLoading, mutate } = useSWR("doadores", doadorApi.listar)
  
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedDoador, setSelectedDoador] = useState<Doador | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const filteredDoadores = (doadores || []).filter((d) =>
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

  const handleDelete = async (doador: Doador) => {
    if (!doador.id) return
    if (!confirm(`Tem certeza que deseja excluir o doador "${doador.nome}"?`)) return
    
    try {
      await doadorApi.excluir(doador.id)
      mutate()
    } catch (err) {
      alert("Erro ao excluir doador")
      console.error(err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const doadorData: Omit<Doador, "id"> = {
      nome: formData.nome,
      contato: {
        email: formData.email,
        telefone: formData.telefone,
      },
      endereco: {
        logradouro: formData.logradouro,
        numero: formData.numero,
        complemento: formData.complemento || undefined,
        bairro: formData.bairro,
        cidade: formData.cidade,
        uf: formData.uf,
        cep: formData.cep,
      },
    }

    try {
      if (selectedDoador?.id) {
        await doadorApi.atualizar(selectedDoador.id, doadorData)
      } else {
        await doadorApi.criar(doadorData)
      }
      mutate()
      setIsModalOpen(false)
    } catch (err) {
      alert("Erro ao salvar doador")
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
      key: "itens",
      header: "Itens Doados",
      render: (doador: Doador) => (
        <Badge variant="success">{doador.itens?.length || 0} itens</Badge>
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
            onClick={(e) => { e.stopPropagation(); handleDelete(doador); }}
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
          <p className="text-destructive mb-2">Erro ao carregar doadores</p>
          <p className="text-muted-foreground text-sm">Verifique se a API esta rodando</p>
          <Button onClick={() => mutate()} className="mt-4">Tentar novamente</Button>
        </div>
      </div>
    )
  }

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

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredDoadores}
            emptyMessage="Nenhum doador encontrado"
          />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedDoador ? "Editar Doador" : "Novo Doador"}
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
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Input
                label="Logradouro"
                id="logradouro"
                value={formData.logradouro}
                onChange={(e) => setFormData({ ...formData, logradouro: e.target.value })}
                placeholder="Rua, Avenida..."
                required
              />
            </div>
            <Input
              label="Numero"
              id="numero"
              value={formData.numero}
              onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
              placeholder="123"
              required
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
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Cidade"
              id="cidade"
              value={formData.cidade}
              onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
              placeholder="Cidade"
              required
            />
            <Input
              label="UF"
              id="uf"
              value={formData.uf}
              onChange={(e) => setFormData({ ...formData, uf: e.target.value })}
              placeholder="RJ"
              required
            />
            <Input
              label="CEP"
              id="cep"
              value={formData.cep}
              onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
              placeholder="00000-000"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
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
              <Badge variant="success">{selectedDoador.itens?.length || 0} itens</Badge>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
