<?php

require_once __DIR__ . '/src/Controllers/post.php';
require_once __DIR__ . '/src/Routers/router.php';
require_once __DIR__ . '/src/Utils/response.php';
require_once __DIR__ . '/src/Utils/input.php';
require_once __DIR__ . '/src/Services/Db.php';
require_once __DIR__ . '/src/Utils/JWT.php';

use App\Routers\Router;

$router = new Router();
$router->run();

?>