<?php 
namespace App\Http;

class Routers {
    private static array $router = [];

    private static function add(string $method, string $path, string $action) {
        self::$router[] = compact('method', 'path', 'action');
    }

    public static function get(string $path, string $action) {
        self::add('GET', $path, $action);
    }

    public static function post(string $path, string $action) {
        self::add('POST', $path, $action);
    }

    public static function put(string $path, string $action) {
        self::add('PUT', $path, $action);
    }

    public static function delete(string $path, string $action) {
        self::add('DELETE', $path, $action);
    }

    public static function all(): array {
        return self::$router;
    }
}
