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


$method = $_SERVER['REQUEST_METHOD'];

switch($method){

    //  لحتى اجيب كل الجروبات اللي انظم الها المستخدم وتمت الموافقة عليها
    case "GET":

      
            $path = explode('/',$_SERVER['REQUEST_URI']);
            $sql = "SELECT *
            FROM groups
            INNER JOIN members
            ON groups.group_id = members.group_id
            WHERE members.user_id=:id and members.status=:status";
            $stmt =$conn->prepare($sql);
            $status = "accepted" ;
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':id', $path[4]);

            $stmt->execute();

            $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode( $members);
    
        break;
    }