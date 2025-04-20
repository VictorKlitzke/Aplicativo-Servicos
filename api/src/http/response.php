<?php
namespace App\Http;

class Response
{
    public static function json($success, $message, $statusCode = null, $data = [], $error = null)
    {
        ob_start();
        http_response_code($statusCode);
        Request::handleCors();

        echo json_encode([
            'success' => $success,
            'message' => $message,
            'statusCode' => $statusCode,
            ...($data ?? []),
            ...(isset($error) && $error !== '' && $error !== [] ? ['error' => $error] : [])
        ], JSON_THROW_ON_ERROR);
        exit;
    }

}