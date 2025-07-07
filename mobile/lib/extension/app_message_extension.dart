import 'package:flutter/material.dart';
import 'package:mobile/data/core/interface/app_interface.dart';

extension DialogTypeExtension on DialogType {
  Color get color {
    switch (this) {
      case DialogType.success:
        return Colors.green;
      case DialogType.warning:
        return Colors.orange;
      case DialogType.error:
        return Colors.red;
      case DialogType.info:
      default:
        return Colors.blue;
    }
  }

  IconData get icon {
    switch (this) {
      case DialogType.success:
        return Icons.check_circle;
      case DialogType.warning:
        return Icons.warning;
      case DialogType.error:
        return Icons.error;
      case DialogType.info:
      default:
        return Icons.info;
    }
  }
}
