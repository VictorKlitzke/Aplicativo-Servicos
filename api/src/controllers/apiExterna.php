<?php
namespace App\Controllers;

use App\Http\Request;
use App\Utils\Response;
use App\Utils\ValidationToken;
use Exception;

class ApiExterna
{

    public static function getCEP(string $CEP)
    {
        try {
            $token = ValidationToken::getBearerToken() ?: Response::json(false, 'Token não fornecido.', 401);
            ValidationToken::validateToken($token) ?: Response::json(false, 'Token inválido.', 401);

            $configUrl = BASE_PATH . '/config/config.php';
            $configContent = file_get_contents($configUrl);

            if ($configContent === false) {
                Response::json(false, "Falha ao carregar o arquivo de configuração.", 401);
            }

            $config = json_decode($configContent, true);

            if ($config === null) {
                Response::json(false, "Arquivo de configuração inválido.", 401);
            }

            if (!isset($config['apiCEP']['baseUrl'])) {
                Response::json(false, "Configuração 'apiCEP.baseUrl' não encontrada.", 401);
            }

            $baseUrl = str_replace('{cep}', urlencode($CEP), $config['apiCEP']['baseUrl']);

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $baseUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($httpCode !== 200) {
                Response::json(false, "CEP não encontrado ou inválido.", 404);
            }

            $data = json_decode($response, true);

            // Retorna a resposta
            Response::json(true, "CEP encontrado.", 200, ["endereco" => $data]);

        } catch (Exception $e) {
            // Retorna um erro em caso de exceção
            Response::json(false, "Erro ao buscar CEP: " . $e->getMessage(), 500);
        }
    }

}

?>