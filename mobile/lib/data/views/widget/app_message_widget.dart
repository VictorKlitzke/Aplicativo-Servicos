import 'dart:async';
import 'package:flutter/material.dart';
import 'package:mobile/data/core/interface/app_interface.dart';
import 'package:mobile/extension/app_message_extension.dart';

class AppDialogWidget extends StatefulWidget {
  final String title;
  final String message;
  final DialogType type;

  const AppDialogWidget({
    Key? key,
    required this.title,
    required this.message,
    required this.type,
  }) : super(key: key);

  @override
  State<AppDialogWidget> createState() => _AppDialogWidgetState();
}

class _AppDialogWidgetState extends State<AppDialogWidget> {
  @override
  void initState() {
    super.initState();
    Timer(const Duration(seconds: 5), () {
      if (mounted) Navigator.of(context).pop();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      backgroundColor: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      insetPadding: const EdgeInsets.all(20),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 24.0, horizontal: 20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(widget.type.icon, size: 48, color: widget.type.color),
            const SizedBox(height: 12),
            Text(
              widget.title,
              style: TextStyle(
                fontSize: 20,
                color: widget.type.color,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 12),
            Text(
              widget.message,
              style: const TextStyle(fontSize: 16, color: Colors.black87),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),
            Text(
              'Fechando em 5 segundos...',
              style: TextStyle(color: Colors.grey[600], fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }
}
