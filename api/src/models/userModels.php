<?php
namespace App\Models;

use App\Database\Db;
use App\helpers\Helpers;
use App\Http\Response;
use Exception;

class userModels
{
    public function findByEmail($email)
    {
        $pdo = Db::Connection();
        try {

            $filters = ["email" => $email];
            $result = Helpers::selectDB("usuarios", $pdo, $filters);

            return $result;

        } catch (Exception $exeption) {
            Response::json(false, "Erro ao buscar dados do usuario", 500, ["error" => $exeption->getMessage()]);
        }
    }
}


?>