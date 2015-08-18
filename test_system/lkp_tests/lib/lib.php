<?php
error_reporting(0);
/*- variables -*/
$SID = '***';//trim(shell_exec("echo %ORA_SID%"));
$HOST = '***';//trim(shell_exec("echo %ORA_HOST%"));
$PASS = '***';//trim(shell_exec("echo %ORA_PASS%"));
$USER = '***';//trim(shell_exec("echo %ORA_USER%"));

$TNS = " (
            DESCRIPTION=
            (
                ADDRESS=(PROTOCOL=TCP)
                        (HOST=$HOST)
                        (PORT=1521)
             )
             (
                CONNECT_DATA=
                (SERVICE_NAME=$SID)
              )
        )";
		
/*- log -*/
function _log($string)
{
    $file = htmlentities($_SERVER['PHP_SELF']);
    $logstring = ":: ".date('d.m.Y G:i:s')." ".$file." ".$string."; \r\n";
    $fp = fopen('log.txt', 'a+');
    fwrite($fp,$logstring);
    fclose($fp);
}

function rename_log()
{
    try
    {
        $file_name = 'log.txt';
        if(file_exists($file_name))
        {
            $size = filesize($file_name);
            if($size > 100000)
            {
                $handle = rename($file_name, date('d.m.Y').'_'.$file_name);
                if(!$handle)
                {
                   throw new Exception; 
                }
                else 
                {
                    //fclose($handle);
                    return 1;
                }
            }
        }
        else
        {
            throw new Exception;
        }
    }
    catch(Exception $exp)
    {
        return 0;
    }
}

rename_log();

/*- database connection -*/
function _connect() 
{    
    try
    {
        global $PASS,$TNS,$USER;
        $connection = oci_connect($USER,$PASS,$TNS,'AL32UTF8');
        if(!$connection)
        {
            $error = oci_error();
            throw new Exception($error['message'].'.While connecting.In '.__FUNCTION__.'(...)');
        }
        else 
        {
            return $connection;
        }  
    }
    catch(Exception $exp)
    {
        _log($exp->getMessage());
        die('Error in attempt connecting to database!');
    }
}
$conn = _connect();

function _exec($script,&$answer) 
{
    try
    {
        global $conn;
        $i = 0;
        $local_answer = array();
        $result = oci_parse($conn, $script);
        if(!$result) 
        {
            $error = oci_error($result);
            throw new Exception($error['message'].'. While parsing.In '.__FUNCTION__.'(...)');
        }
        $exec = oci_execute($result);
        if($exec) 
        {
            while($row = oci_fetch_array($result)) 
            {
                $local_answer[$i++] = $row;
            }
            if(isset($local_answer[0])) 
            {
                $answer = $local_answer;
                return true;
            }
        }
        else 
        {
            $error = oci_error($result);
            oci_close($conn);
            throw new Exception($error['message'].'. While executing:'.strtoupper($error['sqltext']).';In '.__FUNCTION__.'(...)');
        }
    }
    catch(Exception $exp)
    {
        _log($exp->getMessage());
        return false;
    }
}
/*-----more protective exec, against sql injections and a wee bit faster*/
function _execq($script,&$answer,$params) 
{
    try
    {
        global $conn;
        $i = 0; $start = 0;
        $local_answer = array();
        $result = oci_parse($conn, $script);
        if(!$result) 
        {
            $error = oci_error();
            throw new Exception($error['message'].'. While parsing.In '.__FUNCTION__.'(...)');
        }
		$count = substr_count($script,':',0,strlen($script));
		if($count!=0)
		{
			for($i=0;$i<$count;$i++)
			{
				$pos = strpos($script,':',$start);
				$val = substr($script,$pos,4);
				//$params_name[$i] = $val;
				$bind[$val] = $params[$i];
				$start = $pos + 1;
			}
			foreach($bind as $key => $val)
			{
				oci_bind_by_name($result,$key,$bind[$key]);
			}
		}
		$exec = oci_execute($result);
		if($exec) 
		{
				while($row = oci_fetch_array($result)) 
				{
					$local_answer[$i++] = $row;
				}
				if(isset($local_answer[0])) 
				{
					$answer = $local_answer;
					return true;
				}
		}
		else 
		{
			$error = oci_error($result);
			oci_close($conn);
			throw new Exception($error['message'].'. While executing:'.strtoupper($error['sqltext']).';In '.__FUNCTION__.'(...)');
		}
    }
    catch(Exception $exp)
    {
        _log($exp->getMessage());
        return false;
    }
}
?>