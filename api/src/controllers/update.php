<?php

namespace App\Controllers;

use App\Http\Response;
use App\libs\Libs;
use App\Services\Db;
use App\Utils\Input;
use App\Utils\ValidationToken;
use App\Utils\Validator;
use Exception;

class Update
{
    public static function updateProfile()
    {
        $token = ValidationToken::getBearerToken();
        $userId = ValidationToken::validateToken($token);
        $data = Input::data();

        Validator::validator([
            'userId' => $userId,
            'data' => $data
        ]);

        $requiredFields = ['nome', 'email', 'telefone', 'tipo', 'data_cadastro', 'cep', 'estado', 'cidade', 'cpfcnpj'];
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                Response::json(false, "Campo $field é obrigatório", 400);
                return;
            }
        }

        try {
            $pdo = Db::Connection();
            $pdo->beginTransaction();

            $dadosUsuario = [
                'nome' => $data['nome'],
                'email' => $data['email'],
                'telefone' => $data['telefone'],
                'tipo' => $data['tipo'],
                'data_cadastro' => $data['data_cadastro'],
                'cep' => $data['cep'],
                'estado' => $data['estado'],
                'cidade' => $data['cidade'],
                'cpfcnpj' => $data['cpfcnpj'],
            ];

            $resultUpdate = Libs::updateDB("usuarios", $dadosUsuario, ['id' => $userId], $pdo);

            $avatar = isset($data['foto_perfil']) && !empty($data['foto_perfil']) ? base64_decode($data['foto_perfil']) : null;
            $banner = isset($data['banner_perfil']) && !empty($data['banner_perfil']) ? base64_decode($data['banner_perfil']) : null;

            if ($avatar && !Input::isValidBase64($data['foto_perfil'])) {
                Response::json(false, 'Avatar inválido', 400);
                return;
            }
            if ($banner && !Input::isValidBase64($data['banner_perfil'])) {
                Response::json(false, 'Banner inválido', 400);
                return;
            }


            $profileExists = Libs::selectDB('usuario_perfil', $pdo, ['usuario_id' => $userId]);
            if ($profileExists) {
                $resultPerfil = Libs::updateDB("usuario_perfil", [
                    'sobre_mim' => $data['sobre'],
                    'instagram' => $data['instagram'],
                    'banner' => $banner,
                    'avatar' => $avatar,
                ], ['usuario_id' => $userId], $pdo);
            } else {
                $dadosPerfil = [
                    'usuario_id' => $userId,
                    'sobre_mim' => $data['sobre'],
                    'instagram' => $data['instagram'],
                    'banner' => $banner,
                    'avatar' => $avatar,
                ];
                $resultPerfil = Libs::insertDB("usuario_perfil", $dadosPerfil, $pdo);
            }

            $pdo->commit();
            Response::json(true, 'Perfil atualizado com sucesso', 200);

        } catch (Exception $e) {
            $pdo->rollBack();
            Response::json(false, 'Erro ao atualizar dados no banco de dados: ' . $e->getMessage(), 500);
        }
    }
}
?>