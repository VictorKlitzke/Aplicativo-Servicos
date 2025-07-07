import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/core/controllers/auth_controllers.dart';

final loginControllerProvider = ChangeNotifierProvider<LoginController>((ref) {
  return LoginController();
});
