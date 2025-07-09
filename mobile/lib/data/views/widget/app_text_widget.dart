import 'package:flutter/material.dart';

class AppTextFieldWidget extends StatelessWidget {
  final String labelText;
  final IconData icon;
  final bool isPassword;
  final bool readOnly;
  final String? Function(String?)? validator;
  final void Function(String?)? onSaved;
  final TextInputType keyboardType;
  final TextEditingController? controller;
  final int maxLines;
  final String? initialValue;

  const AppTextFieldWidget({
    super.key,
    required this.labelText,
    required this.icon,
    this.isPassword = false,
    this.readOnly = false,
    this.validator,
    this.onSaved,
    this.keyboardType = TextInputType.text,
    this.controller,
    this.maxLines = 1,
    this.initialValue,
  });

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
      initialValue: controller == null ? initialValue : null,
      obscureText: isPassword,
      validator: validator,
      onSaved: onSaved,
      keyboardType: keyboardType,
      maxLines: maxLines,
      readOnly: readOnly,
      decoration: InputDecoration(
        labelText: labelText,
        prefixIcon: Icon(icon),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(8)),
      ),
    );
  }
}
