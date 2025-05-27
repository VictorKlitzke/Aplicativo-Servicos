import 'package:flutter/material.dart';
import 'package:servicos/data/core/repository/api_repository.dart';
import 'package:servicos/data/views/components/app_colors_components.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final GetServices getServices = GetServices();

  List<Map<String, dynamic>> getLogin = [];

  String nome = "";

  @override
  void initState() {
    super.initState();
    fetchLogin();
  }

  void fetchLogin() async {
    try {
      final result = await getServices.getLogin();
      if (result.isNotEmpty) {
        nome = result[0]['nome'];
      }
      setState(() {
        getLogin = result;
      });
    } catch (error) {
      print('Error fetching login: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColorsComponents.background,
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _buildProfileInfo(),
            _buildProfessionalSummary(),
            _buildServiceList(),
          ],
        ),
      ),
    );
  }

  Widget _buildProfileInfo() {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          CircleAvatar(
            radius: 70,
            backgroundColor: AppColorsComponents.primary,
            child: Text(
              'IMG',
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          SizedBox(height: 10),
          Text(
            'Descrição',
            style: TextStyle(
              fontSize: 14,
              fontStyle: FontStyle.italic,
              color: AppColorsComponents.onBackground,
            ),
          ),
          Text(
            'Nome',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: AppColorsComponents.onBackground,
            ),
          ),
          Divider(thickness: 1, color: Colors.grey.shade300, height: 20),
        ],
      ),
    );
  }

  Widget _buildProfessionalSummary() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16),
      child: Card(
        color: AppColorsComponents.surface,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        elevation: 4,
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Resumo do Profissional',
                style: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: AppColorsComponents.onBackground,
                ),
              ),
              SizedBox(height: 8),
              _buildProfessionalDetail('Serviço', 'Designer Gráfico'),
              _buildProfessionalDetail('Telefone', '(11) 98765-4321'),
              _buildProfessionalDetail('Nome', nome),
              _buildProfessionalDetail('Email', 'joao@email.com'),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildProfessionalDetail(String title, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: TextStyle(
              fontWeight: FontWeight.w500,
              color: AppColorsComponents.onBackground,
            ),
          ),
          Text(value, style: TextStyle(color: Colors.grey[700])),
        ],
      ),
    );
  }

  Widget _buildServiceList() {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Card(
        color: AppColorsComponents.surface,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        elevation: 4,
        child: Container(
          height: 120,
          alignment: Alignment.center,
          child: Text(
            'Lista de Serviços',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: AppColorsComponents.onBackground,
            ),
          ),
        ),
      ),
    );
  }
}
