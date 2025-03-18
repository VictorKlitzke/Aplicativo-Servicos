<?php
namespace App\Routers;

use App\Controllers\Post;
use App\Utils\Response;

class Router
{
    private $routes = [];

    public function __construct()
    {
        $this->addRoute('POST', '/api/postLogin', [new Post(), 'postLogin']);        // $this->addRoute('GET', '/api/users', [new UserController(), 'getUsers']);
        // $this->addRoute('POST', '/api/users', [new UserController(), 'createUser']);
    }

    public function addRoute($method, $path, $handler)
    {
        $this->routes[] = [
            'method' => strtoupper($method),
            'path' => $path,
            'handler' => $handler,
        ];
    }

    public function run()
    {
        $requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        foreach ($this->routes as $route) {
            if ($route['method'] === $requestMethod && $route['path'] === $requestUri) {
                call_user_func($route['handler']);
                return;
            }
        }

        Response::json(false, 'Rota não encontrada.', 404);
    }
}