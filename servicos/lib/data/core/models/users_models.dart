class UsersModels {
  final String nome;
  final String email;
  final String senha;
  final String telefone;
  final UserType userType; // Tipo correto como enum
  final String? cidade;
  final String? estado;
  final String? cep;
  final DateTime? dataNascimento;
  final String? fotoPerfil;
  final bool emailVerificado;

  UsersModels({
    required this.nome,
    required this.email,
    required this.senha,
    required this.telefone,
    required this.userType,
    this.cidade,
    this.estado,
    this.cep,
    this.dataNascimento,
    this.fotoPerfil,
    this.emailVerificado = false,
  });

  // Método auxiliar para conversão de String para UserType
  static UserType convertStringToUserType(String typeString) {
    switch (typeString.toLowerCase()) {
      case 'profissional':
        return UserType.profissional;
      case 'administrador':
        return UserType.administrador;
      case 'cliente':
      default:
        return UserType.cliente;
    }
  }

  Map<String, dynamic> toJson() {
    return {
      'nome': nome,
      'email': email,
      'telefone': telefone,
      'password': senha,
      'userType': userType.name, // Usando .name do enum
      'cidade': cidade,
      'estado': estado,
      'cep': cep,
      'dataNascimento': dataNascimento?.toIso8601String(),
      'foto_perfil': fotoPerfil,
      'email_verificado': emailVerificado,
    }..removeWhere((_, value) => value == null);
  }

  static UserType fromString(String typeString) {
    switch (typeString.toLowerCase()) {
      case 'profissional':
        return UserType.profissional;
      case 'administrador':
        return UserType.administrador;
      case 'cliente':
      default:
        return UserType.cliente;
    }
  }

  factory UsersModels.fromJson(Map<String, dynamic> json) {
    return UsersModels(
      nome: json['nome'] as String,
      email: json['email'] as String,
      senha: json['password'] ?? json['senha'] as String,
      telefone: json['telefone'] as String,
      userType: UserType.values.firstWhere(
        (e) => e.name == json['userType'].toString().toLowerCase(),
        orElse: () => UserType.cliente,
      ),
      cidade: json['cidade'] as String?,
      estado: json['estado'] as String?,
      cep: json['cep'] as String?,
      dataNascimento:
          json['dataNascimento'] != null
              ? DateTime.parse(json['dataNascimento'] as String)
              : null,
      fotoPerfil: json['foto_perfil'] as String?,
      emailVerificado: json['email_verificado'] as bool? ?? false,
    );
  }

  UsersModels copyWith({
    String? nome,
    String? email,
    String? senha,
    String? telefone,
    UserType? userType,
    String? cidade,
    String? estado,
    String? cep,
    DateTime? dataNascimento,
    String? fotoPerfil,
    bool? emailVerificado,
  }) {
    return UsersModels(
      nome: nome ?? this.nome,
      email: email ?? this.email,
      senha: senha ?? this.senha,
      telefone: telefone ?? this.telefone,
      userType: fromString(userType.toString()) ?? this.userType,
      cidade: cidade ?? this.cidade,
      estado: estado ?? this.estado,
      cep: cep ?? this.cep,
      dataNascimento: dataNascimento ?? this.dataNascimento,
      fotoPerfil: fotoPerfil ?? this.fotoPerfil,
      emailVerificado: emailVerificado ?? this.emailVerificado,
    );
  }
}

enum UserType {
  cliente,
  profissional,
  administrador;

  String get displayName => name;
}
