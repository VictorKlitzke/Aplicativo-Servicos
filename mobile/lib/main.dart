import 'package:flutter/material.dart';
import 'package:mobile/data/core/config/client_config.dart';
import 'package:mobile/data/core/routers/app_routers.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

void main() async {
  configureDio();

  WidgetsFlutterBinding.ensureInitialized();
  runApp(ProviderScope(child: const MyApp()));
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
