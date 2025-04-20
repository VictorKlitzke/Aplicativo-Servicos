<?php
namespace App\Controllers;

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
            $pdo = self::getDbConnection();
            $stmt = $pdo->prepare("INSERT INTO usuarios (nome, email, senha, telefone, tipo) 
                                VALUES (:nome, :email, :senha, :telefone, :tipo)");
            $stmt->bindParam("nome", $name, PDO::PARAM_STR);
            $stmt->bindParam("email", $email, PDO::PARAM_STR);
            $stmt->bindParam("telefone", $phone, PDO::PARAM_STR);
            $stmt->bindParam("senha", $hashed_password, PDO::PARAM_STR);
            $stmt->bindParam("tipo", $userType, PDO::PARAM_STR);

            $stmt->execute();

            // $id_prof = $pdo->lastInsertId();

            // $prof = $pdo->prepare("INSERT INTO profissional () VALUES ()");

            Response::json(true, 'Login realizado com sucesso.', 200);
            exit();
        } catch (Exception $e) {
            Response::json(false, $e->getMessage(), 400);
        }
    }
    public function postCategoryServices()
    {

        $token = ValidationToken::getBearerToken();
        $userId = ValidationToken::validateToken($token);
        $data = Input::data();

        $services = $data['services'];
        $description = $data['description'];

        Validator::validator([
            'services' => $services,
            'description' => $description
        ]);

        try {
            $pdo = self::getDbConnection();
            $stmt = $pdo->prepare("INSERT INTO categorias_servicos (nome, descricao) VALUES (:nome, :descricao)");
            $stmt->bindParam("descricao", $description, PDO::PARAM_STR);
            $stmt->bindParam("nome", $services, PDO::PARAM_STR);

            $stmt->execute();

            $stmt->setFetchMode(PDO::FETCH_ASSOC);

            Response::json(true, 'Categorias cadastradas com sucesso.', 200, ['id' => $pdo->lastInsertId()]);

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