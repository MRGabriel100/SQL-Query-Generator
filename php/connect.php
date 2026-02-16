<?php

session_start();
header('Content-Type: application/json');

$data = $_POST;

// salva config na sessão
$_SESSION['db_config'] = $data;

try {

    $dsn = "mysql:host={$data['dbIp']};port={$data['dbPort']};dbname={$data['dbName']}";

    $db = new PDO($dsn, $data['dbUser'], $data['dbPass']);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "SELECT T.table_name, C.column_name
        FROM information_schema.tables T
        INNER JOIN information_schema.columns C 
            ON C.table_name = T.table_name
            AND C.table_schema = T.table_schema
        WHERE T.table_schema = :dbName 
        AND T.table_type = 'BASE TABLE'";

    $stmt = $db->prepare($query);
    $stmt->bindParam(":dbName", $data['dbName']);
    $stmt->execute();

    $tables = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $result = [];

    foreach ($tables as $row) {

        $table = $row['TABLE_NAME'];

        if (!isset($result[$table])) {
            $result[$table] = [
                "columns" => []
            ];
        }

        $result[$table]['columns'][] = $row['COLUMN_NAME'];
    }

    echo json_encode($result);

} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
