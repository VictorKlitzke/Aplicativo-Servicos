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

    private static function getDbConnection() {
        return Db::connection();
    }
    public function postUsers()
    {
        $data = Input::data();
        if (empty($data['username']) || empty($data['password'])) {
            Response::json(false, 'Usuário ou senha incompletas.', 400);
        }

        try {

        } catch (Exception $e) {
            Response::json(false, $e->getMessage(), 400);
        }
    }
    public function postCategoryServices()
    {

        $token = ValidationToken::getBearerToken();
        if (!$token) {
            Response::json(false, 'Token não fornecido.', 401);
        }

        $userId = ValidationToken::validateToken($token);
        if (!$userId) {
            Response::json(false, 'Token inválido.', 401);
        }


        $data = Input::data();
        if (empty($data['services']) || empty($data['description'])) {
            Response::json(false, 'Nome da categoria é obrigatório.', 400);
        }

        $services = $data['services'];
        $description = $data['description'];

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
            $stmt = Db::Connection()->prepare("SELECT id, nome, senha FROM usuarios WHERE nome = :nome");
            $stmt->bindParam("nome", $username, PDO::PARAM_STR);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user || !password_verify($password, $user['senha'])) {
                Response::json(false, 'Credenciais inválidas.', 400);
            }

            $token = JWT::encode(['id' => $user['id'], 'username' => $user['nome']]);

            Response::json(true, 'Login realizado com sucesso.', 200, ['token' => $token, 'id' => $user['id']]);
        } catch (Exception $e) {
            Response::json(false, $e->getMessage(), 400);
        }
    }
}
?>