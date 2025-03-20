<?php 
namespace App\http;
    class Routers {
        private static array $router = [];
        public static function get(string $path, string $action) {
            self::$router[]= [
                "path"=> $path,
                "action"=> $action,
                "method"=> "GET"
            ];
        }
        public static function post(string $path, string $action) {
            self::$router[]= [
                "path"=> $path,
                "action"=> $action,
                "method"=> "POST"
            ];
        }
        public static function put(string $path, string $action) {
            self::$router[]= [
                "path"=> $path,
                "action"=> $action,
                "method"=> "PUT"
            ];
        }
        public static function delete(string $path, string $action) {
            self::$router[]= [
                "path"=> $path,
                "action"=> $action,
                "method"=> "DELETE"
            ];
        }

        public static function router() {
            return self::$router;
        }
    }
?>