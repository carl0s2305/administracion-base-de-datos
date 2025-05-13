<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$host = 'mysql.serviciosintegralesonline.com';
$user = 'equipo4705';
$pass = 'charly123';
$dbname = 'finalequipo4';

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Conexión fallida: " . $conn->connect_error]);
    exit;
}

// Obtener método
$method = $_SERVER['REQUEST_METHOD'];

// Convertir entrada JSON
$input = json_decode(file_get_contents('php://input'), true);

// Operaciones
switch ($method) {
    case 'GET':
        $sql = "SELECT * FROM personas";
        $result = $conn->query($sql);
        $rows = [];
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        echo json_encode($rows);
        break;

    case 'POST':
        $stmt = $conn->prepare("INSERT INTO personas (nombre, apellido_paterno, apellido_materno, edad, fecha_nacimiento, correo) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssiss", $input['nombre'], $input['apellido_paterno'], $input['apellido_materno'], $input['edad'], $input['fecha_nacimiento'], $input['correo']);
        if ($stmt->execute()) {
            echo json_encode(["mensaje" => "Registro insertado"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => $stmt->error]);
        }
        break;

    case 'PUT':
        $stmt = $conn->prepare("UPDATE personas SET nombre=?, apellido_paterno=?, apellido_materno=?, edad=?, fecha_nacimiento=?, correo=? WHERE id=?");
        $stmt->bind_param("sssissi", $input['nombre'], $input['apellido_paterno'], $input['apellido_materno'], $input['edad'], $input['fecha_nacimiento'], $input['correo'], $input['id']);
        if ($stmt->execute()) {
            echo json_encode(["mensaje" => "Registro actualizado"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => $stmt->error]);
        }
        break;

    case 'DELETE':
        $id = $input['id'];
        $stmt = $conn->prepare("DELETE FROM personas WHERE id = ?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo json_encode(["mensaje" => "Registro eliminado"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => $stmt->error]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}

$conn->close();
?>
