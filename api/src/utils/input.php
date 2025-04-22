<?php
namespace App\Utils;

class Input {
    public static function data() {
        return json_decode(file_get_contents("php://input"), true);
    }

    public static function isValidBase64($data)
    {
        return base64_encode(base64_decode($data, true)) === $data;
    }
}
?>
