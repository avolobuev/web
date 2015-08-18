<?php
include('../lib.php');
$sql="select initcap(user_lname||' '||substr(user_fname,1,1)||'. '||substr(user_mname,1,1)||'.') as fio
	  from tb_user
	  where user_id = '$uid'";
_exec($sql,$cur);
echo $cur[0]['FIO'];  
?>