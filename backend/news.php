<?php

require_once __DIR__ . '/vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$allowedOrigins = explode(',', $_ENV['ALLOWED_ORIGINS']);
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-CSRF-Token');

header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'connection.php';

$action = $_REQUEST['action'] ?? '';

// Verifica token apenas para create, update e delete
if (in_array($action, ['create', 'update', 'delete'])) {
    $headers = function_exists('apache_request_headers') ? apache_request_headers() : [];
    $authHeader = $headers['Authorization'] ?? '';

    if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode(['message' => 'Token não fornecido']);
        exit();
    }

    $jwt = $matches[1];

    try {
        $secretKey = $_ENV['JWT_SECRET'];
        $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
        if ($decoded->iss !== $_ENV['JWT_ISS'] || $decoded->aud !== $_ENV['JWT_AUD']) {
            throw new Exception("Token com issuer/audience inválidos");
        }
    } catch (Exception $e) {
        http_response_code(401);
        echo json_encode(['message' => 'Token inválido: ' . $e->getMessage()]);
        exit();
    }
}

// === 🔒 Verificação de CSRF (após validar o JWT) ===
session_start();

$headers = getallheaders();
$csrfToken = $headers['X-CSRF-Token'] ?? '';

if (!$csrfToken || !isset($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $csrfToken)) {
    http_response_code(403);
    echo json_encode(['message' => 'Token CSRF inválido ou expirado']);
    exit;
}


switch ($action) {
    case 'create':
        createNews($conn);
        break;
    case 'read':
        getNews($conn);
        break;
    case 'update':
        updateNews($conn);
        break;
    case 'delete':
        deleteNews($conn);
        break;
    default:
        echo json_encode(['message' => 'Ação inválida']);
}

unset($conn);

function sanitizeHtml($html) {
    $allowedTags = '<p><strong><em><span><br><u>';
    $sanitized = strip_tags($html, $allowedTags);
    $sanitized = htmlspecialchars_decode($sanitized);
    $sanitized = preg_replace('/<([a-z][a-z0-9]*)[^>]*?(\/?)>/i', '<$1$2>', $sanitized);
    return $sanitized;
}

function createNews($conn) {
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $highlight = $_POST['highlight'] ?? 'N';
    $imagePath = null;

    if (empty($title)) {
        http_response_code(400);
        echo json_encode(['message' => 'Título é obrigatório']);
        return;
    }

    $description = sanitizeHtml($description);

    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        $fileType = $_FILES['image']['type'];

        if (!in_array($fileType, $allowedTypes)) {
            http_response_code(400);
            echo json_encode(['message' => 'Tipo de arquivo não permitido']);
            return;
        }

        $imageName = uniqid() . '_' . basename($_FILES['image']['name']);
        $targetDir = 'uploads/';
        $targetFile = $targetDir . $imageName;

        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        if (move_uploaded_file($_FILES['image']['tmp_name'], $targetFile)) {
            $imagePath = $targetFile;
        } else {
            http_response_code(500);
            echo json_encode(['message' => 'Erro ao salvar imagem']);
            return;
        }
    }

    try {
        $stmt = $conn->prepare("INSERT INTO noticias (titulo, descricao, image, destaque) VALUES (:title, :description, :image, :highlight)");
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':image', $imagePath);
        $stmt->bindParam(':highlight', $highlight);

        $stmt->execute();
        echo json_encode(['message' => 'Notícia criada com sucesso', 'success' => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Erro ao inserir: ' . $e->getMessage(), 'success' => false]);
    }
}

function getNews($conn) {
    $id = $_GET['id'] ?? null;

    try {
        if ($id) {
            $stmt = $conn->prepare("SELECT id, titulo, descricao, image, publicacao, destaque FROM noticias WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $news = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($news) {
                $news['descricao'] = htmlspecialchars_decode($news['descricao']);
                echo json_encode($news);
            } else {
                http_response_code(404);
                echo json_encode(['message' => 'Notícia não encontrada']);
            }
        } else {
            $stmt = $conn->query("SELECT id, titulo, descricao, image, publicacao, destaque FROM noticias ORDER BY publicacao DESC");
            $news = $stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach ($news as &$item) {
                $item['descricao'] = htmlspecialchars_decode($item['descricao']);
            }

            echo json_encode($news);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Erro ao buscar dados: ' . $e->getMessage()]);
    }
}

function updateNews($conn) {
    $id = $_POST['id'] ?? '';
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';

    if (empty($id) || empty($title)) {
        http_response_code(400);
        echo json_encode(['message' => 'Dados incompletos']);
        return;
    }

    $description = sanitizeHtml($description);

    try {
        $stmt = $conn->prepare("UPDATE noticias SET titulo = :title, descricao = :description WHERE id = :id");
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':id', $id);

        $stmt->execute();
        echo json_encode(['message' => 'Notícia atualizada', 'success' => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Erro ao atualizar: ' . $e->getMessage(), 'success' => false]);
    }
}

function deleteNews($conn) {
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);
    $id = $data['id'] ?? '';

    if (empty($id)) {
        http_response_code(400);
        echo json_encode(['message' => 'ID da notícia é obrigatório', 'success' => false]);
        return;
    }

    try {
        $stmt = $conn->prepare("SELECT image FROM noticias WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $news = $stmt->fetch(PDO::FETCH_ASSOC);

        $stmt = $conn->prepare("DELETE FROM noticias WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        if ($news && !empty($news['image']) && file_exists($news['image'])) {
            unlink($news['image']);
        }

        echo json_encode(['message' => 'Notícia excluída com sucesso', 'success' => true]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Erro ao excluir: ' . $e->getMessage(), 'success' => false]);
    }
}
?>
