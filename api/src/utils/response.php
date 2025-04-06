<?php
namespace App\Utils;

class Response
{
    public static function json($success, $message, $statusCode = null, $data = [])
    {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        
        $response = [
            'success' => $success,
            'message' => $message,
            'statusCode' => $statusCode
        ];
    
        if (!empty($data)) {
            $response = array_merge($response, $data);
        }
    
        echo json_encode($response);
        exit;
    }
    
}