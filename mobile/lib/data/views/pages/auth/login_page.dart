import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/core/interface/app_interface.dart';
import 'package:mobile/data/core/providers/login_provider.dart';
import 'package:mobile/data/views/widget/app_button_widget.dart';
import 'package:mobile/data/views/widget/app_message_widget.dart';
import 'package:mobile/data/views/widget/app_text_widget.dart';
import 'package:mobile/data/views/widget/themes/app_themes_colors.dart';

class LoginView extends ConsumerWidget {
  const LoginView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final vm = ref.watch(loginControllerProvider);
    final state = vm.state;

    return Scaffold(
      backgroundColor: AppColors.light,
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.lock, size: 72, color: AppColors.primary),
              const SizedBox(height: 16),
              const Text(
                'Bem-vindo de volta!',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: AppColors.dark,
                ),
              ),
              const SizedBox(height: 32),
              AppTextFieldWidget(
                controller: vm.emailCtrl,
                labelText: 'Email',
                icon: Icons.email,
                keyboardType: TextInputType.emailAddress,
              ),
              const SizedBox(height: 20),
              AppTextFieldWidget(
                controller: vm.senhaCtrl,
                labelText: 'Senha',
                icon: Icons.lock,
                isPassword: true,
              ),
              const SizedBox(height: 30),
              state.isLoading
                  ? const CircularProgressIndicator()
                  : SizedBox(
                width: double.infinity,
                child: AppButtonWidget(
                  text: 'Entrar',
                  onPressed: () => vm.login(context),
                  textColor: Colors.white,
                  fontSize: 18,
                  padding: const EdgeInsets.symmetric(
                    vertical: 16,
                    horizontal: 24,
                  ),
                  textAlign: Alignment.center,
                  icon: Icons.login,
                ),
              ),
              const SizedBox(height: 16),
              if (state.error != null)
                AppDialogWidget(
                  title: 'Erro',
                  message: state.error!,
                  type: DialogType.error,
                ),
              if (state.userEmail != null)
                Text(
                  'Bem-vindo, ${state.userEmail}',
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
              TextButton(
                onPressed: () {},
                child: const Text(
                  'Esqueceu a senha?',
                  style: TextStyle(color: AppColors.dark),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
