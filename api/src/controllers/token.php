<?php

namespace App\Controllers;

use App\Utils\ValidationToken;
use App\Http\Response;

class token
{
    public function validateToken()
    {
        $userId = ValidationToken::validateToken(null);

        if ($userId) {
            return Response::json(true, 'Token válido', 200);
        } else {
            return Response::json(false, 'Token inválido', 401);
        }
    }
}
