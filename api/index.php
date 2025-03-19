<?php

use Dotenv\Dotenv;
use App\Routers\Router;


require __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$router = new Router();
$router->run();

?>