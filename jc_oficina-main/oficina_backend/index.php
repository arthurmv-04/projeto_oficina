<?php
session_start();

try {
    $pdo = new PDO("mysql:host=127.0.0.1;port=3306;dbname=oficina", "root", "1234");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro: " . $e->getMessage();
    exit; // Encerra o script se não conseguir conectar
}


// Configuração de CORS e cabeçalhos de resposta
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS, GET, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
header("Access-Control-Allow-Credentials: true");

// Verifica se é uma requisição OPTIONS (pré-flight)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204); // Sem conteúdo para OPTIONS
    exit();
}

// Define a URI atual
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Gerenciamento de rotas e métodos
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if ($uri == '/comentarios') {
        getComentario();
    } elseif ($uri == '/servicos') {
        getServicos();
    } elseif ($uri == '/check-admin') {
        checkAdmin();
    } else {
        http_response_code(404);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Rota não encontrada']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if ($uri == '/comentarios') {
        criarComentario();
    } elseif ($uri == '/servicos') {
        criarServico();
    } elseif (preg_match('/^\/servicos\/(\d+)$/', $uri, $matches)) {
        editarServico($matches[1]);
    } elseif ($uri == '/login') {
        loginAdministrador();       
    } else {
        http_response_code(404);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Rota não encontrada']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    if (preg_match('/^\/comentarios\/(\d+)$/', $uri, $matches)) {
        deletarComentario($matches[1]);
    } elseif (preg_match('/^\/servicos\/(\d+)$/', $uri, $matches)) {
        deletarServico($matches[1]);
    } else {
        http_response_code(404);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Rota não encontrada']);
    }
} else {
    http_response_code(405); // Método não permitido
    echo json_encode(['status' => 'erro', 'mensagem' => 'Método inválido.']);
}

