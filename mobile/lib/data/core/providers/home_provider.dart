import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/core/controllers/home_controller.dart';
import 'package:mobile/data/core/states/home_state.dart';

final homeProvider = StateNotifierProvider<HomeController, HomeState>(
      (ref) => HomeController(),
);
