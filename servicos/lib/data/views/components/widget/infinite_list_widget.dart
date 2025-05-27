import 'package:flutter/material.dart';

class InfiniteListComponents extends StatelessWidget {
  final ScrollController controller;
  final Color color;

  const InfiniteListComponents({
    super.key,
    required this.controller,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      color: color,
      child: ListView.builder(
        controller: controller,
        itemCount: 50,
        itemBuilder:
            (context, index) => ListTile(
              title: Text('Item $index', style: TextStyle(color: Colors.white)),
            ),
      ),
    );
  }
}
