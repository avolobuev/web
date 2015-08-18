<?php
include('../lib.php');
$tree="[";
$sql_test="select t.test_id, 
	              t.test_name 
	 	   from tb_test t 
		   where t.owner_id='$uid' 
		   order by t.test_name";
_exec($sql_test,$cur_test);
foreach($cur_test as $i=>$data)
{
	$node="{'text':'".$data['TEST_NAME']."', 'id':'".$data['TEST_ID']."'";
	$sql_group="select initcap(u.user_lname||' '||substr(u.user_fname,1,1)||'. '||substr(u.user_mname,1,1)||'.') as fio,
                         u.user_id,
                         ur.result,
						 ur.answers_wrong,
						 ur.answers_right,
						 ur.answers_time,
						 to_char(ur.test_dttm,'dd.mm.YYYY') test_dttm
				  from tb_user u,
				       tb_user_results ur
				  where u.group_id = '3'
				  and u.user_id = ur.user_id
				  and ur.test_id='".$data['TEST_ID']."'";
	//_exec($sql_group,$cur_group);
	if(!_exec($sql_group,$cur_group))
	{
		$node=$node.",'leaf':true},";
	}
	else
	{
		$node=$node.", 'expanded':false, 'children':[";
		foreach($cur_group as $j=>$data1 )
		{
			$subnode="{'text':'".$data1['FIO']."', 'id':'".$data1['USER_ID']."_$i',
			           'ball':'".$data1['RESULT']."',
					   'right':'".$data1['ANSWERS_RIGHT']."',
					   'wrong':'".$data1['ANSWERS_WRONG']."',
					   'time':'".$data1['ANSWERS_TIME']."',
					   'date':'".$data1['TEST_DTTM']."'";
			$subnode=$subnode.",'leaf':true},";
			$node=$node.$subnode;
		}
		$node=substr($node, 0, strlen($node) - 1)."]";
		$node=$node."},";
	}
	$tree=$tree.$node;
}
echo $tree=substr($tree,0,strlen($tree)-1)."]";
?>