<?php 
namespace App\Http;

class Request {
    public static function method() {
        return $_SERVER["REQUEST_METHOD"];
    }

    public static function contentType() {
        return header('Content-Type: application/json');
    }
}