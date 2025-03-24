<?php
declare(strict_types=1);

namespace App\Controllers;

use App\Services\Db;
use App\Http\Response;
use App\Utils\ValidationToken;
use Exception;
use PDO;


class Get
{

    private static function getDbConnection(): PDO
    {
        return Db::Connection();
    }

    public static function getServices(): void
    {
        try {
            $pdo = self::getDbConnection();
            $query = 'SELECT 
                        s.nome AS servicos,
                        s.descricao AS descricaoServicos,
                        s.preco,
                        cs.nome AS categoria_servicos,
                        u.nome AS profissional
                      FROM servicos s 
                      JOIN usuarios u ON u.id = s.profissional_id
                      JOIN categorias_servicos cs ON cs.id = s.categoria_id';

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
            $services = $stmt->fetchAll();

            Response::json(true, 'Lista de serviços', 200, ['serviços' => $services]);

        } catch (Exception $e) {
            Response::json(false, 'Erro ao obter serviços: ' . $e->getMessage(), 500);
        }
    }
    public static function getLogin()
    {
        try {
            $token = ValidationToken::getBearerToken() ?: Response::json(false, 'Token não fornecido.', 401);
            $userId = ValidationToken::validateToken($token) ?: Response::json(false, 'Token inválido.', 401);

            $pdo = self::getDbConnection();
            $stmt = $pdo->prepare("SELECT id, nome, email FROM usuarios WHERE id = :id");
            $stmt->bindParam(':id', $userId, PDO::PARAM_INT);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                Response::json(false, 'Usuário não encontrado.', 404);
            }

            Response::json(true, 'Usuário autenticado.', 200, ['user' => $user]);

        } catch (Exception $e) {
            Response::json(false, 'Erro ao obter usuário: ' . $e->getMessage(), 500);
        }
    }
}
?>
