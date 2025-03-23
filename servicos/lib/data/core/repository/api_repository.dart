import 'package:servicos/data/core/models/users_models.dart';
import 'package:servicos/data/core/repository/dio_repository.dart';

class GetServices {
  Future<List<Map<String, dynamic>>> getOrders() async {
    try {
      final response = await dio.get('getPedidos');
      if (response.data != null || response.data['getPedidos']) {
        return List<Map<String, dynamic>>.from(response.data['getuser']);
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
      final response = await dio.post('postRegister', data: users);
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
