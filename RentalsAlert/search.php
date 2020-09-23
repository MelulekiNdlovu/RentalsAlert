<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ra";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
 } 

$sql = "SELECT * FROM props";
$result = $conn->query($sql);

 //Initialize array variable
  $dbdata = array();

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        /*echo "<div class=\"border m-2 bg-light shadow col\" id=\"".$row["id"]."\">Type: ".$row["type"]."<br>"."Location: ".$row["location"]."<br>"."Description: ".$row["description"]."<br><button onclick=\"set(".$row["id"].")\">Save</button></div>";*/
        $dbdata[]=$row;
    }
    echo json_encode($dbdata);
} else {
    echo "0 results";
}

 $conn->close();

 ?> 