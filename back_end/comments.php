<?php require('./config.php');?>

<?php


header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Headers:*');
header('Access-Control-Allow-Methods:*');

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

    case 'PUT' :
        $comments = json_decode(file_get_contents('php://input'));        
        $sql = "UPDATE comments 
                SET comment_content = ?
                WHERE comment_id = ?" ;
        $query = $conn->prepare($sql);
        $query->execute([$comments->comment_content , $comments->comment_id]);
        break;

    case 'POST' :
        $comments = json_decode(file_get_contents('php://input'));

        print_r($comments);
        
        $sql = "INSERT INTO comments (user_id , post_id , comment_content)
                VALUES (  ? , ? , ? )" ;
        $query = $conn->prepare($sql);
        if($query->execute([$comments->user_id , $comments->post_id , $comments->comment_content])){
            echo 'add success';
        };
        break;

    case 'DELETE' :
        $sql = "DELETE FROM comments WHERE comment_id = ?" ;
        $path = explode('/' , $_SERVER['REQUEST_URI']);
        if(isset($path[4]) && is_numeric($path[4])){
            $query = $conn->prepare($sql);
            $query->execute([$path[4]]);
        }
        break;
    }