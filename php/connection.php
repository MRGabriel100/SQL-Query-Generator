<?php
session_start();

function createConnection() {

    if (!isset($_SESSION['db_config'])) {
        throw new Exception("No connection configuration found.");
    }

    $data = $_SESSION['db_config'];

    $dsn = "mysql:host={$data['dbIp']};port={$data['dbPort']};dbname={$data['dbName']}";

    $pdo = new PDO($dsn, $data['dbUser'], $data['dbPass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    return $pdo;
}
