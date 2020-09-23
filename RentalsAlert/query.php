<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ra";

$input = json_decode(file_get_contents(
'php://input'), true);
$q = $input['loc'];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
 } 

$sql = "SELECT * FROM props WHERE location LIKE '%$q%'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<div class=\"border m-2 bg-light shadow col\" id=\"".$row["id"]."\">Type: ".$row["type"]."<br>"."Location: ".$row["location"]."<br>"."Description: ".$row["description"]."</div>";
    }
} else {
    echo "0 results";
}
 $conn->close();
 ?> 