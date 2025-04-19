<?php

use App\Http\Request;
use App\Http\Routers;
use Dotenv\Dotenv;
use App\Core\Core;

error_reporting(E_ALL);
ini_set('display_errors', 1);

define('BASE_PATH', 'http://localhost/Aplicativo/api/src');

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/src/routers/main.php';

Request::header();

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();    

Core::dispatch(Routers::router());
?>
