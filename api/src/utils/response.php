<?php
namespace App\Utils;

class Response
{
    public static function json($success, $message, $statusCode = null)
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode([
            'success' => $success,
            'message' => $message,
            'statusCode' => $statusCode
        ]);
        exit;
    }
}