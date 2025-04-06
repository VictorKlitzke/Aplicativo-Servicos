<?php
namespace App\libs;

use App\Http\Response;
use App\Services\Db;
use App\Utils\Validator;
use Exception;
use PDO;

class Libs
{
    public static function logs($message, $type, $usuario_id)
    {
        try {
            $pdo = Db::Connection();
            $pdo->beginTransaction();

            $stmst = $pdo->prepare("INSERT INTO logs (message, type, usuario_id) VALUES (:message, :type, :usuario_id");
            $stmst->bindParam(":message", $message, PDO::PARAM_STR);
            $stmst->bindParam(":type", $type, PDO::PARAM_STR);
            $stmst->bindParam(":usuario_id", $usuario_id, PDO::PARAM_STR);
            $stmst->execute();
            $pdo->commit();

            return true;

        } catch (Exception $e) {
        }
    }
    public static function selectDB($nome_table, $pdo, $data = [], $joins = [], $select_columns = "*")
    {
        try {
            Validator::validator(["pdo" => $pdo]);

            $sql = "SELECT $select_columns FROM $nome_table";

            if (!empty($joins)) {
                foreach ($joins as $join) {
                    $sql .= " {$join['type']} JOIN {$join['table']} ON {$join['on']}";
                }
            }

            $whereClauses = [];
            $values = [];

            if (!empty($data)) {
                foreach ($data as $key => $value) {
                    if (strpos($key, ' ') !== false) {
                        list($column, $operator) = explode(' ', $key, 2);
                        $operator = strtoupper(trim($operator));

                        if ($operator === "IS NOT NULL") {
                            $whereClauses[] = "$column $operator";
                        } elseif (in_array($operator, ['LIKE', 'NOT LIKE']) && is_string($value)) {
                            $whereClauses[] = "$column $operator ?";
                            $values[] = $value;
                        } elseif (is_array($value)) {
                            $placeholders = implode(',', array_fill(0, count($value), '?'));
                            $whereClauses[] = "$column $operator ($placeholders)";
                            $values = array_merge($values, $value);
                        } else {
                            $whereClauses[] = "$column $operator ?";
                            $values[] = $value;
                        }
                    } else {
                        if (is_array($value)) {
                            $placeholders = implode(',', array_fill(0, count($value), '?'));
                            $whereClauses[] = "$key IN ($placeholders)";
                            $values = array_merge($values, $value);
                        } else {
                            $whereClauses[] = "$key = ?";
                            $values[] = $value;
                        }
                    }
                }
            }

            if (!empty($whereClauses)) {
                $sql .= " WHERE " . implode(' AND ', $whereClauses);
            }

            if (!empty($groupBy)) {
                $sql .= " GROUP BY $groupBy";
            }

            $stmt = $pdo->prepare($sql);
            $stmt->execute($values);
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return empty($results) ? null : $results;
        } catch (Exception $e) {
            Response::json(false, "Erro ao gerar selectDB", 500, ['error' => $e->getMessage() ?? "Erro desconhecido"]);
        }
    }
    public static function updateDB($nome_table, $data, $where, $pdo)
    {
        try {
            Validator::validator(["data" => $data], ["where" => $where]);
            $set = implode(', ', array_map(fn($key) => "$key = ?", array_keys($data)));
            $whereClause = is_array($where)
                ? implode(' AND ', array_map(fn($key) => "$key = ?", array_keys($where)))
                : $where;

            $sql = "UPDATE $nome_table SET $set WHERE $whereClause";
            $stmt = $pdo->prepare($sql);

            $values = is_array($where)
                ? array_merge(array_values($data), array_values($where))
                : array_values($data);

            $stmt->execute($values);

            $rowsAffected = $stmt->rowCount();
            if ($rowsAffected > 0) {
                return ['success' => true, 'message' => "$rowsAffected registro(s) atualizado(s)."];
            } else {
                return ['success' => false, 'message' => 'Nenhuma alteração foi feita.'];
            }
        } catch (Exception $e) {
            Response::json(false, 'Erro ao fazer update da tabela', 404, ["error" => $e->getMessage() ?? "Erro desconhecido"]);
        }
    }
    public static function insertDB($nome_table, $data, $pdo)
    {
        try {
            $keys = implode(', ', array_keys($data));
            $placeholders = implode(', ', array_fill(0, count($data), '?'));
            $sql = "INSERT INTO $nome_table ($keys) VALUES ($placeholders)";

            $stmt = $pdo->prepare($sql);
            $stmt->execute(array_values($data));

            return ['success' => true, 'id' => $pdo->lastInsertId()];
        } catch (Exception $e) {
            Response::json(false, 'Erro ao fazer insert da tabela', 404, ["error" => $e->getMessage() ?? "Erro desconhecido"]);
        }
    }
}