<?php 

namespace App\Utils;

use Exception;

    class JWT {
        public static function encode($payload) {
            $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
            $header = self::base64UrlEncode($header);
            $payload = self::base64UrlEncode(json_encode($payload));
            $signature = self::base64UrlEncode(hash_hmac('sha256', "$header.$payload", getenv('JWT_SECRET'), true));
    
            return "$header.$payload.$signature";
        }
    
        public static function decode($token) {
            print($token);
            if (!is_string($token)) {
                throw new Exception('Token inválido: formato incorreto.');
            }
        
            $parts = explode('.', $token);
            if (count($parts) !== 3) {
                throw new Exception('Token inválido: estrutura incorreta.');
            }
        
            list($header, $payload, $signature) = $parts;
        
            $valid = hash_hmac('sha256', "$header.$payload", getenv('JWT_SECRET'), true);
            $valid = self::base64UrlEncode($valid);
        
            if ($signature !== $valid) {
                throw new Exception('Token inválido.');
            }
        
            return json_decode(self::base64UrlDecode($payload), true);
        }        
    
        private static function base64UrlEncode($data) {
            return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
        }
    
        private static function base64UrlDecode($data) {
            return base64_decode(strtr($data, '-_', '+/'));
        }
    }

?>