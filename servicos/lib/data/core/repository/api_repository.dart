import 'package:servicos/data/core/models/users_models.dart';
import 'package:servicos/data/core/repository/dio_repository.dart';

class GetServices {
  Future<List<Map<String, dynamic>>> getLogin() async {
    try {
      final response = await dio.get('getLogin');
      if (response.data == 200) {
        return List<Map<String, dynamic>>.from(response.data['getLogin']);
      } else {
        return [];
      }
    } catch (error) {
      print('erro ao consultar a api: $error');
      return [];
    }
  }
}

class PostRepository {
  Future<bool> postRegister(UsersModels users) async {
    try {
      final response = await dio.post(
        'postRegisterUsers',
        data: users.toJson(),
      );
      if (response.statusCode == 200) {
        return true;
      } else {
        print('Erro ao registrar: ${response.data}');
        return false;
      }
    } catch (error) {
      print('Erro ao consultar a api: $error');
      return false;
    }
  }
}
