<?php
namespace App\Controllers;

use App\libs\Libs;
use App\Services\Db;
use App\Utils\Input;
use App\Http\Response;
use App\Utils\ValidationToken;
use App\Utils\Validator;
use Exception;
use Firebase\JWT\JWT;
use PDO;

class Post
{

    private static function getDbConnection()
    {
        return Db::connection();
    }

    public function postRegisterUsers()
    {
        $data = Input::data();

        $name = $data['nome'] ?? null;
        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;
        $phone = $data['telefone'] ?? null;
        $userType = $data['userType'] ?? null;

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

            $pdo = self::getDbConnection();
            $resultado = Libs::insertDB('usuarios', $dadosInsert, $pdo);

            Response::json(true, 'Usuário cadastrado com sucesso.', 200, ['id' => $resultado['id']]);

        } catch (Exception $e) {
            Response::json(false, $e->getMessage(), 400);
        }
    }

    public function postCategoryServices()
    {
        $token = ValidationToken::getBearerToken();
        $userId = ValidationToken::validateToken($token);

        Validator::validator(['userId' => $userId]);
        $data = Input::data();

        $categoria = $data['categoria'] ?? null;

        Validator::validator([
            'categoria' => $categoria
        ]);

        try {
            $pdo = self::getDbConnection();

            $filters = ['nome LIKE' => $categoria ];

            $result = Libs::selectDB("categorias_servicos", $pdo, $filters);

            if ($result > 0) {
                Response::json(false, 'Categoria já cadastrada', 400);
            }

            $dadosInsert = [
                'nome' => $categoria,
                'usuario_id' => $userId
            ];

            $resultado = Libs::insertDB('categorias_servicos', $dadosInsert, $pdo);

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

            $pdo = self::getDbConnection();
            $stmt = $pdo->prepare("SELECT 
                                    u.id, 
                                    u.nome, 
                                    u.senha,
                                    u.email
                                  FROM 
                                    usuarios u 
                                  WHERE 
                                    u.email = :email");
            $stmt->bindParam(":email", $email, PDO::PARAM_STR);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                Response::json(false, 'Credenciais inválidas.', 404);
            }

            if (!password_verify($password, $user['senha'])) {
                Response::json(false, 'Credenciais inválidas.', 404);
            }

            $tokenPayload = [
                'sub' => $user['id'],
                'name' => $user['nome'],
                'iat' => time(),
                'exp' => time() + 3600
            ];

            $token = JWT::encode($tokenPayload, $_ENV['JWT_SECRET'], "HS256");

            setcookie('session_token', $token, [
                'expires' => time() + 3600,
                // 'expires' => time() + 15,
                'path' => '/',
                'httponly' => true,
                'samesite' => 'Strict',
                'secure' => false
            ]);

            return Response::json(true, 'Login realizado com sucesso.', 200, [
                'user' => [
                    'id' => $user['id'],
                    'nome' => $user['nome'],
                    'email' => $user['email']
                ],
            ]);

        } catch (Exception $e) {
            return Response::json(false, $e->getMessage(), 400);
        }
    }
}
?>