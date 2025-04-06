<?php
namespace App\Utils;

use App\Http\Response;
use Exception;

class Validator
{
    public static function validator(array $data)
    {
        foreach ($data as $key => $value) {
            if (!is_scalar($value)) {
                continue;
            }
            $data[$key] = trim((string) $value);
        }
    }

}

?>