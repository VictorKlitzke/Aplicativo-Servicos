import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:servicos/data/core/controllers/registers_controllers.dart';
import 'package:servicos/data/core/utils/validador_utils.dart';
import 'package:servicos/data/views/components/app_colors_components.dart';
import 'package:servicos/data/views/components/button_components.dart';

class RegisterPage extends StatefulWidget {
  @override
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _formKey = GlobalKey<FormState>();
  late RegisterController registerController;
  final TextEditingController nameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  String userType = 'Cliente';

  void initState() {
    super.initState();
    registerController = RegisterController(
      nameController: nameController,
      emailController: emailController,
      phoneController: phoneController,
      passwordController: passwordController,
      userType: userType,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(backgroundColor: AppColorsComponents.primary),
      backgroundColor: AppColorsComponents.background,
      body: Center(
        child: SingleChildScrollView(
          padding: EdgeInsets.all(20.0),
          child: Card(
            elevation: 8.0,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20.0),
            ),
            child: Padding(
              padding: EdgeInsets.all(30.0),
              child: Form(
                child: Column(
                  key: _formKey,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Text(
                      'Crie sua conta',
                      style: TextStyle(
                        fontSize: 22.0,
                        fontWeight: FontWeight.bold,
                        color: Colors.blue.shade800,
                      ),
                    ),
                    SizedBox(height: 20.0),
                    _buildTextField(
                      nameController,
                      'Nome',
                      Icons.person,
                      validator: ValidadorUtils.validateName,
                    ),
                    SizedBox(height: 16.0),
                    _buildTextField(
                      emailController,
                      'Email',
                      Icons.email,
                      validator: ValidadorUtils.validateEmail,
                    ),
                    SizedBox(height: 16.0),
                    _buildTextField(
                      phoneController,
                      'Telefone',
                      Icons.phone,
                      validator: ValidadorUtils.validatePhone,
                    ),
                    SizedBox(height: 16.0),
                    _buildTextField(
                      passwordController,
                      'Senha',
                      Icons.lock,
                      obscureText: true,
                      validator: ValidadorUtils.validatePassword,
                    ),
                    SizedBox(height: 16.0),
                    _buildUserTypeDropdown(),
                    SizedBox(height: 24.0),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        PadraoButton(
                          onPressed:
                              () => registerController.registerUser(context),
                          text: 'Registrar',
                          textColor: AppColorsComponents.background,
                          backgroundColor: AppColorsComponents.primaryDark,
                          fontSize: 14,
                          padding: EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 6,
                          ),
                          textAlign: Alignment.center,
                        ),
                        PadraoButton(
                          onPressed: () => context.go('/'),
                          text: 'Cancelar',
                          textColor: AppColorsComponents.background,
                          backgroundColor: AppColorsComponents.error,
                          fontSize: 14,
                          padding: EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 6,
                          ),
                          textAlign: Alignment.center,
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildTextField(
    TextEditingController controller,
    String label,
    IconData icon, {
    bool obscureText = false,
    String? Function(String?)? validator,
  }) {
    return TextFormField(
      controller: controller,
      obscureText: obscureText,
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon, color: Colors.blue.shade700),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12.0)),
      ),
      validator:
          validator ??
          (value) =>
              value == null || value.isEmpty
                  ? 'Digite seu $label'
                  : null, // Validação padrão
    );
  }

  Widget _buildUserTypeDropdown() {
    return DropdownButtonFormField<String>(
      value: userType,
      decoration: InputDecoration(
        labelText: 'Tipo de usuário',
        prefixIcon: Icon(Icons.person_outline, color: Colors.blue.shade700),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12.0)),
      ),
      items:
          ['Cliente', 'Profissional']
              .map((tipo) => DropdownMenuItem(value: tipo, child: Text(tipo)))
              .toList(),
      onChanged: (value) => setState(() => userType = value!),
    );
  }
}
