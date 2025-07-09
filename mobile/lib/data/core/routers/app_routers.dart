import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile/data/views/layout/base_layout.dart';
import 'package:mobile/data/views/pages/auth/login_page.dart';
import 'package:mobile/data/views/pages/categorys_page.dart';
import 'package:mobile/data/views/pages/home_page.dart';
import 'package:mobile/data/views/pages/profile_page.dart';

final GoRouter appRouters = GoRouter(
  routes: [
    GoRoute(path: '/', builder: (context, state) => LoginView()),
    GoRoute(
      path: '/homepage',
      builder: (context, state) => BaseLayout(body: HomePage()),
    ),
    GoRoute(
      path: '/profile',
      builder: (context, state) => BaseLayout(body: ProfilePage()),
    ),GoRoute(
      path: '/categorias',
      builder: (context, state) => BaseLayout(body: CategorysPage()),
    ),
    // GoRoute(path: '/registerpage', builder: (context, state) => RegisterPage()),
  ],
  errorBuilder:
      (context, state) => Scaffold(
        body: Center(
          child: Text('Rota não encontrada: ${state.namedLocation('name')}'),
        ),
      ),
);
