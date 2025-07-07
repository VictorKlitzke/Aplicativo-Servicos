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
          AppTextFieldWidget(
            labelText: "res",
            icon: Icons.abc,
            keyboardType: user?["nome"],
          ),
          _buildReadOnlyField(label: "Nome", value: user?["nome"]),
          _buildReadOnlyField(label: "Email", value: user?["email"]),
          _buildReadOnlyField(label: "Telefone", value: user?["telefone"]),
          _buildReadOnlyField(label: "Instagram", value: user?["instagram"]),
          _buildReadOnlyField(
            label: "Sobre Mim",
            value: user?["sobre_mim"] ?? "—",
          ),

          const SizedBox(height: 32),
          _buildSectionTitle("Endereço"),
          const SizedBox(height: 16),
          _buildReadOnlyField(label: "CEP", value: user?["cep"]),
          _buildReadOnlyField(label: "Cidade", value: user?["cidade"]),
          _buildReadOnlyField(label: "Estado", value: user?["estado"]),

          const SizedBox(height: 32),
          _buildSectionTitle("Outros Dados"),
          const SizedBox(height: 16),
          _buildReadOnlyField(label: "CPF/CNPJ", value: user?["cpfcnpj"]),
          _buildReadOnlyField(label: "Tipo", value: user?["tipo"]),
          _buildReadOnlyField(
            label: "Data de Cadastro",
            value: user?["data_cadastro"],
          ),
        ],
      ),
    );
  }

  Widget _buildReadOnlyField({required String label, required String? value}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: TextFormField(
        initialValue: value ?? '',
        readOnly: true,
        decoration: InputDecoration(
          labelText: label,
          filled: true,
          fillColor: AppColors.readonly,
          labelStyle: const TextStyle(color: AppColors.dark),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
            borderSide: BorderSide.none,
          ),
        ),
        style: const TextStyle(
          color: AppColors.dark,
          fontWeight: FontWeight.w600,
        ),
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
