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
        $token = ValidationToken::getBearerToken();
        $userId = ValidationToken::validateToken($token);

        Validator::validator(['userId' => $userId]);
        try {

            $pdo = Db::Connection();

            $joins = [
                [
                    "type" => "INNER",
                    "table" => "CATEGORIAS_SERVICOS CS",
                    "on" => "CS.ID = S.CATEGORIA_ID",
                ],
                [
                    "type" => "INNER",
                    "table" => "PROFISSIONAIS P",
                    "on" => "P.ID = S.PROFISSIONAL_ID",
                ],
                [
                    "type" => "INNER",
                    "table" => "USUARIOS U",
                    "on" => "U.ID = P.USUARIO_ID",
                ],
            ];

            $filters = ['P.USUARIO_ID' => $userId];

            $select_coluns = '
                            S.ID,
                            S.TITULO SERVICO,
                            CS.NOME CATEGORIA,
                            S.DESCRICAO DESCRICAOSERVICO,
                            S.PRECO,
                            S.DURACAO DURACAOSERVICO,
                            U.NOME PROFISSIONAL';
            $result = Libs::selectDB("SERVICOS S ", $pdo, $filters, $joins, $select_coluns);


            if ($result == null) {
                Response::json(false, 'Nenhum serviço encontrado para você', 500, ['error' => $result]);
            }

            Response::json(true, 'Lista de serviços', 200, ['getServices' => $result[0]]);

        } catch (Exception $e) {
            Response::json(false, 'Erro ao obter serviços: ' . $e->getMessage(), 500);
        }
    }
    public static function getCategorys() {
        $token = ValidationToken::getBearerToken();
        $userId = ValidationToken::validateToken($token);

        Validator::validator(['userId' => $userId]);

        try {
            $pdo = Db::Connection();
            $filters = ['usuario_id' => $userId];
            $result = Libs::selectDB(
                'categorias_servicos',
                $pdo,
                $filters,
                [],
                'ID, nome as CATEGORIA'
            );

            if ($result == null) {
                Response::json(false, 'Nenhuma categoria encontrado para você', 500, ['error' => $result]);
            }

            Response::json(true, 'Lista de categorias.', 200, ['getCategorys' => $result]);

        } catch (Exception $e) {
            Response::json(false, 'Erro ao buscar dados do banco de dados: '. $e->getMessage(), 500);
        }
    }
    public static function getLogin()
    {
        $token = ValidationToken::getBearerToken();
        $userId = ValidationToken::validateToken($token);

        Validator::validator(['userId' => $userId]);

        try {

            $pdo = Db::Connection();
            $filters = ['id' => $userId];
            $result = Libs::selectDB(
                'usuarios u',
                $pdo,
                $filters,
                [],
                'id, nome, email, telefone, cep, estado, cpfcnpj, cidade, foto_perfil, data_cadastro, tipo'
            );

            if ($result == null) {
                Response::json(false, 'Nenhum serviço encontrado para você', 500, ['error' => $result]);
            }

            Response::json(true, 'Lista de usuarios.', 200, ['getLogin' => $result]);

        } catch (Exception $e) {
            Response::json(false, 'Erro ao obter usuário: ' . $e->getMessage(), 500);
        }
    }
}
?>