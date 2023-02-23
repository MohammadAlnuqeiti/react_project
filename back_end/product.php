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

// to check success connect
// var_dump($conn); 
// print_r($_POST);

//preivewلحتى يطبع في ال 
// print_r(file_get_contents('php://input'));


$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "GET":

        $sql = "SELECT * FROM products";
        $path = explode('/',$_SERVER['REQUEST_URI']);
        
        // print_r($path);break;
        if(isset($path[5])&&is_numeric($path[5])){

            $sql .= "   WHERE 	product_id	 = :id";
            $stmt =$conn->prepare($sql);
            $stmt->bindParam(':id', $path[5]);

            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        }else{

            $stmt =$conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        echo json_encode( $users);
        break;




    case "POST":
        $product = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO products ( product_id , name , description ,image, price ,category_id , created_at) VALUES ( null , :name, :description , :image,:price, :category_id ,:created_at)";
        $stmt =$conn->prepare($sql);
        $created_at = date('Y-m-d');
        $stmt->bindParam(':name', $product->name);
        $stmt->bindParam(':description', $product->description);
        $stmt->bindParam(':image', $product->image);
        $stmt->bindParam(':price', $product->price);
        $stmt->bindParam(':category_id', $product->category_id);
        $stmt->bindParam(':created_at', $created_at);
        if($stmt->execute()){
            $response = ['status'=>1,'message'=>'Record created successfully.'];
        }else{
            $response = ['status'=>0,'message'=>'Failed to created  record.'];

        }

        echo json_encode( $response);
        break;

        case "PUT":

        $product = json_decode(file_get_contents('php://input'));

        // print_r($product);break;
        $sql = "UPDATE  products SET  name = :name, description = :description , image = :image , price = :price , category_id = :category_id, updated_at=:updated_at WHERE product_id = :id ";
        $stmt =$conn->prepare($sql);
        $updated_at = date('Y-m-d');
        $stmt->bindParam(':id', $product->id);
        $stmt->bindParam(':name', $product->name);
        $stmt->bindParam(':description', $product->description);
        $stmt->bindParam(':image', $product->image);
        $stmt->bindParam(':price', $product->price);
        $stmt->bindParam(':category_id', $product->category_id);
        $stmt->bindParam(':updated_at', $updated_at);
        if($stmt->execute()){
            $response = ['status'=>1,'message'=>'Record updated successfully.'];
        }else{
            $response = ['status'=>0,'message'=>'Failed to updated  record.'];

        }

        echo json_encode( $response);
        break;

        case "DELETE":

            $sql = "DELETE  FROM products WHERE product_id = :id";
            $path = explode('/',$_SERVER['REQUEST_URI']);
            $stmt =$conn->prepare($sql);
            $stmt->bindParam(':id', $path[5]);
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
?>