<?php

use App\Http\Routers;
use Dotenv\Dotenv;
use App\Core\Core;

define('BASE_PATH', 'http://localhost/api/src');

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/src/routers/main.php';
require __DIR__ . '/src/config/config.php'; 

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();    

// Disparar a execução das rotas
Core::dispatch(Routers::router());
?>
