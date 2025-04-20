<?php

namespace App\Utils;

use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ValidationToken
{
    public static function getBearerToken()
    {
        if (isset($_COOKIE['session_token'])) {
            return $_COOKIE['session_token'];
        }
        return null;
    }

    public static function validateToken($token)
    {
        $token = $_COOKIE['session_token'] ?? null;

        if ($token) {
            try {
                $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

                if (isset($decoded->sub)) {
                    return $decoded->sub;
                }
                return null;
            } catch (Exception $e) {
                error_log("Erro ao decodificar token: " . $e->getMessage());
                return null;
            }
        }

        return null;
    }
}