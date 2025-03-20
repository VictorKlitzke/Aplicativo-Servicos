<?php
namespace App\Utils;

use App\Http\Response;
use Exception;

class Validator
{
    public static function validator(array $fields)
    {
        foreach ($fields as $field => $value) {
            if (empty(trim($value))) {
                Response::json(false, 'Campos tem que está preenchidos', 401);
            }
        }
        return $fields;
    }
}

?>