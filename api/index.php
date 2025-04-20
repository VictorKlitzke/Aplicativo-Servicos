<?php

use App\Http\Request;
use App\Http\Routers;
use Dotenv\Dotenv;
use App\Core\Core;

define('ENVIRONMENT', getenv('APP_ENV') ?: 'development');
error_reporting(E_ALL);
ini_set('display_errors', 1);

require __DIR__ . '/vendor/autoload.php';

Request::handleCors();

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

try {
    require __DIR__ . '/src/routers/main.php';
    Core::dispatch(Routers::router());
} catch (Throwable $e) {
    header('Content-Type: application/json');
    http_response_code(500);

    $response = [
        'status' => 'error',
        'message' => 'Internal Server Error'
    ];

    if (ENVIRONMENT === 'development') {
        $response['details'] = $e->getMessage();
        $response['trace'] = $e->getTraceAsString();
    }

    die(json_encode($response));
}
?>