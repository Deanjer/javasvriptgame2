<?php
   include 'db.php';
   header('Access-Control-Allow-Origin: *'); 
header("Content-Type: application/json; charset=UTF-8");
$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);
try {
    $name = $decoded['name'];
    $level = $decoded['level'];
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $conn->prepare("INSERT IGNORE INTO players (`name`) VALUES ('". $name ."')");
$stmt->execute();

$stmt = $conn->prepare("SELECT id FROM players WHERE name='" . $name . "'");
$stmt->execute();

$id = $stmt->fetch(PDO::FETCH_ASSOC)['id'];

$stmt = $conn->prepare("INSERT INTO scores (`player_id`, `level`) VALUES ('". $id ."', '" . $level . "')");
$stmt->execute();

echo json_encode(['name' => $name, 'level' => $level, 'id' => $id]);
 
  } catch(PDOException $e) {
    echo json_encode(['error' => 'cannot add to database']);
  }
  $conn = null;
?>