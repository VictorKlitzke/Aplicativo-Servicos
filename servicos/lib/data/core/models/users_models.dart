class UsersModels {
  String nome;
  String email;
  String password;
  String telefone;
  String userType;

  UsersModels({
    required this.nome,
    required this.email,
    required this.password,
    required this.telefone,
    required this.userType,
  });

  Map<String, String> toMap() {
    return {
      'nome': nome,
      'email': email,
      'telefone': telefone,
      'password': password,
      'userType': userType,
    };
  }
}
