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



$user = json_decode(file_get_contents('php://input'));
            print_r($user);

            $sql = "DELETE  FROM friends WHERE user_id = :user_id and friend_id = :friend_id ";
            
            $stmt =$conn->prepare($sql);
            $stmt->bindParam(':user_id', $user->user_id);
            $stmt->bindParam(':friend_id', $user->friend_id);
            $stmt->execute();
            $stmt =$conn->prepare($sql);
            $stmt->bindParam(':user_id', $user->friend_id);
            $stmt->bindParam(':friend_id', $user->user_id);
            $stmt->execute();

            // print_r($path);

            if($stmt->execute()){
                $response = ['status'=>1,'message'=>'Record deleted successfully.'];
            }else{
                $response = ['status'=>0,'message'=>'Failed to delete  record.'];

            }
            echo json_encode( $response);