export interface RegisterData {
    nome: string;
    email: string;
    telefone: string;
    password: string;
    userType: 'cliente' | 'profissional';
}

export interface LoginData {
    email: string;
    senha: string;
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