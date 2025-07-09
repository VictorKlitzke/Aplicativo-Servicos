import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile/data/core/controllers/categorys_controllers.dart';
import 'package:mobile/data/core/states/categorys_state.dart';

final CategoryProvider = StateNotifierProvider<CategorysControllers, CategorysState>(
      (ref) => CategorysControllers(),
);
