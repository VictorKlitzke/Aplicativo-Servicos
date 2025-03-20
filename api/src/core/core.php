<?php

namespace App\Core;

use App\Http\Request;
use App\Http\Response;

class Core
{
    public static function dispatch(array $routers)
    {
        $url = str_replace('/api', '', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
        $prefixController = 'App\\Controllers\\';

        foreach ($routers as $router) {
            $patterns = "#^" . preg_quote($router['path'], '#') . "$#";

            if (preg_match($patterns, $url, $matches)) {
                array_shift($matches); 

                if (strtoupper($router['method']) !== Request::method()) {
                    Response::json(false, 'Método não permitido.', 405);
                    return;
                }

                [$controller, $action] = explode('@', $router['action']);
                $controller = $prefixController . $controller;
                if (!class_exists($controller)) {
                    Response::json(false, "Controlador '$controller' não encontrado.", 500);
                    return;
                }

                $extendcontroller = new $controller();
                if (!method_exists($extendcontroller, $action)) {
                    Response::json(false, "Método '$action' não encontrado no controlador.", 500);
                    return;
                }
                call_user_func_array([$extendcontroller, $action], $matches);
                return;
            }
        }

        Response::json(false, 'Rota não encontrada.', 404);
    }
}
?>
