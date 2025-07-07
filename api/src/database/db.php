<?php
namespace App\Database;

use Exception;
use PDO;
use Dotenv\Dotenv;

class Db
{
    private static $pdo;

    public static function Connection()
    {
        if (self::$pdo == null) {
            try {
                $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
                $dotenv->load();

                self::$pdo = new PDO(
                    'mysql:host=' . $_ENV['DB_HOST'] . ';dbname=' . $_ENV['DB_NAME'] . ';charset=' . $_ENV['DB_CHARSET'],
                    $_ENV['DB_USER'],
                    $_ENV['DB_PASSWORD'],
                    array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")
                );
                self::$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (Exception $e) {
                echo '<h2>Erro ao conectar: ' . $e->getMessage() . '</h2>';
            }
        }
        return self::$pdo;
    }
}
?>