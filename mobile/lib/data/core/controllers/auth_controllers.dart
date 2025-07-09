import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/core/interface/app_interface.dart';
import 'package:mobile/data/core/repository/auth_repository.dart';
import 'package:mobile/data/core/states/login_state.dart';
import 'package:mobile/data/views/widget/app_message_widget.dart';

class LoginController extends ChangeNotifier {
  final emailCtrl = TextEditingController();
  final senhaCtrl = TextEditingController();

  LoginState _state = const LoginState();
  LoginState get state => _state;

  void _setState(LoginState newState) {
    _state = newState;
    notifyListeners();
  }

  Future<bool> login(BuildContext context) async {
    _setState(_state.copyWith(isLoading: true, error: null, userEmail: null));

    final email = emailCtrl.text.trim();
    final senha = senhaCtrl.text.trim();

    final data = {'email': email, 'senha': senha};
    _setState(_state.copyWith(isLoading: true));

    try {
      final success = await AuthRepository().login(data);

      if (!success) {
        AppDialogWidget(
          title: "Login",
          message: "Erro ao efetuar o login",
          type: DialogType.error,
        );
      } else {
        context.go("/homepage");
      }

      _setState(_state.copyWith(isLoading: false));

      return success;
    } catch (error) {
      AppDialogWidget(
        title: "Erro",
        message: "Autenticação falhou",
        type: DialogType.error,
      );
      return false;
    }
  }

  void disposeControllers() {
    emailCtrl.dispose();
    senhaCtrl.dispose();
  }
}
