import 'package:servicos/data/core/models/users_models.dart';
import 'package:servicos/data/core/repository/dio_repository.dart';

class GetServices {
  Future<UsersModels?> getLogin() async {
    try {
      final response = await dio.get('getLogin');
      print('Response data: ${response.data}');
      if (response.data != null ||
          response.data['getLogin'] && response.data is Map<String, dynamic>) {
        return UsersModels.fromJson(response.data);
      } else {
        return null;
      }
    } catch (error) {
      print('erro ao consultar a api: $error');
      return null;
    }
  }
}

class PostRepository {
  Future<bool> postRegister(UsersModels users) async {
    try {
      print('Enviando dados: ${users.toJson()}');
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
