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