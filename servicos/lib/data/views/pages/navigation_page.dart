import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:servicos/data/views/components/app_colors_components.dart';
import 'package:servicos/data/views/pages/add_services_page.dart';

class NavigationPage extends StatefulWidget {
  const NavigationPage({super.key});

  @override
  _NavigationPageState createState() => _NavigationPageState();
}

class _NavigationPageState extends State<NavigationPage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppColorsComponents.primary,
      child: SafeArea(
        child: BottomAppBar(
          notchMargin: 8.0,
          color: Colors.transparent,
          elevation: 1,
          child: Stack(
            alignment: Alignment.center,
            clipBehavior: Clip.none,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  IconButton(
                    icon: Icon(
                      Icons.home,
                      color: AppColorsComponents.secondaryLight,
                    ),
                    onPressed: () {
                      context.go('/homepage');
                    },
                  ),
                  IconButton(
                    icon: Icon(
                      Icons.search,
                      color: AppColorsComponents.secondaryLight,
                    ),
                    onPressed: () {
                      context.go('/search');
                    },
                  ),
                  SizedBox(width: 40),
                  IconButton(
                    icon: Icon(
                      Icons.list,
                      color: AppColorsComponents.secondaryLight,
                    ),
                    onPressed: () {
                      context.go('/list');
                    },
                  ),
                  IconButton(
                    icon: Icon(
                      Icons.account_circle,
                      color: AppColorsComponents.secondaryLight,
                    ),
                    onPressed: () {
                      context.go('/profile');
                    },
                  ),
                ],
              ),
              Positioned(
                top: -25,
                child: FloatingActionButton(
                  onPressed: () {
                    showModalBottomSheet(
                      context: context,
                      isScrollControlled: true,
                      builder: (context) {
                        return AddServices();
                      },
                    );
                  },
                  backgroundColor: AppColorsComponents.primaryDark,
                  child: Icon(Icons.add, color: AppColorsComponents.background),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
