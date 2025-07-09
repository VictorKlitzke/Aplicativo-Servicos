import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/core/interface/app_interface.dart';
import 'package:mobile/data/core/repository/api_repository.dart';
import 'package:mobile/data/core/states/categorys_state.dart';
import 'package:mobile/data/views/widget/app_message_widget.dart';

class CategorysControllers extends StateNotifier<CategorysState> {
  CategorysControllers() : super(const CategorysState());

  final categoryCtrl = TextEditingController();

  Future<bool> SalveCategory(BuildContext context) async {
    state = state.copyWith(
      isLoading: true,
      error: null,
      category: null,
      descCategory: null,
    );

    final category = categoryCtrl.text.trim();
    final data = {'categoria': category};

    print('data $data');

    try {
      bool success = await PostServices().postCategory(data);

      if (success) {
        AppDialogWidget(
          title: "Categoria",
          message: "Sucesso ao cadastrar categoria",
          type: DialogType.success,
        );
        categoryCtrl.clear();
      }

      state = state.copyWith(isLoading: false);
      return success;
    } catch (error) {
      AppDialogWidget(
        title: "Erro",
        message: "Erro na autenticação da categoria",
        type: DialogType.error,
      );
      state = state.copyWith(isLoading: false, error: error.toString());
      return false;
    }
  }
}