// Função para criar um comentário
function criarComentario() {
    global $pdo;
    
    $inputData = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($inputData['comentario']) || empty(trim($inputData['comentario']))) {
        http_response_code(400);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Comentário é obrigatório.']);
        return;
    }
    
    $comentario = trim($inputData['comentario']);
    $nome = trim($inputData['nome'] ?? 'Anonimo');
    
    try {
        $stmt = $pdo->prepare("INSERT INTO comentarios (comentario, nome) VALUES (:comentario, :nome)");
        $stmt->bindParam(':comentario', $comentario);
        $stmt->bindParam(':nome', $nome);
        $stmt->execute();
        
        http_response_code(201); // Criado
        echo json_encode([
            'status' => 'sucesso',
            'mensagem' => 'Comentário cadastrado com sucesso!',
            'comentario' => [
                'comentario' => $comentario,
                'nome' => $nome
            ]
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao salvar no banco de dados: ' . $e->getMessage()]);
    }
}

// Função para obter comentários
function getComentario() {
    global $pdo;
    
    try {
        $stmt = $pdo->query("SELECT * FROM comentarios");
        $comentarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        http_response_code(200); // OK
        echo json_encode([
            'status' => 'sucesso',
            'mensagem' => 'Comentários recuperados com sucesso!',
            'comentarios' => $comentarios
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao recuperar comentários: ' . $e->getMessage()]);
    }
}

// Função para criar um serviço
function criarServico() {
    global $pdo;

    $uploadDir = __DIR__ . '/uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (
        !isset($_POST['nome'], $_POST['descricao'], $_POST['categoria']) || 
        empty(trim($_POST['nome'])) || 
        empty(trim($_POST['descricao'])) || 
        empty(trim($_POST['categoria']))
    ) {
        http_response_code(400);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Nome, descrição e categoria são obrigatórios.']);
        return;
    }

    $nome = trim($_POST['nome']);
    $descricao = trim($_POST['descricao']);
    $categoria = trim($_POST['categoria']);

    $categoriasValidas = ['diagnósticos', 'manutenção', 'motores', 'turbo'];
    if (!in_array($categoria, $categoriasValidas)) {
        http_response_code(400);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Categoria inválida.']);
        return;
    }

    $imagemPath = null;
    if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
        $imagemInfo = pathinfo($_FILES['imagem']['name']);
        $extensao = strtolower($imagemInfo['extension']);
        $extensoesValidas = ['jpg', 'jpeg', 'png'];
        if (!in_array($extensao, $extensoesValidas)) {
            http_response_code(400);
            echo json_encode(['status' => 'erro', 'mensagem' => 'Extensão de imagem inválida.']);
            return;
        }

        $mimeTypesValidos = ['image/jpeg', 'image/png'];
        $imagemTipo = mime_content_type($_FILES['imagem']['tmp_name']);
        if (!in_array($imagemTipo, $mimeTypesValidos)) {
            http_response_code(400);
            echo json_encode(['status' => 'erro', 'mensagem' => 'Arquivo de imagem inválido.']);
            return;
        }

        $novoNome = uniqid() . '.' . $extensao;
        $imagemPath = '/uploads/' . $novoNome; // Caminho relativo
        move_uploaded_file($_FILES['imagem']['tmp_name'], $uploadDir . $novoNome);
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO servicos (nome, descricao, categoria, imagem) VALUES (:nome, :descricao, :categoria, :imagem)");
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':descricao', $descricao);
        $stmt->bindParam(':categoria', $categoria);
        $stmt->bindParam(':imagem', $imagemPath);
        $stmt->execute();

        http_response_code(201);
        echo json_encode([
            'status' => 'sucesso',
            'mensagem' => 'Serviço criado com sucesso!',
            'servico' => [
                'id' => $pdo->lastInsertId(),
                'nome' => $nome,
                'descricao' => $descricao,
                'categoria' => $categoria,
                'imagem' => $imagemPath
            ]
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao salvar no banco de dados: ' . $e->getMessage()]);
    }
}





// Função para obter serviços
function getServicos() {
    global $pdo;

    try {
        // Verifica se foi enviado um parâmetro de categoria
        $categoria = isset($_GET['categoria']) ? $_GET['categoria'] : null;

        // Se a categoria for fornecida, mas for um valor inválido, trata como se não houvesse categoria
        if ($categoria && !in_array($categoria, ['diagnósticos', 'manutenção', 'motores', 'turbo'])) {
            $categoria = null; // Define categoria como nula, ou seja, retorna todos os serviços
        }

        // Monta a consulta SQL com ou sem filtro de categoria
        if ($categoria) {
            $stmt = $pdo->prepare("SELECT * FROM servicos WHERE categoria = :categoria");
            $stmt->bindParam(':categoria', $categoria, PDO::PARAM_STR);
        } else {
            $stmt = $pdo->query("SELECT * FROM servicos");
        }

        // Executa a consulta
        $stmt->execute();
        $servicos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Verifica se algum serviço foi retornado
        if (empty($servicos)) {
            http_response_code(404); // Not Found
            echo json_encode(['status' => 'erro', 'mensagem' => 'Nenhum serviço encontrado']);
        } else {
            http_response_code(200); // OK
            echo json_encode([
                'status' => 'sucesso',
                'mensagem' => 'Serviços recuperados com sucesso!',
                'servicos' => $servicos
            ]);
        }
    } catch (PDOException $e) {
        http_response_code(500); // Internal Server Error
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao recuperar serviços: ' . $e->getMessage()]);
    }
}


    


function loginAdministrador() {
    global $pdo;

    session_start(); // Inicia a sessão

    $inputData = json_decode(file_get_contents('php://input'), true);

    if (!isset($inputData['email'], $inputData['senha'])) {
        http_response_code(400);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Email e senha são obrigatórios.']);
        return;
    }

    $email = filter_var(trim($inputData['email']), FILTER_VALIDATE_EMAIL);
    $senha = trim($inputData['senha']);

    if (!$email) {
        http_response_code(400);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Formato de email inválido.']);
        return;
    }

    try {
        // Buscar o administrador pelo email
        $stmt = $pdo->prepare("SELECT senha FROM administrador WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($admin) {

            http_response_code(200);
            echo json_encode(['status' => 'sucesso', 'mensagem' => 'Login realizado com sucesso.']);
        } else {
            // Credenciais inválidas
            http_response_code(401); // Não autorizado
            echo json_encode(['status' => 'erro', 'mensagem' => 'Credenciais inválidas.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        error_log('Erro ao verificar administrador: ' . $e->getMessage());
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro interno no servidor.']);
    }
}


function checkAdmin() {

    if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in']) {
        http_response_code(200); // OK
        echo json_encode(['status' => 'sucesso', 'isAdmin' => true]);
    } else {
        http_response_code(403); // Proibido
        echo json_encode(['status' => 'erro', 'isAdmin' => false, 'mensagem' => 'Administrador não está logado.']);
    }
}

function deletarComentario($id) {
    global $pdo;

    try {
        $stmt = $pdo->prepare("DELETE FROM comentarios WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            http_response_code(200); // OK
            echo json_encode(['status' => 'sucesso', 'mensagem' => 'Comentário deletado com sucesso.']);
        } else {
            http_response_code(404); // Não encontrado
            echo json_encode(['status' => 'erro', 'mensagem' => 'Comentário não encontrado.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao deletar o comentário: ' . $e->getMessage()]);
    }
}

function deletarServico($id) {
    global $pdo;

    try {
        $stmt = $pdo->prepare("DELETE FROM servicos WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            http_response_code(200); // OK
            echo json_encode(['status' => 'sucesso', 'mensagem' => 'Serviço deletado com sucesso.']);
        } else {
            http_response_code(404); // Não encontrado
            echo json_encode(['status' => 'erro', 'mensagem' => 'Serviço não encontrado.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao deletar o serviço: ' . $e->getMessage()]);
    }
}

function editarServico($id) {

    global $pdo;

    $diretorioDestino = '/uploads/';
    $dados = $_POST; // Dados do FormData

    // Depuração para garantir que os dados estão sendo recebidos
    error_log(print_r($_POST, true));
    error_log(print_r($_FILES, true));

    // Validação de dados obrigatórios
    $nome = isset($dados['nome']) ? trim($dados['nome']) : null;
    $descricao = isset($dados['descricao']) ? trim($dados['descricao']) : null;
    $categoria = isset($dados['categoria']) ? trim($dados['categoria']) : null;

    if (!$nome || !$descricao || !$categoria || !$id) {
        http_response_code(400);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Nome, descrição, categoria e ID são obrigatórios.']);
        return;
    }

    // Gerenciar a imagem
    $imagemDestino = null;
    if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK) {
        $imagemTemp = $_FILES['imagem']['tmp_name'];
        $imagemNome = basename($_FILES['imagem']['name']);
        $imagemDestino = $diretorioDestino . $imagemNome;

        // Tenta mover a imagem para o diretório de destino
        if (!move_uploaded_file($imagemTemp, $_SERVER['DOCUMENT_ROOT'] . $imagemDestino)) {
            http_response_code(500);
            echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao fazer upload da imagem.']);
            return;
        }
    }

    // Caso a imagem não tenha sido enviada, mantém a imagem antiga
    if (!$imagemDestino) {
        $stmt = $pdo->prepare("SELECT imagem FROM servicos WHERE id = :id");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $servico = $stmt->fetch(PDO::FETCH_ASSOC);
        $imagemDestino = $servico['imagem'];
    }

    // Garantir que o caminho da imagem comece com "/"
    if ($imagemDestino && strpos($imagemDestino, '/') !== 0) {
        $imagemDestino = '/' . ltrim($imagemDestino, '/');
    }

    try {
        // Atualizar o serviço existente
        $sql = "UPDATE servicos 
                SET nome = :nome, descricao = :descricao, categoria = :categoria, imagem = :imagem 
                WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nome' => $nome,
            ':descricao' => $descricao,
            ':categoria' => $categoria,
            ':imagem' => $imagemDestino,
            ':id' => $id,
        ]);

        if ($stmt->rowCount() > 0) {
            $stmt = $pdo->prepare("SELECT * FROM servicos WHERE id = :id");
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $servicoAtualizado = $stmt->fetch(PDO::FETCH_ASSOC);

            http_response_code(200);
            echo json_encode(['status' => 'sucesso', 'mensagem' => 'Serviço atualizado com sucesso.', 'servico' => $servicoAtualizado]);
        } else {
            http_response_code(404);
            echo json_encode(['status' => 'erro', 'mensagem' => 'Nenhuma alteração foi feita ou serviço não encontrado.']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'erro', 'mensagem' => 'Erro ao atualizar o serviço: ' . $e->getMessage()]);
    }
}


    








?>
