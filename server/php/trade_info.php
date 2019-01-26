
<?php

    header("Content-type:text/html; charset=UTF-8");
    $json = file_get_contents('php://input');
    $coon = new mysqli('localhost','root','','db_student_admin',3306);
    $coon -> query("SET NAMES 'utf8'");
    $sql = "SELECT * FROM trade_info";
    $row = $coon -> query($sql);
    
    $result = $row -> fetch_assoc();
    // 解决乱码问题，版本问题
    echo json_encode($result,JSON_UNESCAPED_UNICODE);
?>