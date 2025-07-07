import 'package:flutter/material.dart';
import 'package:mobile/data/views/widget/app_text_widget.dart';
import 'package:mobile/data/views/widget/themes/app_themes_colors.dart';
import 'package:mobile/data/views/widget/app_button_widget.dart';
import 'package:mobile/data/views/widget/app_dropdown_widget.dart';

class AddServices extends StatefulWidget {
  const AddServices({super.key});

  @override
  _AddServicesState createState() => _AddServicesState();
}

class _AddServicesState extends State<AddServices> {
  final _formKey = GlobalKey<FormState>();

  // Controllers
  final _nomeController = TextEditingController();
  final _descricaoController = TextEditingController();
  final _telefoneController = TextEditingController();
  final _valorController = TextEditingController();
  final _descontosController = TextEditingController();
  final _enderecoController = TextEditingController();
  final _numeroController = TextEditingController();

  // Dropdown values
  String? _formaPagamento;
  String? _estado;
  String? _cidade;
  String? _bairro;

  // Dropdown options
  final List<String> _formasPagamento = ['Dinheiro', 'Cartão', 'PIX'];
  final List<String> _estados = ['SP', 'RJ', 'MG'];
  final List<String> _cidades = [
    'São Paulo',
    'Rio de Janeiro',
    'Belo Horizonte',
  ];
  final List<String> _bairros = ['Centro', 'Vila Olímpia', 'Barra da Tijuca'];

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.8,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.primary,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
      ),
      child: Form(
        key: _formKey,
        child: ListView(
          physics: const BouncingScrollPhysics(),
          children: [
            Text(
              'Adicionar Serviços',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: AppColors.light,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 20),

            _buildCard(
              title: 'Informações',
              children: [
                AppTextFieldWidget(
                  icon: Icons.ac_unit,
                  labelText: 'Nome da profissão',
                  controller: _nomeController,
                  validator: _notEmptyValidator,
                ),
                AppTextFieldWidget(
                  icon: Icons.add_ic_call_outlined,
                  labelText: 'Descrição',
                  controller: _descricaoController,
                  maxLines: 3,
                  validator: _notEmptyValidator,
                ),
                AppTextFieldWidget(
                  icon: Icons.all_inclusive_outlined,
                  labelText: 'Telefone',
                  controller: _telefoneController,
                  keyboardType: TextInputType.phone,
                  validator: _notEmptyValidator,
                ),
              ],
            ),

            const SizedBox(height: 16),

            _buildCard(
              title: 'Valores',
              children: [
                Row(
                  children: [
                    Expanded(
                      child: AppTextFieldWidget(
                        icon: Icons.access_alarms_sharp,
                        labelText: 'Valor (R\$)',
                        controller: _valorController,
                        keyboardType: TextInputType.number,
                        validator: _notEmptyValidator,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: AppTextFieldWidget(
                        icon: Icons.access_alarms_sharp,
                        labelText: 'Descontos',
                        controller: _descontosController,
                        keyboardType: TextInputType.number,
                        validator: _optionalNumberValidator,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: AppDropdownWidget(
                        label: 'Forma de Pagamento',
                        items: _formasPagamento,
                        value: _formaPagamento,
                        onChanged:
                            (val) => setState(() => _formaPagamento = val),
                        validator:
                            (val) =>
                                val == null
                                    ? 'Selecione uma forma de pagamento'
                                    : null,
                      ),
                    ),
                  ],
                ),
              ],
            ),

            const SizedBox(height: 16),

            _buildCard(
              title: 'Endereço',
              children: [
                AppTextFieldWidget(
                  icon: Icons.access_alarm_outlined,
                  labelText: 'Região',
                  controller: TextEditingController(),
                  validator: _notEmptyValidator,
                ),
                AppDropdownWidget(
                  label: 'Estado',
                  items: _estados,
                  value: _estado,
                  onChanged: (val) => setState(() => _estado = val),
                  validator:
                      (val) => val == null ? 'Selecione um estado' : null,
                ),
                AppDropdownWidget(
                  label: 'Cidade',
                  items: _cidades,
                  value: _cidade,
                  onChanged: (val) => setState(() => _cidade = val),
                  validator:
                      (val) => val == null ? 'Selecione uma cidade' : null,
                ),
                AppDropdownWidget(
                  label: 'Bairro',
                  items: _bairros,
                  value: _bairro,
                  onChanged: (val) => setState(() => _bairro = val),
                  validator:
                      (val) => val == null ? 'Selecione um bairro' : null,
                ),
                AppTextFieldWidget(
                  icon: Icons.ac_unit_outlined,
                  labelText: 'Endereço',
                  controller: _enderecoController,
                  validator: _notEmptyValidator,
                ),
                AppTextFieldWidget(
                  icon: Icons.numbers,
                  labelText: 'Número',
                  controller: _numeroController,
                  keyboardType: TextInputType.number,
                  validator: _notEmptyValidator,
                ),
              ],
            ),

            const SizedBox(height: 24),

            AppButtonWidget(
              onPressed: _submit,
              text: 'Salvar',
              backgroundColor: AppColors.secondary,
              textColor: AppColors.light,
              fontSize: 18,
              padding: const EdgeInsets.symmetric(vertical: 16),
              borderRadius: 12,
              elevation: 6,
              isLoading: false,
              textAlign: Alignment.center,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCard({required String title, required List<Widget> children}) {
    return Card(
      color: AppColors.light,
      elevation: 6,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      margin: const EdgeInsets.symmetric(vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.black87,
              ),
            ),
            const SizedBox(height: 12),
            ...children,
          ],
        ),
      ),
    );
  }

  String? _notEmptyValidator(String? value) =>
      (value == null || value.trim().isEmpty)
          ? 'Este campo é obrigatório'
          : null;

  String? _optionalNumberValidator(String? value) {
    if (value == null || value.trim().isEmpty) return null;
    final n = num.tryParse(value);
    if (n == null) return 'Informe um número válido';
    return null;
  }

  void _submit() {
    if (!_formKey.currentState!.validate()) return;

    // Salvar ou enviar dados
    // Pode incluir loading, snackbar, navegação...

    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text('Serviço salvo com sucesso!')));

    // Limpar campos se quiser
    // _formKey.currentState!.reset();
  }

  @override
  void dispose() {
    _nomeController.dispose();
    _descricaoController.dispose();
    _telefoneController.dispose();
    _valorController.dispose();
    _descontosController.dispose();
    _enderecoController.dispose();
    _numeroController.dispose();
    super.dispose();
  }
}
