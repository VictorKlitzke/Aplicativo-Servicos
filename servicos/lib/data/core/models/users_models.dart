class UsersModels {
  String nome;
  String email;
  String telefone;
  String userType;
  String? senha;
  String? cep;
  String? cpfCnpj;
  String? estado;
  String? cidade;
  String? endereco;
  String? fotoPerfil;

  UsersModels({
    required this.nome,
    required this.email,
    required this.telefone,
    required this.userType,
    this.senha,
    this.cep,
    this.cpfCnpj,
    this.estado,
    this.cidade,
    this.endereco,
    this.fotoPerfil,
  });

  Map<String, dynamic> toJson() {
    return {
      'nome': nome,
      'password': senha,
      'email': email,
      'telefone': telefone,
      'userType': userType,
    };
  }

  factory UsersModels.fromJson(Map<String, dynamic> json) {
    return UsersModels(
      nome: json['nome'] ?? '',
      email: json['email'] ?? '',
      telefone: json['telefone'] ?? '',
      userType: json['userType'] ?? '',
      cep: json['cep'],
      cpfCnpj: json['cpfcnpj'],
      estado: json['estado'],
      cidade: json['cidade'],
      endereco: json['endereco'],
      fotoPerfil: json['foto_perfil'],
    );
  }
}
