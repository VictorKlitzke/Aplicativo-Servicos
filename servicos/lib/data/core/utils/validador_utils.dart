class ValidadorUtils {
  static String? validateEmail(String? value) {
    if (value == null || value.isEmpty) {
      return 'Digite um e-mail válido';
    }
    final RegExp emailRegex = RegExp(
      r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$',
    );
    if (!emailRegex.hasMatch(value)) {
      return 'E-mail inválido';
    }
    return null;
  }

  static String? validatePassword(String? value) {
    if (value == null || value.isEmpty) {
      return 'Digite sua senha';
    }
    if (value.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres';
    }
    return null;
  }

  static String? validateName(String? value) {
    if (value == null || value.isEmpty) {
      return 'Digite seu nome';
    }
    if (value.length < 3) {
      return 'Nome muito curto';
    }
    return null;
  }

  static String? validatePhone(String? value) {
    if (value == null || value.isEmpty) {
      return 'Digite seu telefone';
    }
    final RegExp phoneRegex = RegExp(r'^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$');
    if (!phoneRegex.hasMatch(value)) {
      return 'Telefone inválido';
    }
    return null;
  }
}
