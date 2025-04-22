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
                    "table" => "USUARIOS U",
                    "on" => "U.ID = S.USER_ID",
                ],
            ];

            $filters = ['S.USER_ID' => $userId];

            $select_coluns = '
                            S.ID,
                            S.TITULO SERVICO,
                            CS.NOME CATEGORIA,
                            S.DESCRICAO DESCRICAOSERVICO,
                            S.PRECO,
                            S.tempo_execucao DURACAOSERVICO,
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
    public static function getCategorys()
    {
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
            Response::json(false, 'Erro ao buscar dados do banco de dados: ' . $e->getMessage(), 500);
        }
    }
    public static function getLogin()
    {
        $token = ValidationToken::getBearerToken();
        $userId = ValidationToken::validateToken($token);

        Validator::validator(['userId' => $userId]);

        try {

            $joins = [
                [
                    'type' => 'INNER',
                    'table' => 'usuario_perfil up',
                    'on' => 'u.ID = up.USUARIO_ID',
                ]
            ];

            $pdo = Db::Connection();
            $filters = ['u.id' => $userId];
            $result = Libs::selectDB(
                'usuarios u',
                $pdo,
                $filters,
                $joins,
                'u.id, u.nome, u.email, u.telefone, u.cep, u.estado, u.cpfcnpj, u.cidade, u.data_cadastro, u.tipo, up.sobre_mim, up.avatar, up.banner, up.instagram'
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