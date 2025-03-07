import 'package:flutter/material.dart';
import 'package:servicos/data/views/components/widget/list_services.widget.dart';

class HomePage extends StatefulWidget {
  _HomePage createState() => _HomePage();
}

class _HomePage extends State<HomePage> {
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
  }

  Widget build(BuildContext context) {
    return Scaffold(body: ListServicesComponents());
  }
}
