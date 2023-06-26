<?php 
include 'db.php';
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      
        $stmt = $conn->prepare("SELECT * FROM scores ORDER BY level DESC LIMIT 10");
        $stmt->execute();
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
  
        // echo 'hello world';
        echo json_encode($results);
      } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
      }
      
      $conn = null;
?>
