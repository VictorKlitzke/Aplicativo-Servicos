import 'package:mobile/data/core/config/client_config.dart';
import 'package:mobile/data/core/interface/app_interface.dart';
import 'package:mobile/data/views/widget/app_message_widget.dart';

class GetServices {
  Future<List<Map<String, dynamic>>> getLogin() async {
    try {
      final response = await dio.get("getLogin");
      if (response.statusCode == 200)
        return List<Map<String, dynamic>>.from(response.data['getLogin'] ?? []);
      else
        return [];
    } catch (error) {
      return [];
    }
  }

  Future<List<Map<String, dynamic>>> getServices() async {
    try {
      final response = await dio.get("getServices");
      if (response.statusCode == 200)
        return List<Map<String, dynamic>>.from(
          response.data['getServices'] ?? [],
        );
      else
        return [];
    } catch (error) {
      return [];
    }
  }
}

class PostServices {
  Future<bool> postCategory(data) async {
    try {
      final response = await dio.post('/postCategoryServices', data: data);

      if (response.statusCode == 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      AppDialogWidget(
        title: "Erro na Categooria",
        message: "Erro ao enviar dados para categoria $error",
        type: DialogType.error,
      );
      return false;
    }
  }
}
