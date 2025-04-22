<?php
namespace App\Utils;

use Exception;

class Input
{
    public static function data()
    {
        return json_decode(file_get_contents("php://input"), true);
    }

    public static function dataFormData() {
        $data = [];
        
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            foreach ($_POST as $key => $value) {
                $data[$key] = $value;
            }
        }
    
        if ($_FILES) {
            foreach ($_FILES as $key => $file) {
                if (isset($file['tmp_name']) && !empty($file['tmp_name'])) {
                    $data[$key] = $file;
                }
            }
        }
    
        var_dump($_POST); 
        var_dump($_FILES);
    
        return $data;
    }

    public static function processFile($file, $uploadDir)
    {
        if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
            return null;
        }

        $fileName = uniqid() . '_' . basename($file['name']);
        $filePath = $uploadDir . $fileName;

        if (!move_uploaded_file($file['tmp_name'], $filePath)) {
            throw new Exception("Erro ao mover o arquivo {$file['name']}");
        }

        return 'uploads/' . $fileName;
    }
}
?>