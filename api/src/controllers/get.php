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
                        S.TITULO SERVICO,
                        CS.NOME CATEGORIA,
                        S.DESCRICAO DESCRICAOSERVICO,
                        S.PRECO,
                        S.DURACAO DURACAOSERVICO,
                        U.NOME PROFISSIONAL
                    FROM
                        SERVICOS S 
                        JOIN CATEGORIAS_SERVICOS CS ON CS.ID = S.CATEGORIA_ID
                        JOIN PROFISSIONAIS P ON P.ID = S.PROFISSIONAL_ID
                        JOIN USUARIOS U ON U.ID = P.USUARIO_ID 
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
    public static function getNotificacoes() {
        $token = ValidationToken::getBearerToken();
        if (!$token) {
            Response::json(false, 'Token não fornecido.', 401);
        }

        try {

        } catch (Exception $e) {
            Response::json(false, $e->getMessage(), 404);

        }
    }
}

?>