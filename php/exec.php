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

    // Verify if the query returns a result
    if ($stmt->columnCount() > 0) {

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $result = [];

        foreach ($data as $row){

            foreach($row as $column => $value){

                $result[$column][] = $value;
            }
        }

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