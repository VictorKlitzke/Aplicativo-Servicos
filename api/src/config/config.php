<?php
header('Content-Type: application/json');

echo json_encode([
    'apiCEP' => [
        'baseUrl' => 'https://brasilapi.com.br/api/cep/v2/{cep}'
    ]
]);
?>