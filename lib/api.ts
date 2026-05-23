// Configuracao da API
// Mude esta URL para a URL da sua API Spring Boot
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

// Tipos baseados nas classes Java
export interface Contato {
  id?: number
  email: string
  telefone: string
}

export interface Endereco {
  id?: number
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  uf: string
  cep: string
}

export interface Doador {
  id?: number
  nome: string
  contato: Contato
  endereco: Endereco
  itens?: Item[]
}

export interface Beneficiario {
  id?: number
  nome: string
  contato: Contato
  solicitacoes?: Solicitacao[]
}

export interface Item {
  id?: number
  nome: string
  quantidade: number
  status: "DISPONIVEL" | "INDISPONIVEL"
  doador?: Doador
}

export interface Solicitacao {
  id?: number
  descricao: string
  status: "PENDENTE" | "ATENDIDA"
  beneficiario?: Beneficiario
}

// Funcao auxiliar para fazer requests
async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })

  if (!res.ok) {
    const error = await res.text()
    throw new Error(error || `Erro ${res.status}`)
  }

  return res.json()
}

// API de Doadores
export const doadorApi = {
  listar: () => fetcher<Doador[]>("/doadores"),
  buscarPorId: (id: number) => fetcher<Doador>(`/doadores/${id}`),
  criar: (data: Omit<Doador, "id">) =>
    fetcher<Doador>("/doadores", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  atualizar: (id: number, data: Partial<Doador>) =>
    fetcher<Doador>(`/doadores/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  excluir: (id: number) =>
    fetcher<void>(`/doadores/${id}`, {
      method: "DELETE",
    }),
}

// API de Beneficiarios
export const beneficiarioApi = {
  listar: () => fetcher<Beneficiario[]>("/beneficiarios"),
  buscarPorId: (id: number) => fetcher<Beneficiario>(`/beneficiarios/${id}`),
  criar: (data: Omit<Beneficiario, "id">) =>
    fetcher<Beneficiario>("/beneficiarios", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  atualizar: (id: number, data: Partial<Beneficiario>) =>
    fetcher<Beneficiario>(`/beneficiarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  excluir: (id: number) =>
    fetcher<void>(`/beneficiarios/${id}`, {
      method: "DELETE",
    }),
}

// API de Itens
export const itemApi = {
  listar: () => fetcher<Item[]>("/itens"),
  buscarPorId: (id: number) => fetcher<Item>(`/itens/${id}`),
  criar: (data: Omit<Item, "id">) =>
    fetcher<Item>("/itens", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  atualizar: (id: number, data: Partial<Item>) =>
    fetcher<Item>(`/itens/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  excluir: (id: number) =>
    fetcher<void>(`/itens/${id}`, {
      method: "DELETE",
    }),
}

// API de Solicitacoes
export const solicitacaoApi = {
  listar: () => fetcher<Solicitacao[]>("/solicitacoes"),
  buscarPorId: (id: number) => fetcher<Solicitacao>(`/solicitacoes/${id}`),
  criar: (data: Omit<Solicitacao, "id">) =>
    fetcher<Solicitacao>("/solicitacoes", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  atualizar: (id: number, data: Partial<Solicitacao>) =>
    fetcher<Solicitacao>(`/solicitacoes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  excluir: (id: number) =>
    fetcher<void>(`/solicitacoes/${id}`, {
      method: "DELETE",
    }),
}
