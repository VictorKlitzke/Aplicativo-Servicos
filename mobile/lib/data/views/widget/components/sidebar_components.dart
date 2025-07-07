import 'package:flutter/material.dart';
import 'package:mobile/data/views/widget/themes/app_themes_colors.dart';

class SidebarViews extends StatelessWidget {
  const SidebarViews({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      backgroundColor: AppColors.light,
      child: Column(
        children: [
          DrawerHeader(
            decoration: BoxDecoration(
              color: AppColors.primary,
              border: const Border(
                bottom: BorderSide(color: AppColors.light, width: 1.5),
              ),
            ),
            child: buildProfileSection(),
          ),
          Expanded(
            child: ListView(
              padding: EdgeInsets.zero,
              children: [
                buildMenuItem("Anunciar Serviços", Icons.campaign_outlined),
                buildMenuItem("Dados Pessoais", Icons.person_outline),
                buildMenuItem("Localização", Icons.location_on_outlined),
                buildMenuItem("Categorias", Icons.category_outlined),
                buildMenuItem("Sobre", Icons.info_outline, underline: true),
                buildMenuItem("Segurança", Icons.lock_outline),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget buildProfileSection() {
    return Row(
      children: [
        CircleAvatar(
          radius: 32,
          backgroundColor: Colors.white,
          child: Icon(Icons.person, size: 32, color: AppColors.primary),
        ),
        const SizedBox(width: 16),
        Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text(
              "Victor Gabriel",
              style: TextStyle(
                fontSize: 18,
                color: AppColors.light,
                fontWeight: FontWeight.w600,
              ),
            ),
            SizedBox(height: 4),
            Text(
              "Desenvolvedor Mobile",
              style: TextStyle(fontSize: 14, color: AppColors.light),
            ),
          ],
        ),
      ],
    );
  }

  Widget buildMenuItem(String title, IconData icon, {bool underline = false}) {
    return InkWell(
      onTap: () {},
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
        margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(12),
          color: AppColors.light,
          boxShadow: [
            BoxShadow(
              color: Colors.black12,
              blurRadius: 6,
              offset: Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            Icon(icon, size: 22, color: AppColors.primary),
            const SizedBox(width: 16),
            Expanded(
              child: Text(
                title,
                style: TextStyle(
                  fontSize: 16,
                  color: AppColors.dark,
                  fontWeight: FontWeight.w500,
                  decoration:
                      underline
                          ? TextDecoration.underline
                          : TextDecoration.none,
                ),
              ),
            ),
            Icon(Icons.chevron_right, color: AppColors.light),
          ],
        ),
      ),
    );
  }
}
