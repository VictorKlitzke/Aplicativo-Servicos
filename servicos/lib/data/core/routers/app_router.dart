import 'package:servicos/data/views/components/base_layout.dart';
import 'package:servicos/data/views/pages/home_page.dart';
import 'package:servicos/data/views/pages/list_page.dart';
import 'package:servicos/data/views/pages/login_page.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:servicos/data/views/pages/profile_page.dart';
import 'package:servicos/data/views/pages/register_page.dart';
import 'package:servicos/data/views/pages/search_page.dart';

final GoRouter appRouters = GoRouter(
  routes: [
    GoRoute(path: '/', builder: (context, state) => LoginPage()),
    GoRoute(path: '/registerpage', builder: (context, state) => RegisterPage()),
    GoRoute(
      path: '/homepage',
      builder: (context, state) => BaseLayout(body: HomePage()),
    ),
    GoRoute(
      path: '/profile',
      builder: (context, state) => BaseLayout(body: ProfilePage()),
    ),
    GoRoute(
      path: '/search',
      builder: (context, state) => BaseLayout(body: SearchPage()),
    ),
    GoRoute(
      path: '/list',
      builder: (context, state) => BaseLayout(body: ListPage()),
    ),
  ],
  errorBuilder:
      (context, state) => Scaffold(
        body: Center(
          child: Text('Rota não encontrada: ${state.namedLocation('name')}'),
        ),
      ),
);
