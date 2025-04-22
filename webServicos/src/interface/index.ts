export interface RegisterData {
  nome: string;
  email: string;
  telefone: string;
  password: string;
  userType: 'cliente' | 'profissional';
}

export interface Users {
  nome: string;
  email: string;
  userType: string;
  avatar: string; 
}

export interface LoginData {
  email: string;
  senha: string;
}

export interface ProfileData {
  nome: string;
  email: string;
  telefone: string;
  tipo: string;
  data_cadastro: string;
  cep: string;
  estado: string;
  cidade: string;
  cpfcnpj: string;
  sobre: string;
  instagram: string;
  whatsapp: string;
  foto_perfil: File | null;
  banner_perfil: File | null;
  status: string;
  ultimo_login: string;
}


export interface ServicesData {
  titulo: string;
  categoria: string;
  preco: string;
  descricao: string;
  estado: string;
  cidade: string;
  cep: string;
  tipoAtendimento: string;
  tempoExecucao: string;
  imagem?: string;
}

export interface RegisterCategory {
  categoria: string;
}

export interface Categoria {
  ID: number;
  CATEGORIA: string;
};

export interface Service {
  ID: number;
  SERVICO: string;
  DESCRICAOSERVICO: string;
  CATEGORIA: string;
  PROFISSIONAL: string;
  DURACAOSERVICO: Float32Array;
  PRECO: Float32Array;
}

export type ModalType = "success" | "error" | "warning" | "info";
export interface MessageInterface {
  show: boolean;
  type: ModalType;
  message: string;
  title?: string;
}

export interface DetailsInteface {
  show: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
  size?: "sm" | "lg" | "xl";
  centered?: boolean;
}