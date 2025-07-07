<?php
namespace App\Utils;

use App\Http\Response;

class Validator
{
    public static function validator(array $fields)
    {
        foreach ($fields as $key => $value) {
            if (is_array($value)) {
                self::validator($value);
            } else {
                if (empty($value) && $value !== 0) {
                    Response::json(false, "O campo '{$key}' deve estar preenchido.", 401);
                }
            }
        }
        return $fields;
    }
}
?>