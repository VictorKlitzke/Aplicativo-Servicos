<?php 
namespace App\Utils;
use App\Utils\JWT;
use Exception;
    class ValidationToken {
        public static function getBearerToken() {
            $headers = getallheaders();
            if (isset($headers['Authorization']) && str_starts_with($headers['Authorization'], 'Bearer ')) {
                return substr($headers['Authorization'], 7); // Retorna o token
            }
            return null;
        }
    
        public static function validateToken($token) {
            try {
                $decoded = JWT::decode($token);
                return $decoded['id'] ?? null;
            } catch (Exception $e) {
                return null;
            }
        }
    }

?>