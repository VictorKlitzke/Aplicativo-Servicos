import 'package:flutter/material.dart';
import 'package:servicos/data/views/components/app_colors_components.dart';

class SidebarViews extends StatelessWidget {
  const SidebarViews({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: [
          DrawerHeader(
            decoration: const BoxDecoration(
              color: AppColorsComponents.primary,
              border: Border(
                bottom: BorderSide(color: AppColorsComponents.surface),
              ),
            ),
            child: Align(
              alignment: Alignment.centerLeft,
              child: buildProfileSection(),
            ),
          ),
          Expanded(
            child: ListView(
              children: [
                buildMenuItem("Anunciar Serviços"),
                buildMenuItem("Dados Pessoais"),
                buildMenuItem("Localização"),
                buildMenuItem("Categorias"),
                buildMenuItem("Sobre", underline: true),
                buildMenuItem("Segurança"),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget buildProfileSection() {
    return Container(
      padding: EdgeInsets.all(12),
      alignment: Alignment.centerLeft,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          CircleAvatar(
            radius: 30,
            backgroundColor: Colors.white,
            child: Text("IMG"),
          ),
          SizedBox(width: 16),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                "Nome",
                style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.bold,
                ),
              ),
              Text("Profissão", style: TextStyle(color: Colors.black)),
            ],
          ),
        ],
      ),
    );
  }

  Widget buildMenuItem(String title, {bool underline = false}) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: TextStyle(
              color: Colors.black,
              fontSize: 16,
              fontWeight: FontWeight.bold,
              decoration:
                  underline ? TextDecoration.underline : TextDecoration.none,
            ),
          ),
          Icon(Icons.arrow_right, color: Colors.black),
        ],
      ),
    );
  }
}
