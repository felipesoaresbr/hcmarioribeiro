<?php

require_once __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

# Configurações
$allowedOrigins = explode(',', $_ENV['ALLOWED_ORIGINS']);
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

# Verifica origem para CORS
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('Referrer-Policy: no-referrer');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

# Função para validar e obter token JWT
function getBearerToken() {
    $headers = apache_request_headers();
    if (!isset($headers['Authorization'])) {
        return null;
    }
    $matches = [];
    if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
        return $matches[1];
    }
    return null;
}

# Validar JWT
function validateJWT() {
    global $_ENV;

    $token = getBearerToken();
    if (!$token) {
        http_response_code(401);
        echo json_encode(['message' => 'Token não fornecido']);
        exit();
    }

    try {
        $decoded = JWT::decode($token, new Key($_ENV['JWT_SECRET'], 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(['message' => 'Token inválido ou expirado']);
        exit();
    }
}

# Sanitização básica
function sanitize($data) {
    if (is_array($data)) {
        return array_map('sanitize', $data);
    }
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}

$action = $_REQUEST['action'] ?? '';

switch ($action) {
    case 'create':
    case 'update':
    case 'delete':
        validateJWT(); // Exigir token apenas nessas ações
        break;
}

include 'connection.php';

switch ($action) {
    case 'create':
        createDespesas($conn);
        break;
    case 'read':
        getDespesas($conn); // read não exige token
        break;
    case 'update':
        updateDespesas($conn);
        break;
    case 'delete':
        deleteDespesas($conn);
        break;
    default:
        http_response_code(400);
        echo json_encode(['message' => 'Ação inválida']);
        break;
}

unset($conn);

# Criação de despesas
function createDespesas($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $data = sanitize($data);

    $num = $data['num'] ?? '';
    $title = $data['title'] ?? '';
    $address = $data['address'] ?? '';

    if (empty($title)) {
        http_response_code(400);
        echo json_encode(['message' => 'Título é obrigatório']);
        return;
    }

    try {
        $stmt = $conn->prepare("INSERT INTO despesas (numero, titulo, link) VALUES (:num, :title, :address)");
        $stmt->bindParam(':num', $num);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':address', $address);
        $stmt->execute();
        echo json_encode(['message' => 'Despesa criada com sucesso', 'success' => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Erro interno no servidor', 'success' => false]);
    }
}

# Leitura de despesas
function getDespesas($conn) {
    try {
        $conn->exec("SET NAMES 'utf8'");
        $stmt = $conn->prepare("SELECT * FROM despesas");
        $stmt->execute();
        $despesas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($despesas) {
            echo json_encode($despesas, JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Despesa não encontrada']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Erro interno no servidor']);
    }
}

# Atualizar despesas
function updateDespesas($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $data = sanitize($data);

    $id = $data['id'] ?? '';
    $title = $data['title'] ?? '';
    $address = $data['address'] ?? '';

    if (empty($id) || empty($title)) {
        http_response_code(400);
        echo json_encode(['message' => 'Dados incompletos']);
        return;
    }

    try {
        $stmt = $conn->prepare("UPDATE despesas SET titulo = :title, link = :address WHERE id = :id");
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        echo json_encode(['message' => 'Despesa atualizada', 'success' => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Erro interno no servidor', 'success' => false]);
    }
}

# Deletar despesas
function deleteDespesas($conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    $data = sanitize($data);

    $id = $data['id'] ?? '';

    if (empty($id)) {
        http_response_code(400);
        echo json_encode(['message' => 'ID é obrigatório']);
        return;
    }

    try {
        $stmt = $conn->prepare("DELETE FROM despesas WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(['message' => 'Despesa excluída com sucesso', 'success' => true]);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Despesa não encontrada', 'success' => false]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Erro interno no servidor', 'success' => false]);
    }
}
?>
