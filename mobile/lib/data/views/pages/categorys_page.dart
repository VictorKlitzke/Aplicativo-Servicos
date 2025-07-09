import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/core/providers/categorys_provider.dart';
import 'package:mobile/data/views/widget/app_button_widget.dart';
import 'package:mobile/data/views/widget/app_text_widget.dart';
import 'package:mobile/data/views/widget/themes/app_themes_colors.dart';

class CategorysPage extends ConsumerWidget {
  const CategorysPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final vm = ref.watch(CategoryProvider.notifier);
    final state = ref.watch(CategoryProvider);

    return Scaffold(
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          child: Column(
            children: [
              AppTextFieldWidget(
                labelText: 'Nome da Categoria',
                icon: Icons.category,
                controller: vm.categoryCtrl,
                validator: (value) =>
                (value == null || value.isEmpty)
                    ? 'Informe o nome'
                    : null,
              ),
              const SizedBox(height: 6),
              const SizedBox(height: 24),
              AppButtonWidget(
                onPressed: () => vm.SalveCategory(context),
                text: state.isLoading ? "Salvando..." : "Salvar",
                textColor: AppColors.light,
                fontSize: 14,
                padding: const EdgeInsets.symmetric(
                  horizontal: 20,
                  vertical: 14,
                ),
                textAlign: Alignment.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
