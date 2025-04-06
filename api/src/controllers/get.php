<?php
declare(strict_types=1);

namespace App\Controllers;

use App\libs\Libs;
use App\Services\Db;
use App\Http\Response;
use App\Utils\ValidationToken;
use App\Utils\Validator;
use Exception;
use PDO;


class Get
{

    public static function getServices(): void
    {
        try {

            $joins = [
                [
                    "type" => "INNER",
                    "table" => "CATEGORIAS_SERVICOS CS",
                    "on" => "CS.ID = S.CATEGORIA_ID",
                ],
                [
                    "type" => "INNER",
                    "table" => "USUARIOS U",
                    "on" => "U.ID = P.USUARIO_ID",
                ],
                [
                    "type" => "INNER",
                    "table" => "PROFISSIONAIS P",
                    "on" => "P.ID = S.PROFISSIONAL_ID",
                ],
            ];
            $pdo = self::getDbConnection();

            $result = Libs::selectDB("SERVICOS S ", [], $joins, 'SELECT
                        S.TITULO SERVICO,
                        CS.NOME CATEGORIA,
                        S.DESCRICAO DESCRICAOSERVICO,
                        S.PRECO,
                        S.DURACAO DURACAOSERVICO,
                        U.NOME PROFISSIONAL', $pdo);

            Response::json(true, 'Lista de serviços', 200, ['serviços' => $result[0]]);

        } catch (Exception $e) {
            Response::json(false, 'Erro ao obter serviços: ' . $e->getMessage(), 500);
        }
    }
    public static function getLogin()
    {
        $token = ValidationToken::getBearerToken() ?? Response::json(false, 'Token não fornecido.', 401);
        $userId = ValidationToken::validateToken($token) ?? Response::json(false, 'Token inválido.', 401);

        var_dump($userId);

        Validator::validator(['userId' => $userId]);
        try {

            $pdo = Db::Connection();
            $filters = ['id' => $userId];
            $result = Libs::selectDB(
                'usuarios u', 
                $pdo,
                $filters, 
                [], 
                'id, nome, email, telefone, cep, estado, cpfcnpj, cidade, foto_perfil'
            );

            Response::json(true, 'Lista de usuarios.', 200, ['user' => $result]);

        } catch (Exception $e) {
            Response::json(false, 'Erro ao obter usuário: ' . $e->getMessage(), 500);
        }
    }
}
?>