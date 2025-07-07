<?php

namespace App\Http;

class Request
{
    public static function method()
    {
        return $_SERVER["REQUEST_METHOD"];
    }
    public static function header()
    {
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: http://192.168.103.251:5173');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 3600');

        if (self::method() == "OPTIONS") {
            http_response_code(200);
            exit();
        }
    }
}