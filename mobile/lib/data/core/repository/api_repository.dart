import 'package:mobile/data/core/config/client_config.dart';

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
        return List<Map<String, dynamic>>.from(response.data['getServices'] ?? []);
      else
        return [];

    } catch (error) {
      return [];
    }
  }
}
