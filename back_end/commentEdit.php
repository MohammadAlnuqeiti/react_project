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


switch ($method) {
    case 'GET' :
        $sql = "SELECT * FROM `users`
                INNER JOIN `comments` ON comments.user_id = users.id" ;
        $query = $conn->prepare($sql);
        $query->execute();
        $comments = $query->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($comments);
        break;



    case 'POST' :
        $comments = json_decode(file_get_contents('php://input'));

        print_r($comments);
        
        $sql = "INSERT INTO comments (user_id , post_id , comment_contet)
                VALUES (  ? , ? , ? )" ;
        $query = $conn->prepare($sql);
        $query->execute([$comments->user_id , $comments->post_id , $comments->comment_contet]);
        break;

    }