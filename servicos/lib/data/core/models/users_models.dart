class UsersModels {
  String nome;
  String email;
  String senha;
  String telefone;
  String userType;

  UsersModels({
    required this.nome,
    required this.email,
    required this.senha,
    required this.telefone,
    required this.userType,
  });

  Map<String, dynamic> toJson() {
    return {
      'nome': nome,
      'email': email,
      'telefone': telefone,
      'password': senha,
      'userType': userType,
    };
  }
}
