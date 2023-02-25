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
    case "GET":

      
            $path = explode('/',$_SERVER['REQUEST_URI']);
            $sql = "SELECT *
            FROM users
            INNER JOIN members
            ON members.user_id = users.id
            WHERE members.group_id=:id  AND members.status= :status";
            $stmt =$conn->prepare($sql);
            $status = "pending" ;
            $stmt->bindParam(':status', $status);
            $stmt->bindParam(':id', $path[4]);

            $stmt->execute();

            $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode( $members);
    
        break;

        // لطلب الانظمام remove request لعمل 
        case "PUT":


            $user = json_decode(file_get_contents('php://input'));



            $sql = "DELETE  FROM members WHERE user_id = :user_id and group_id = :group_id ";
            
            $stmt =$conn->prepare($sql);
            $stmt->bindParam(':user_id', $user->user_id);
            $stmt->bindParam(':group_id', $user->group_id);
            $stmt->execute();
            
            // print_r($path);
            
            if($stmt->execute()){
                $response = ['status'=>1,'message'=>'Record deleted successfully.'];
            }else{
                $response = ['status'=>0,'message'=>'Failed to delete  record.'];
            
            }
            echo json_encode( $response);        
            break;

        








}

