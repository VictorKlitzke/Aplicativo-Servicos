<?php

namespace App\Core;

use App\Http\Request;
use App\Http\Response;

class Core
{
    public static function dispatch(array $routers)
    {
        $url = str_replace('/Aplicativo/api', '', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

        foreach ($routers as $router) {
            $patterns = "#^" . preg_replace('/\{(\w+)\}/', '([\w-]+)', $router['path']) . "$#";

            if (preg_match($patterns, $url, $matches)) {
                array_shift($matches);

                if (strtoupper($router['method']) !== Request::method()) {
                    Response::json(false, 'Método não permitido.', 405);
                    return;
                }

                [$controllerName, $action] = explode('@', $router['action']);

                $namespaces = ['App\\Controllers\\', 'App\\Utils\\'];
                $controllerFound = false;

                foreach ($namespaces as $prefix) {
                    $controllerClass = $prefix . $controllerName;

                    if (class_exists($controllerClass)) {
                        $controllerFound = true;
                        $controller = new $controllerClass();

                        if (!method_exists($controller, $action)) {
                            Response::json(false, "Método '$action' não encontrado em '$controllerClass'.", 500);
                            return;
                        }

                        call_user_func_array([$controller, $action], $matches);
                        return;
                    }
                }

                if (!$controllerFound) {
                    Response::json(false, "Controlador '$controllerName' não encontrado em nenhum namespace.", 500);
                    return;
                }
            }
        }

        Response::json(false, 'Rota não encontrada.', 404);
    }
}
