import 'package:mobile/data/core/config/client_config.dart';
import 'package:mobile/data/core/interface/app_interface.dart';
import 'package:mobile/data/views/widget/app_message_widget.dart';

class AuthRepository {
  Future<bool> login(data) async {
    try {
      final response = await dio.post(
        '/postLogin',
        data: data,
      );

      if (response.statusCode == 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      AppDialogWidget(
        title: "Erro ao logar",
        message: "Erro ao enviar dados para login $error",
        type: DialogType.error,
      );
      return false;
    }
  }
}
