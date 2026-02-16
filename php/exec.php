<?php
header('Content-Type: application/json');

    require_once 'connection.php';

    $db = createConnection();

    $query = $_POST['queryReady'];

try {
     $db = createConnection();

    $query = trim($_POST['queryReady']);

    $stmt = $db->prepare($query);
    $stmt->execute();

    // Verifica se a query retorna resultado
    if ($stmt->columnCount() > 0) {

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result
        );

    } else {

        $message = "Rows Affected: " . $stmt->rowCount();
        echo json_encode($message);
    }

} catch (PDOException $e) {

    echo json_encode([
        "error" => $e->getMessage()
    ]);
}