<?php

namespace App\Services;
use App\Models\userModels;
use Exception;
use Firebase\JWT\JWT;

class authServices {
    public function login(string $email, string $password) {
        $userModal = new userModels;
        $user = $userModal->findByEmail($email);

        try {
            
        if (!$user || !password_verify($password, $user[0]['senha'])) {
            throw new Exception('Credenciais inválidas.');
        }

        $tokenPayload = [
            'sub' => $user[0]['id'],
            'name' => $user[0]['nome'],
            'iat' => time(),
            'exp' => time() + 3600
        ];

        $token = JWT::encode($tokenPayload, $_ENV['JWT_SECRET'], "HS256");

        setcookie('session_token', $token, [
            'expires' => time() + 3600,
            'path' => '/',
            'httponly' => true,
            'samesite' => 'Strict',
            'secure' => false
        ]);

        return [
            'user' => [
                'id' => $user[0]['id'],
                'nome' => $user[0]['nome'],
                'email' => $user[0]['email']
            ],
            'token' => $token
        ];

        } catch (Exception) {

        }
    }
}

?>