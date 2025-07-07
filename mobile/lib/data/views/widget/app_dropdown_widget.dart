import 'package:flutter/material.dart';
import 'package:mobile/data/views/widget/themes/app_themes_colors.dart';

class AppDropdownWidget extends StatelessWidget {
  final String label;
  final List<String> items;
  final String? value;
  final ValueChanged<String?> onChanged;
  final FormFieldValidator<String>? validator;
  final bool isExpanded;

  const AppDropdownWidget({
    Key? key,
    required this.label,
    required this.items,
    required this.value,
    required this.onChanged,
    this.validator,
    this.isExpanded = true,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField<String>(
      value: value,
      isExpanded: isExpanded,
      decoration: InputDecoration(
        labelText: label,
        labelStyle: TextStyle(color: AppColors.dark),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide(color: AppColors.primary),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(10),
          borderSide: BorderSide(color: AppColors.primary, width: 2),
        ),
      ),
      items:
          items.map((item) {
            return DropdownMenuItem<String>(
              value: item,
              child: Text(item, style: TextStyle(color: AppColors.dark)),
            );
          }).toList(),
      onChanged: onChanged,
      validator: validator,
      dropdownColor: AppColors.light,
      style: TextStyle(color: AppColors.dark, fontSize: 16),
    );
  }
}
