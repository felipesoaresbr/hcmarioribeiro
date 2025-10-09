<?php
require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

session_start();

$allowedOrigin = $_ENV['ALLOWED_ORIGINS'];

// Cabeçalhos CORS
header("Access-Control-Allow-Origin: $allowedOrigin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, X-CSRF-Token");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Verifica se o cookie JWT existe
if (empty($_COOKIE['jwt'])) {
    http_response_code(401);
    echo json_encode(['authenticated' => false, 'error' => 'Token ausente']);
    exit;
}

$token = $_COOKIE['jwt'];

try {
    $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));

    // Verifica expiração
    if ($decoded->exp < time()) {
        http_response_code(401);
        echo json_encode(['authenticated' => false, 'error' => 'Token expirado']);
        exit;
    }

    echo json_encode([
        'authenticated' => true,
        'user' => $decoded->data
    ]);
} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(['authenticated' => false, 'error' => 'Token inválido']);
}
