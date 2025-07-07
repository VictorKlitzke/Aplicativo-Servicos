<?php

namespace App\helpers;

use App\Database\Db;
use App\Http\Response;
use App\Utils\Validator;
use DateTime;
use Exception;
use PDO;

class Helpers
{
    public static function logs($message, $type, $usuario_id)
    {
        try {
            $pdo = Db::Connection();

            $datainsert = [
                'data' => date('Y-m-d H:i:s'),
                'usuario_id' => $usuario_id,
                'mensagem' => $message,
                'tipo' => $type
            ];

            $result = self::insertDB('logs', $datainsert, $pdo);
            return $result;
        } catch (Exception $e) {
            Response::json(false, 'Erro ao fazer insert de log', 404);
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }

    public static function updateDB($nome_table, $data, $where, $pdo)
    {
        try {
            Validator::validator(["data" => $data, "where" => $where]);
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
                Response::json(true, "$rowsAffected registro(s) atualizado(s).", 200);
            } else {
                Response::json(false, 'Erro tentar rodar update', 500);
            }
        } catch (Exception $e) {
            Response::json(
                false,
                'Erro ao fazer update da tabela',
                404,
                ["error" => is_array($e->getMessage()) ? json_encode($e->getMessage()) : $e->getMessage() ?? "Erro desconhecido"]
            );
        }
    }

    public static function insertDB($nome_table, $data, $pdo, $filters = [])
    {
        try {
            if (!empty($filters)) {
                $where = implode(' AND ', array_map(fn($k) => "$k = ?", array_keys($filters)));
                $stmt = $pdo->prepare("SELECT COUNT(*) FROM $nome_table WHERE $where");
                $stmt->execute(array_values($filters));
                $count = $stmt->fetchColumn();

                if ($count > 0) {
                    return [
                        'success' => false,
                        'message' => 'Registro já existe com os filtros fornecidos',
                        'skipped' => true
                    ];
                }
            }

            foreach ($data as $key => $value) {
                if (is_array($value)) {
                    $data[$key] = json_encode($value, JSON_UNESCAPED_UNICODE);
                }
            }

            $keys = implode(', ', array_keys($data));
            $placeholders = implode(', ', array_fill(0, count($data), '?'));
            $sql = "INSERT INTO $nome_table ($keys) VALUES ($placeholders)";

            $stmt = $pdo->prepare($sql);
            $stmt->execute(array_values($data));

            return ['success' => true, 'id' => $pdo->lastInsertId()];
        } catch (Exception $e) {
            error_log("[insertDB][$nome_table] Erro: " . $e->getMessage());
            Response::json(false, 'Erro ao fazer insert da tabela', 500, [
                'error' => $e->getMessage(),
                'tabela' => $nome_table,
                'dados' => json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT),
                'filtros' => json_encode($filters)
            ]);
        }
    }

    public static function selectDB($nome_table, PDO $pdo, $data = [], $joins = [], $select_columns = "*", $groupBy = "", $orderBy = "")
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
            } else if (!empty($orderBy)) {
                $sql .= " ORDER BY $orderBy";
            }

            $stmt = $pdo->prepare($sql);
            $stmt->execute($values);
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return empty($results) ? null : $results;
        } catch (Exception $e) {
            return Response::json(false, "Erro ao gerar selectDB", 500, ['error' => $e->getMessage() ?? "Erro desconhecido"]);
        }
    }

    public static function convertTimeToMinutes($time)
    {
        list($hours, $minutes) = explode(':', $time);
        return (int) $hours * 60 + (int) $minutes;
    }
    public static function formatDate($timestamp)
    {
        $date = new DateTime($timestamp);
        return $date->format('Y-m-d H:i:s');
    }
}