<?php
namespace App\Http;

class Request
{
    public static function method(): string
    {
        return strtoupper($_SERVER["REQUEST_METHOD"]);
    }

    public static function handleCors(): void
    {
        $allowedOrigins = [
            'http://192.168.1.6:5173',
        ];

        $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

        if (in_array($origin, $allowedOrigins)) {
            header("Access-Control-Allow-Origin: $origin");
            header('Access-Control-Allow-Credentials: true');
            header('Vary: Origin');
        }

        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: DENY');
        header('X-XSS-Protection: 1; mode=block');

        if (self::method() === 'OPTIONS') {
            header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
            header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
            header('Access-Control-Max-Age: 86400');
            exit(0);
        }

        header('Content-Type: application/json; charset=utf-8');
    }


    public static function headers(): array
    {
        if (!function_exists('getallheaders')) {
            $headers = [];
            foreach ($_SERVER as $name => $value) {
                if (substr($name, 0, 5) == 'HTTP_') {
                    $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value;
                }
            }
            return $headers;
        }
        return getallheaders();
    }

    public static function isApiRequest(): bool
    {
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        $accept = $_SERVER['HTTP_ACCEPT'] ?? '';

        return strpos($contentType, 'application/json') !== false ||
            strpos($accept, 'application/json') !== false ||
            strpos($contentType, 'application/x-www-form-urlencoded') !== false;
    }
}