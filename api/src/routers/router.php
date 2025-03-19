<?php
namespace App\Routers;

use App\controllers\Get;
use App\Controllers\Post;
use App\Utils\Response;
class Router
{
    private $routes = [];

    public function __construct()
    {
        $this->addRoute('POST', '/api/postCategoryServices', [new Post(), 'postCategoryServices']); 
        $this->addRoute('POST', '/api/postLogin', [new Post(), 'postLogin']); 
        // $this->addRoute('POST', '/api/users', [new UserController(), 'createUser']);
        $this->addRoute('GET','/api/getLogin', [new Get(),'getLogin']);
        $this->addRoute('GET','/api/getServices', [new Get(),'getServices']);
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