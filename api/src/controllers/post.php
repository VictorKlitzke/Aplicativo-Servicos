<?php
namespace App\Controllers;

use App\Services\authServices;
use App\Database\Db;
use App\Helpers\Helpers;
use App\Utils\Input;
use App\Http\Response;
use App\Utils\validateToken;
use App\Utils\Validator;
use Exception;

class Post
{
    public static function postServices()
    {
        $token = validateToken::getBearerToken();
        $userId = validateToken::validateToken($token);
        Validator::validator(['userId' => $userId]);

        $data = Input::data();

        $titulo = $data['titulo'];
        $categoria = $data['categoria'];
        $preco = $data['preco'];
        $descricao = $data['descricao'];
        $tempoExecucao = $data['tempoExecucao'];
        $cidade = $data['cidade'];
        $cep = $data['cep'];
        $estado = $data['estado'];
        $tipoAtendimento = $data['tipoAtendimento'];
        $imagem = $data['imagem'];
        $ativo = 1;

        Validator::validator(['titulo' => $titulo, 'categoria' => $categoria, 'descricao' => $descricao, 'preco' => $preco]);

        try {
            $insertData = [
                'titulo' => $titulo,
                'categoria_id' => $categoria,
                'preco' => $preco,
                'descricao' => $descricao,
                'tempo_execucao' => $tempoExecucao,
                'cidade' => $cidade,
                'cep' => $cep,
                'estado' => $estado,
                'tipo_atendimento' => $tipoAtendimento,
                'imagem' => $imagem,
                'user_id' => $userId,
                'ativo' => $ativo,
                'created_at' => date('Y-m-d H:i:s'),
            ];

            $pdo = Db::Connection();

            return Helpers::insertDb('servicos', $insertData, $pdo);
        } catch (Exception $e) {
            Response::json(false, $e->getMessage(), 400);
        }
    }

    public function postRegisterUsers()
    {
        $data = Input::data();

        $name = $data['nome'];
        $email = $data['email'];
        $password = $data['password'];
        $phone = $data['telefone'];
        $userType = $data['userType'];

        Validator::validator([
            'userType' => $userType,
            'email' => $email,
            'password' => $password,
            'telefone' => $phone
        ]);

        try {
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);

            $dadosInsert = [
                'nome' => $name,
                'email' => $email,
                'senha' => $hashed_password,
                'telefone' => $phone,
                'tipo' => $userType
            ];

            $pdo = Db::Connection();
            $resultado = Helpers::insertDb('usuarios', $dadosInsert, $pdo);

            Response::json(true, 'Usuário cadastrado com sucesso.', 200, ['id' => $resultado['id']]);

        } catch (Exception $e) {
            Response::json(false, $e->getMessage(), 400);
        }
    }

    public function postCategoryServices()
    {
        $token = validateToken::getBearerToken();
        $userId = validateToken::validateToken($token);

        Validator::validator(['userId' => $userId]);
        $data = Input::data();

        $categoria = $data['categoria'];

        Validator::validator([
            'categoria' => $categoria
        ]);

        try {
            $pdo = Db::Connection();

            $filters = ['nome LIKE' => $categoria, 'usuario_id' => $userId];

            $result = Helpers::selectDb("categorias_servicos", $pdo, $filters);

            if ($result > 0) {
                Response::json(false, 'Categoria já cadastrada', 400);
            }

            $dadosInsert = [
                'nome' => $categoria,
                'usuario_id' => $userId
            ];

            $resultado = Helpers::insertDb('categorias_servicos', $dadosInsert, $pdo);

            Response::json(true, 'Categoria cadastrada com sucesso.', 200);

        } catch (Exception $e) {
            Response::json(false, $e->getMessage(), 400);
        }
    }

    public function postLogin()
    {
        try {
            $data = Input::data();
            $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
            $password = $data['senha'];

            Validator::validator(['email' => $email, 'password' => $password]);

            $authServices = new authServices;
            $auth = $authServices->login($email, $password);

            return Response::json(true, 'Login realizado com sucesso.', 200, [
                'user' => $auth['user'],
                'token' => $auth['token'],
            ]);
        } catch (Exception $e) {
            return Response::json(false, $e->getMessage(), 400);
        }
    }

    public static function postLogout()
    {
        $token = validateToken::getBearerToken();
        $userId = validateToken::validateToken($token);
        Validator::validator(['userId' => $userId]);

        $token = $_COOKIE['token'] ?? ($_SERVER['HTTP_AUTHORIZATION'] ?? null);

        !$token ?: Response::json(false, 'Nenhum token encontrado.', 400);
        setcookie('token', '', time() - 3600, '/', '', isset($_SERVER['HTTPS']), true);
        Response::json(true, 'Logout realizado com sucesso.', 200);
    }

    public static function postCommentarys()
    {
        $token = validateToken::getBearerToken();
        $userId = validateToken::validateToken($token);
        Validator::validator(['userId' => $userId]);

        $data = Input::data();
        $data1 = $data['data'];

        $message = $data1['message'];
        $usuario_id = $data1['usuario_id'];
        $servicos_id = $data1['servicos_id'];

        Validator::validator(['messagem' => $message, 'usuario' => $usuario_id]);
        try {

        } catch (Exception $e) {
            Response::json(false, "erro ao tentar inserir dados: ", 500, ['error' => $e->getMessage()]);
        }
    }

}
?>