import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/views/pages/services_add_page.dart';
import 'package:mobile/data/views/widget/themes/app_themes_colors.dart';

class NavigationPage extends StatefulWidget {
  const NavigationPage({super.key});

  @override
  _NavigationPageState createState() => _NavigationPageState();
}

class _NavigationPageState extends State<NavigationPage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppColors.primary,
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
                    icon: Icon(Icons.home, color: AppColors.light),
                    onPressed: () {
                      context.go('/homepage');
                    },
                  ),
                  IconButton(
                    icon: Icon(Icons.search, color: AppColors.light),
                    onPressed: () {
                      context.go('/search');
                    },
                  ),
                  SizedBox(width: 40),
                  IconButton(
                    icon: Icon(Icons.list, color: AppColors.light),
                    onPressed: () {
                      context.go('/list');
                    },
                  ),
                  IconButton(
                    icon: Icon(Icons.account_circle, color: AppColors.light),
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
                  backgroundColor: AppColors.secondary,
                  child: Icon(Icons.add, color: AppColors.light),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
