<?php require('./config.php');?>

<?php
error_reporting(E_ALL);
ini_set('display_error',1);
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
header('Access-Control-Allow-Methods:*');
header('Access-Control-Allow-Origin:*');

$object = new crud;
$conn = $object->connect();


$path = explode('/',$_SERVER['REQUEST_URI']);

$sql = "SELECT *
FROM users
INNER JOIN friends
ON users.id = friends.friend_id
WHERE user_id = :id and status = :status";
$stmt =$conn->prepare($sql);
$status = "pending" ;
$stmt->bindParam(':status', $status);
$stmt->bindParam(':id', $path[4]);

$stmt->execute();

$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode( $users);


