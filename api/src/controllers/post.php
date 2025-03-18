<?php
namespace App\controllers;

use App\Services\Db;
use App\Utils\Input;
use App\Utils\JWT;
use App\Utils\Response;
use Exception;
use PDO;

class Post
{
    public function postLogin()
    {
        $data = Input::data();
        if (empty($data['username']) || empty($data['password'])) {
            Response::json(false, 'Usuário ou senha incompletas', statusCode: 400);
        }

        $username = $data['username'];
        $password = $data['password'];

        try {
            $stmt = Db::Connection()->prepare("SELECT * FROM usuario WHERE nome = :nome");
            $stmt->bindParam("nome", $username, PDO::PARAM_STR);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user || !password_verify($password, $user['password'])) {
                Response::json(false, 'Credenciais inválidas.', 400);
            }

            $token = JWT::decode([
                'id'=> $user['id'],
                'exp' => time() + 3600,
            ]);

            Response::json(true, 'Usuário Logado', 200);
        } catch (Exception $e) {
            Response::json(false, $e->getMessage(), 400);
        }
    }
}
?>
