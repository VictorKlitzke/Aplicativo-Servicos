import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/core/interface/app_interface.dart';
import 'package:mobile/data/core/repository/api_repository.dart';
import 'package:mobile/data/core/states/home_state.dart';
import 'package:mobile/data/views/widget/app_message_widget.dart';

class HomeController extends StateNotifier<HomeState> {
  HomeController() : super(HomeState()) {
    loadServices();
    loadUsuario();
  }

  Future<void> loadUsuario() async {
    state = state.copyWith(isLoading: true);

    try {
      final users = await GetServices().getLogin();
      final usuario = users[0]['nome'];

      state = state.copyWith(
        nomeUsuario: usuario,
        error: null,
        isLoading: false
      );
    } catch (error) {
      AppDialogWidget(
        title: 'Erro',
        message: "Erro ao carregar usuario",
        type: DialogType.error,
      );
      state = state.copyWith(isLoading: false);
    }
  }

  Future<void> loadServices() async {
    state = state.copyWith(isLoading: true);

    try {
      final services = await GetServices().getServices();
      final grouped = <String, List<Map<String, dynamic>>>{};

      for (var service in services) {
        final categoria = service['CATEGORIA'] ?? 'Outros';
        grouped.putIfAbsent(categoria, () => []).add(service);
      }

      state = state.copyWith(
        groupedServices: grouped,
        isLoading: false,
        error: null,
      );
    } catch (e) {
      AppDialogWidget(
        title: 'Erro',
        message: "Erro ao carregar serviços",
        type: DialogType.error,
      );
      state = state.copyWith(isLoading: false);
    }
  }
}
