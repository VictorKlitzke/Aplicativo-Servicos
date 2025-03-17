// import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:servicos/data/core/repository/dio_repository.dart';
import 'package:servicos/data/core/routers/app_router.dart';
// import 'package:servicos/firebase_options.dart';

void main() async {
  configureDio();
  WidgetsFlutterBinding.ensureInitialized();
  // if (Firebase.apps.isEmpty) {
  //   await Firebase.initializeApp(
  //     options: DefaultFirebaseOptions.currentPlatform,
  //   );
  // }
  runApp(MyApp());
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
