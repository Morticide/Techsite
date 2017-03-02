<!DOCTYPE html>
<html>
<head>
<title> Tech Site </title>
<link rel="stylesheet" type="text/css" href="CSS/tech_site.css">
 </head>
<body>
<?php
// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//   if (empty($_POST["firstname"])) {
        
//   } else {
//     $model = test_input($_POST["firstname"]);
//   }
// }
    
// function test_input($data) {
//   $data = trim($data);
//   $data = stripslashes($data);
//   $data = htmlspecialchars($data);
//   $data = ucfirst($data);
//   return $data;
// }
    echo $_POST["firstname"];

?>
<div style="text-align: center; padding-top:5%">Created By Sergei Scharrenberg</div>
</body>
</html>







