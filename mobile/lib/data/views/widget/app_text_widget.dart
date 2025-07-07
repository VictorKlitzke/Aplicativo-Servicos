import 'package:flutter/material.dart';

class AppTextFieldWidget extends StatelessWidget {
  final String labelText;
  final IconData icon;
  final bool isPassword;
  final String? Function(String?)? validator;
  final void Function(String?)? onSaved;
  final TextInputType keyboardType;
  final TextEditingController? controller;
  final int maxLines; // adiciona maxLines aqui

  const AppTextFieldWidget({
    super.key,
    required this.labelText,
    required this.icon,
    this.isPassword = false,
    this.validator,
    this.onSaved,
    this.keyboardType = TextInputType.text,
    this.controller,
    this.maxLines = 1, // valor padrão 1 linha
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      obscureText: isPassword,
      validator: validator,
      onSaved: onSaved,
      keyboardType: keyboardType,
      maxLines: maxLines, // usa maxLines aqui
      decoration: InputDecoration(
        labelText: labelText,
        prefixIcon: Icon(icon),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
      ),
    );
  }
}
