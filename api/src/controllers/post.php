<?php
namespace App\Controllers;

use App\Services\Db;
use App\Utils\Input;
use App\Utils\JWT;
use App\Http\Response;
use App\Utils\ValidationToken;
use App\Utils\Validator;
use Exception;
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

        $token = ValidationToken::getBearerToken() ?: Response::json(false, 'Token não fornecido.', 401);
        $data = Input::data();
        $userId = ValidationToken::validateToken($token) ?: Response::json(false, 'Token inválido.', 401);;
   
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
        $data = Input::data();
        $username = $data['username'];
        $password = $data['password'];

        Validator::validator(['username' => $username, 'password' => $password]);

        try {
            $pdo = self::getDbConnection();
            $stmt = $pdo->prepare("SELECT 
                                                u.id, 
                                                u.nome, 
                                                u.senha
                                            FROM 
                                                usuarios u 
                                            WHERE 
                                                u.nome = :nome");
            $stmt->bindParam("nome", $username, PDO::PARAM_STR);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user || !password_verify($password, $user['senha'])) {
                Response::json(false, 'Credenciais inválidas.', 400);
                exit();
            }

            $tokenPayload = [
                'id' => $user['id'],
                'username' => $user['nome'],
                'iat' => time(),
                'exp' => time() + (60 * 60 * 24)
            ];
            $token = JWT::encode($tokenPayload);

            Response::json(true, 'Login realizado com sucesso.', 200, [
                'token' => $token,
                'id' => $user['id']
            ]);
            exit();

        } catch (Exception $e) {
            Response::json(false, $e->getMessage(), 400);
            exit();
        }
    }
}
?>