import 'package:flutter/material.dart';
import 'package:mobile/data/core/repository/api_repository.dart';
import 'package:mobile/data/views/widget/app_text_widget.dart';
import 'package:mobile/data/views/widget/themes/app_themes_colors.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  Map<String, dynamic>? user;
  bool isLoading = true;
  String? error;

  @override
  void initState() {
    super.initState();
    _loadUser();
  }

  Future<void> _loadUser() async {
    try {
      final response = await GetServices().getLogin();

      if (response.isNotEmpty) {
        setState(() {
          user = response[0];
          isLoading = false;
        });
      } else {
        setState(() {
          error = 'Nenhum usuário encontrado';
          isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        error = 'Erro ao carregar usuário';
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.light,
      body:
          isLoading
              ? const Center(child: CircularProgressIndicator())
              : error != null
              ? Center(
                child: Text(error!, style: const TextStyle(color: Colors.red)),
              )
              : _buildContent(),
    );
  }

  Widget _buildContent() {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildSectionTitle("Informações Pessoais"),
          const SizedBox(height: 16),
          AppTextFieldWidget(labelText: "Nome", icon: Icons.nat, initialValue: user?["nome"]),
          const SizedBox(height: 6),
          AppTextFieldWidget(labelText: "Email", icon: Icons.nat, initialValue: user?["email"]),
          const SizedBox(height: 6),
          AppTextFieldWidget(labelText: "Telefone", icon: Icons.nat, initialValue: user?["telefone"]),
          const SizedBox(height: 6),
          AppTextFieldWidget(labelText: "Instagram", icon: Icons.nat, initialValue: user?["instagram"]),
          const SizedBox(height: 6),
          AppTextFieldWidget(labelText: "Sobre Mim", icon: Icons.nat, initialValue: user?["sobre_mim"] ?? "—", readOnly: true),
          const SizedBox(height: 32),
          _buildSectionTitle("Endereço"),
          const SizedBox(height: 16),
          AppTextFieldWidget(labelText: "CEP", icon: Icons.nat, initialValue: user?["cep"]),
          const SizedBox(height: 6),
          AppTextFieldWidget(labelText: "Cidade", icon: Icons.nat, initialValue: user?["cidade"], readOnly: true),
          const SizedBox(height: 6),
          AppTextFieldWidget(labelText: "Estado", icon: Icons.nat, initialValue: user?["estado"], readOnly: true),

          const SizedBox(height: 32),
          _buildSectionTitle("Outros Dados"),
          const SizedBox(height: 16),
          AppTextFieldWidget(labelText: "CPF/CNPJ", icon: Icons.nat, initialValue: user?["cpfcnpj"], readOnly: true),
          const SizedBox(height: 6),
          AppTextFieldWidget(labelText: "Tipo", icon: Icons.nat, initialValue: user?["tipo"], readOnly: true),
          const SizedBox(height: 6),
          AppTextFieldWidget(labelText: "Data de Cadastro", icon: Icons.nat, initialValue: user?["data_cadastro"], readOnly: true),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(
      title,
      style: const TextStyle(
        color: AppColors.secondary,
        fontSize: 20,
        fontWeight: FontWeight.bold,
      ),
    );
  }
}
