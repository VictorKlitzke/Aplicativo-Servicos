<?php
namespace App\controllers;

use App\Services\Db;
use App\Http\Response;
use App\Utils\ValidationToken;
use Exception;
use PDO;

class Get
{
    public static function getServices()
    {
        try {
            $pdo = Db::Connection();
            $query = 'SELECT 
                        s.nome servicos,
                        s.descricao descricaoServicos,
                        s.preco,
                        cs.nome categoria_servicos,
                        u.nome profissional
                    FROM 
                        servicos s 
                        join usuarios u on u.id = s.profissional_id
                        join categorias_servicos cs on cs.id = s.categoria_id
            ';
            $stmt = $pdo->prepare($query);
            $stmt->execute();
            $services = $stmt->fetchAll(PDO::FETCH_ASSOC);

            Response::json(true, 'Lista de serviços', 200, ['serviços' => $services]);

        } catch (Exception $e) {
            Response::json(false, $e->getMessage(), 404);
        }
    }

    public static function getLogin()
    {
        $token = ValidationToken::getBearerToken();
        if (!$token) {
            Response::json(false, 'Token não fornecido.', 401);
        }

        $userId = ValidationToken::validateToken($token);
        if (!$userId) {
            Response::json(false, 'Token inválido.', 401);
        }

        $pdo = Db::Connection();
        $stmt = $pdo->prepare("SELECT id, nome, email FROM usuarios WHERE id = :id");
        $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        Response::json(true, 'Lista de Usuários', 200, ['user' => $user]);
    }

}

?>