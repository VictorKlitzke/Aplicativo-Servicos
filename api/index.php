<?php

use App\http\Routers;
use Dotenv\Dotenv;
use App\Core\Core;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/src/routers/main.php';
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

Core::dispatch(Routers::router());

?>