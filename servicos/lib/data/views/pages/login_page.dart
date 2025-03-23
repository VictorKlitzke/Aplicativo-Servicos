import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:servicos/data/core/repository/auth_repository.dart';
import 'package:servicos/data/views/components/app_colors_components.dart';
import 'package:servicos/data/views/components/button_components.dart';
// import 'package:servicos/data/core/repository/google_api_repository.dart';

class LoginPage extends StatefulWidget {
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final AuthNetwork authNetwork = AuthNetwork();
  // final GoogleAuthService googleAuthService = GoogleAuthService();
  final _formKey = GlobalKey<FormState>();
  final usernameController = TextEditingController();
  final passwordController = TextEditingController();
  bool isLoading = false;

  void postGoogle(BuildContext context) async {
    // final account = await googleAuthService.signInWithGoogle();
    // if (account != null) {
    //   context.go('/homepage');
    // }
  }

  void postLogin(BuildContext context) async {
    final username = usernameController.text;
    final password = passwordController.text;

    try {
      bool success = await authNetwork.postLogin(username, password);
      if (success) {
        context.go('/homepage');
      }
    } catch (error) {
      print('Erro ao fazer login $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          padding: EdgeInsets.all(20.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Image.asset('assets/image/logo.png', height: 80),
              SizedBox(height: 20.0),
              Card(
                elevation: 8.0,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20.0),
                ),
                child: Padding(
                  padding: EdgeInsets.all(30.0),
                  child: Form(
                    key: _formKey,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Text(
                          'Bem-vindo de volta!',
                          style: TextStyle(
                            fontSize: 22.0,
                            fontWeight: FontWeight.bold,
                            color: Colors.blue.shade800,
                          ),
                        ),
                        SizedBox(height: 24.0),
                        TextFormField(
                          controller: usernameController,
                          decoration: InputDecoration(
                            labelText: 'Usuário',
                            prefixIcon: Icon(
                              Icons.person,
                              color: Colors.blue.shade700,
                            ),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                          ),
                          validator:
                              (value) =>
                                  value == null || value.isEmpty
                                      ? 'Digite seu usuário'
                                      : null,
                        ),
                        SizedBox(height: 16.0),
                        TextFormField(
                          controller: passwordController,
                          obscureText: true,
                          decoration: InputDecoration(
                            labelText: 'Senha',
                            prefixIcon: Icon(
                              Icons.lock,
                              color: Colors.blue.shade700,
                            ),
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(12.0),
                            ),
                          ),
                          validator:
                              (value) =>
                                  value == null || value.isEmpty
                                      ? 'Digite sua senha'
                                      : null,
                        ),
                        SizedBox(height: 24.0),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            PadraoButton(
                              onPressed: () => postLogin(context),
                              text: 'Logar',
                              textColor: AppColorsComponents.background,
                              backgroundColor: AppColorsComponents.primaryDark,
                              fontSize: 14,
                              padding: EdgeInsets.symmetric(
                                vertical: 6,
                                horizontal: 6,
                              ),
                              textAlign: Alignment.bottomLeft,
                            ),

                            SizedBox(height: 12),
                            PadraoButton(
                              onPressed: () => {context.go('/registerpage')},
                              text: 'Registrar-se',
                              textColor: AppColorsComponents.background,
                              backgroundColor: AppColorsComponents.primaryDark,
                              fontSize: 14,
                              padding: EdgeInsets.symmetric(
                                vertical: 6,
                                horizontal: 6,
                              ),
                              textAlign: Alignment.bottomRight,
                            ),
                          ],
                        ),
                        SizedBox(height: 16.0),
                        Text('Ou faça login com'),
                        SizedBox(height: 12.0),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            IconButton(
                              onPressed: () => postGoogle(context),
                              icon: FaIcon(
                                FontAwesomeIcons.google,
                                color: Colors.black,
                              ),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.transparent,
                                padding: EdgeInsets.all(14),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                              ),
                            ),
                            IconButton(
                              onPressed: () => print('X'),
                              icon: FaIcon(
                                FontAwesomeIcons.times,
                                color: Colors.black,
                              ),
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.transparent,
                                padding: EdgeInsets.all(14),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
