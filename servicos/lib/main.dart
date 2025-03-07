import 'package:flutter/material.dart';
import 'package:servicos/data/core/repository/dio_repository.dart';
import 'package:servicos/data/core/routers/app_router.dart';

void main() {
  configureDio();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: appRouters,
      debugShowCheckedModeBanner: true,
      title: 'APP',
    );
  }
}
