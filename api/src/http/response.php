<?php

namespace App\Http;

class Response
{
    public static function json($success, $message, $statusCode = null, $data = [], $error = null)
    {
        http_response_code($statusCode);
        $response = [
            'success' => $success,
            'message' => $message,
            'statusCode' => $statusCode
        ];

        if (!empty($data) && is_array($data)) $response = array_merge($response, $data);
        if (!empty($error)) $response['error'] = $error;

        echo json_encode($response, JSON_THROW_ON_ERROR);
        exit;
    }
}