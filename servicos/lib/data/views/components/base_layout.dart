import 'package:flutter/material.dart';
import 'package:servicos/data/views/components/app_colors_components.dart';
import 'package:servicos/data/views/components/sidebar_components.dart';
import 'package:servicos/data/views/pages/navigation_page.dart';

class BaseLayout extends StatelessWidget {
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
  final Widget body;

  BaseLayout({super.key, required this.body});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(
        backgroundColor: AppColorsComponents.primary,
        elevation: 0,
        leadingWidth: 100,
        leading: Row(
          children: [
            IconButton(
              icon: Icon(Icons.menu, color: Colors.white, size: 24),
              onPressed: () {
                scaffoldKey.currentState?.openDrawer();
                return;
              },
            ),
            IconButton(
              icon: Icon(Icons.message, color: Colors.white, size: 24),
              onPressed: () {
                print('Ícone de mensagem pressionado!');
              },
            ),
          ],
        ),
        title: Container(
          width: MediaQuery.of(context).size.width * 0.9,
          height: 40,
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Center(
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Pesquisar...',
                border: InputBorder.none,
                contentPadding: EdgeInsets.symmetric(
                  vertical: 12,
                  horizontal: 15,
                ),
                suffixIcon: Icon(Icons.search, color: Colors.grey),
              ),
            ),
          ),
        ),
      ),
      drawer: SidebarViews(),
      backgroundColor: const Color(0xFFF3F7FB),
      resizeToAvoidBottomInset: true,
      body: Column(children: [Expanded(child: body), NavigationPage()]),
    );
  }
}
