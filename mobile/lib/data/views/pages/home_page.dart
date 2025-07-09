import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/core/providers/home_provider.dart';
import 'package:mobile/data/views/widget/app_cards_widget.dart';
import 'package:mobile/data/views/widget/themes/app_themes_colors.dart';

class HomePage extends ConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final state = ref.watch(homeProvider);
    return Scaffold(
      backgroundColor: AppColors.light,
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildHeroHeader(state.nomeUsuario),
            const SizedBox(height: 30),
            const Text(
              "O que você deseja fazer?",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 16),
            _buildMenuCards(),
            const SizedBox(height: 32),
            const Text(
              "Serviços disponíveis",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 16),
            _buildCategoriesSection(ref),
          ],
        ),
      ),
    );
  }

  Widget _buildCategoriesSection(WidgetRef ref) {
    final state = ref.watch(homeProvider);

    if (state.isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    if (state.error != null) {
      return Center(child: Text(state.error!));
    }

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children:
          state.groupedServices.entries.map((entry) {
            final categoria = entry.key;
            final servicos = entry.value;

            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  categoria,
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: AppColors.primary,
                  ),
                ),
                const SizedBox(height: 8),
                ...servicos.map((servico) {
                  return Card(
                    child: ListTile(
                      title: Text(servico['SERVICO'] ?? ''),
                      subtitle: Text(servico['DESCRICAOSERVICO'] ?? ''),
                      trailing: Text(servico['DURACAOSERVICO'] ?? ''),
                    ),
                  );
                }).toList(),
                const SizedBox(height: 16),
              ],
            );
          }).toList(),
    );
  }

  Widget _buildMenuCards() {
    return SizedBox(
      height: 120,
      child: ListView(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        children: [
          AppCardWidget(
            width: 180,
            height: 90,
            onTap: () {},
            leadingIcon: const Icon(
              Icons.design_services,
              color: AppColors.primary,
              size: 30,
            ),
            subtitle: const Text('Contrate seu serviço'),
            title: const Text(
              "Contratar Serviço",
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppColors.dark,
              ),
            ),
            elevation: 6,
            borderRadius: 14,
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
            backgroundColor: Colors.white,
          ),
          const SizedBox(width: 12),
          AppCardWidget(
            width: 180,
            height: 90,
            onTap: () {},
            leadingIcon: const Icon(
              Icons.person_add,
              color: AppColors.primary,
              size: 30,
            ),
            title: const Text(
              "Sou Prestador",
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppColors.dark,
              ),
            ),
            elevation: 6,
            borderRadius: 14,
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
            backgroundColor: Colors.white,
          ),
          const SizedBox(width: 12),
          AppCardWidget(
            width: 180,
            height: 90,
            onTap: () {},
            leadingIcon: const Icon(
              Icons.calendar_today,
              color: AppColors.primary,
              size: 30,
            ),
            title: const Text(
              "Agendamentos",
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppColors.dark,
              ),
            ),
            elevation: 6,
            borderRadius: 14,
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
            backgroundColor: Colors.white,
          ),
          const SizedBox(width: 12),
          AppCardWidget(
            width: 180,
            height: 90,
            leadingIcon: const Icon(
              Icons.settings,
              color: AppColors.primary,
              size: 28,
            ),
            title: const Text('Configurações'),
            subtitle: const Text('Configurações do app'),
            onTap: () => print('Card clicado'),
            elevation: 6,
            borderRadius: 14,
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
            backgroundColor: Colors.white,
          ),
        ],
      ),
    );
  }

  Widget _buildHeroHeader(String? nomeUsuario) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: AppColors.primary.withOpacity(0.1),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        children: [
          const CircleAvatar(
            radius: 30,
            backgroundColor: Colors.white,
            child: Icon(Icons.account_circle, size: 40, color: Colors.grey),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "Olá, ${nomeUsuario ?? 'Usuário'}",
                  style: const TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const Text(
                  "Vamos facilitar seu dia hoje?",
                  style: TextStyle(fontSize: 14, color: Colors.black54),
                ),
              ],
            ),
          ),
          const Icon(Icons.waving_hand_rounded, color: Colors.orange, size: 30),
        ],
      ),
    );
  }
}
