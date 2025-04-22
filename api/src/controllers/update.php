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
        Validator::validator(['userId' => $userId]);

        $data = Input::dataFormData();
        $files = $_FILES;

        var_dump($data['nome']);

        try {
            $pdo = Db::Connection();

            $dadosUsuario = [];

            $updateUser = Libs::updateDB("usuarios", $dadosUsuario, ['id' => $userId], $pdo);

            $uploadDir = __DIR__ . '/../public/uploads';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }

            $avatarPath = null;
            $bannerPath = null;
            if (isset($files['foto_perfil']) && !empty($files['foto_perfil']['tmp_name'])) {
                $avatarPath = Input::processFile($files['foto_perfil'], $uploadDir);
            }
            if (isset($files['banner_perfil']) && !empty($files['banner_perfil']['tmp_name'])) {
                $bannerPath = Input::processFile($files['banner_perfil'], $uploadDir);
            }

            $dadosPerfil = [
                'sobre_mim' => $data['sobre'] ?? null,
                'instagram' => $data['instagram'] ?? null,
                'avatar' => $avatarPath,
                'banner' => $bannerPath,
            ];

            $perfilExistente = Libs::selectDB('usuario_perfil', $pdo, ['usuario_id' => $userId]);
            if ($perfilExistente) {
                Libs::updateDB("usuario_perfil", $dadosPerfil, ['usuario_id' => $userId], $pdo);
            } else {
                $dadosPerfil['usuario_id'] = $userId;
                Libs::insertDB("usuario_perfil", $dadosPerfil, $pdo);
            }
            Response::json(true, 'Perfil atualizado com sucesso', 200);

        } catch (Exception $e) {
            Response::json(false, 'Erro ao atualizar perfil: ' . $e->getMessage(), 500);
        }
    }

}
?>