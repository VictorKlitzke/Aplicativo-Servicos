import 'package:flutter/material.dart';
import 'package:servicos/data/views/components/app_colors_components.dart';

class AddServices extends StatefulWidget {
  const AddServices({super.key});

  @override
  _AddServicesState createState() => _AddServicesState();
}

class _AddServicesState extends State<AddServices> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _nomeController = TextEditingController();
  final TextEditingController _descricaoController = TextEditingController();
  final TextEditingController _telefoneController = TextEditingController();
  final TextEditingController _valorController = TextEditingController();
  final TextEditingController _descontosController = TextEditingController();
  final TextEditingController _enderecoController = TextEditingController();
  final TextEditingController _numeroController = TextEditingController();

  String? _formaPagamento;
  String? _estado;
  String? _cidade;
  String? _bairro;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.8,
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColorsComponents.surface,
        borderRadius: BorderRadius.vertical(top: Radius.circular(10)),
      ),
      child: Form(
        key: _formKey,
        child: ListView(
          children: [
            Text(
              'Adicionar Serviços',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: AppColorsComponents.onSurface,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 20),
            Center(
              child: Card(
                color: AppColorsComponents.surface,
                elevation: 4,
                margin: EdgeInsets.all(2),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Padding(
                  padding: EdgeInsets.all(18),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'Informações',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                      ),
                      SizedBox(height: 8),
                      _buildTextField('Nome da profissão', _nomeController),
                      _buildTextField(
                        'Descrição',
                        _descricaoController,
                        maxLines: 3,
                      ),
                      _buildTextField(
                        'Telefone',
                        _telefoneController,
                        keyboardType: TextInputType.phone,
                      ),
                    ],
                  ),
                ),
              ),
            ),
            SizedBox(height: 12),
            Center(
              child: Card(
                color: AppColorsComponents.surface,
                elevation: 4,
                margin: EdgeInsets.all(2),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Padding(
                  padding: EdgeInsets.all(18),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'Valores',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                      ),
                      SizedBox(height: 8),
                      Row(
                        children: [
                          Expanded(
                            child: _buildTextField(
                              'Valor (R\$)',
                              _valorController,
                              keyboardType: TextInputType.number,
                            ),
                          ),
                          SizedBox(width: 8),
                          Expanded(
                            child: _buildTextField(
                              'Descontos',
                              _descontosController,
                            ),
                          ),
                          SizedBox(width: 8),
                          Expanded(
                            child: _buildDropdown(
                              'Forma de Pagamento',
                              ['Dinheiro', 'Cartão', 'PIX'],
                              _formaPagamento,
                              (value) {
                                setState(() {
                                  _formaPagamento = value;
                                });
                              },
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ),
            SizedBox(height: 12),
            Center(
              child: Card(
                color: AppColorsComponents.surface,
                elevation: 4,
                margin: EdgeInsets.all(2),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Padding(
                  padding: EdgeInsets.all(18),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'Endereço',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                      ),
                      SizedBox(height: 8),
                      _buildTextField('Região', TextEditingController()),
                      _buildDropdown('Estado', ['SP', 'RJ', 'MG'], _estado, (
                        value,
                      ) {
                        setState(() {
                          _estado = value;
                        });
                      }),
                      _buildDropdown(
                        'Cidade',
                        ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte'],
                        _cidade,
                        (value) {
                          setState(() {
                            _cidade = value;
                          });
                        },
                      ),
                      _buildDropdown(
                        'Bairro',
                        ['Centro', 'Vila Olímpia', 'Barra da Tijuca'],
                        _bairro,
                        (value) {
                          setState(() {
                            _bairro = value;
                          });
                        },
                      ),
                      _buildTextField('Endereço', _enderecoController),
                      _buildTextField(
                        'Número',
                        _numeroController,
                        keyboardType: TextInputType.number,
                      ),
                    ],
                  ),
                ),
              ),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColorsComponents.primary,
                padding: EdgeInsets.symmetric(vertical: 15),
              ),
              child: Text(
                'Salvar',
                style: TextStyle(
                  color: AppColorsComponents.surface,
                  fontSize: 16,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField(
    String label,
    TextEditingController controller, {
    int maxLines = 1,
    TextInputType keyboardType = TextInputType.text,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: TextFormField(
        controller: controller,
        decoration: InputDecoration(
          labelText: label,
          labelStyle: TextStyle(color: AppColorsComponents.onBackground),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10),
            borderSide: BorderSide(color: AppColorsComponents.primary),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10),
            borderSide: BorderSide(color: AppColorsComponents.primary),
          ),
        ),
        maxLines: maxLines,
        keyboardType: keyboardType,
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'Este campo é obrigatório';
          }
          return null;
        },
      ),
    );
  }

  Widget _buildDropdown(
    String label,
    List<String> items,
    String? value,
    Function(String?) onChanged,
  ) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: DropdownButtonFormField<String>(
        value: value,
        decoration: InputDecoration(
          labelText: label,
          labelStyle: TextStyle(color: AppColorsComponents.onBackground),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10),
            borderSide: BorderSide(color: AppColorsComponents.primary),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10),
            borderSide: BorderSide(color: AppColorsComponents.primary),
          ),
        ),
        items:
            items.map((String item) {
              return DropdownMenuItem<String>(value: item, child: Text(item));
            }).toList(),
        onChanged: onChanged,
        validator: (value) {
          if (value == null || value.isEmpty) {
            return 'Este campo é obrigatório';
          }
          return null;
        },
      ),
    );
  }
}
