import 'package:flutter/material.dart';
import 'package:servicos/data/core/models/users_models.dart';
import 'package:servicos/data/core/repository/api_repository.dart';

class RegisterController {
  final TextEditingController nameController;
  final TextEditingController emailController;
  final TextEditingController phoneController;
  final TextEditingController passwordController;
  String userType;

  RegisterController({
    required this.nameController,
    required this.emailController,
    required this.phoneController,
    required this.passwordController,
    required this.userType,
  });

  Future<void> registerUser(BuildContext context) async {
    final user = UsersModels(
      nome: nameController.text,
      email: emailController.text,
      telefone: phoneController.text,
      senha: passwordController.text,
      userType: userType,
    );

    PostRepository apiService = PostRepository();
    bool success = await apiService.postRegister(user);

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Usuário registrado com sucesso!')),
      );
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Erro ao registrar usuário')));
    }
  }
}
