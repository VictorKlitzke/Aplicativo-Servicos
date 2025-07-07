<?php

use App\Core\Core;
use App\Http\Request;
use App\Http\Routers;
use Dotenv\Dotenv;

error_reporting(E_ALL);
ini_set('display_errors', 1);

// define('ENVIRONMENT', getenv('APP_ENV') ?: 'development');
// define('BASE_PATH', 'http://192.168.1.9:80/Aplicativo/api/src');

require __DIR__ . '/vendor/autoload.php';
Request::header();
require __DIR__ . '/src/main/router.php';

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

Core::dispatch(Routers::all());
?>
