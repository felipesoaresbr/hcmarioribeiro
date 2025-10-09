<?php
require_once __DIR__ . '/vendor/autoload.php';

use Dotenv\Dotenv;
use Firebase\JWT\JWT;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

session_start();

$frontendOrigin = $_ENV['ALLOWED_ORIGINS']; // Ex: http://localhost:5173

// Cabeçalhos para CORS
header("Access-Control-Allow-Origin: $frontendOrigin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, X-CSRF-Token");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// === 🔒 Validação do token CSRF ===
$headers = getallheaders();
$csrfToken = $headers['X-CSRF-Token'] ?? '';

if (!$csrfToken || !isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $csrfToken)) {
    http_response_code(403);
    echo json_encode(['error' => 'Token CSRF inválido ou expirado']);
    exit;
}

include 'connection.php';

$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);

$user = trim($data['user'] ?? '');
$pass = trim($data['pass'] ?? '');

if (empty($user) || empty($pass)) {
    http_response_code(400);
    echo json_encode(['error' => 'Todos os campos são obrigatórios']);
    exit;
}

try {
    $sql = "SELECT * FROM funcionarios WHERE matricula = :matricula LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':matricula', $user, PDO::PARAM_STR);
    $stmt->execute();

    if ($stmt->rowCount() === 0) {
        http_response_code(401);
        echo json_encode(['error' => 'Matrícula ou senha inválidos']);
        exit;
    }

    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!password_verify($pass, $row['senha'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Matrícula ou senha inválidos']);
        exit;
    }

    // === 🔐 Gera JWT ===
    $payload = [
        'iss' => $_ENV['JWT_ISS'],
        'aud' => $_ENV['JWT_AUD'],
        'iat' => time(),
        'exp' => time() + 3600, // expira em 1h
        'data' => [
            'id' => $row['id'],
            'nome' => $row['nome'],
            'matricula' => $row['matricula'],
            'permissao' => $row['permissao']
        ]
    ];

    $jwt = JWT::encode($payload, $_ENV['JWT_SECRET'], 'HS256');

setcookie(
  "jwt",
  $jwt,
  [
    "expires" => time() + 3600,
    "path" => "/",
    "secure" => false, // ok no localhost
    "httponly" => true,
    "samesite" => "Lax" // ✅ funciona sem HTTPS
  ]
);



    // Atualiza token CSRF (por segurança após login)
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));

    echo json_encode([
        'result' => 'Login efetuado com sucesso! Redirecionando...',
        'token' => $jwt,
        'csrf_token' => $_SESSION['csrf_token'], // devolve novo token CSRF
        'user' => [
            'id' => $row['id'],
            'nome' => $row['nome'],
            'matricula' => $row['matricula'],
            'permissao' => $row['permissao']
        ]
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erro interno no servidor: ' . $e->getMessage()]);
}
