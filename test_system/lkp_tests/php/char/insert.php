<?php
	include('../../lib.php');
	$response=0;
	$cd=$_REQUEST['cd'];
	$descr=$_REQUEST['descr'];
	if($_REQUEST['objects']!='')
	{
		$objects=explode(',',$_REQUEST['objects']);
	}
	else
	{
		$objects=null;
	}
	
	if(isset($cd)&&isset($descr))
	{
		try
		{
			$sql="select count(*) is_any from tb_char_val where char_type_cd = '$cd'";
			_exec($sql,$temp);
			if($temp[0]['IS_ANY']==0&&$objects!=null)
			{
				$response=1;
				$sql="insert into tb_char_val 
					  values('$cd','$descr',sysdate)";
				_exec($sql);	  
				for($i=0;$i<count($objects);$i++)
				{
					$sql="insert into tb_char_object 
						  values('$cd','".$objects[$i]."')";
					_exec($sql);
				}
			}
			else
			{
				$response=1;
				if($objects!=null)
				{
					$sql="delete tb_char_object 
						  where char_type_cd='$cd'";
					_exec($sql);
					for($i=0;$i<count($objects);$i++)
					{
						$sql="insert into tb_char_object 
							  values('$cd','".$objects[$i]."')";
						_exec($sql);
					}
				}
				$sql="update tb_char_val 
						  set char_descr = '$descr',
						  char_dttm = sysdate
						  where char_type_cd = '$cd'";
				_exec($sql);
				
			}
		}
		catch(Exception $exp)
		{
			_log($exp->getMessage());
			$response=0;
		}
	}
	echo $response;
?>