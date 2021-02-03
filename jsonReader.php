<?session_start();?>
<?php
if($_POST["protection"]!="ABNet") {die();}
    
if(is_file("service.php")) {include("service.php");}
if(is_file("library.php")) {include("library.php");}
$_SESSION["SYSTEM_ROOT"]    = getSystemRoot();
$_SESSION["PROJECT_INFO"]   = $_SESSION["SYSTEM_ROOT"]."/setsParam.php";
if(is_file($_SESSION["PROJECT_INFO"])) {include($_SESSION["PROJECT_INFO"]);}


//if(strLen(Trim($_POST["dbTables"]))==0) die();
$aTables = explode("~", $_POST["dbTables"]);
    
$db  = _constructClass("db");   
  
$aStruct = [];
foreach($aTables as $table) {
    $aStruct[] = $db->structureFromTable($table, __FILE__, __LINE__, true);
}  

$aFields  = [];
foreach($aStruct as $stru) {
    foreach($stru as $field) $aFields[] = $field;
}

$aStruct = $aFields;


$where = "";
if(strLen(Trim($_POST["dbWhere"]))== 0) {
    if(strLen(trim($_POST["dbID"]))>0 && $_POST["dbID"]>0) {$where = $aStruct[0]." = ".$_POST["dbID"];}
} else {
    $where = $_POST["dbWhere"];        
}

                    
if(strLen(Trim($where))==0) $where = '1';
if(strLen(Trim($_POST["dbJoin"]))>0) $where .=  ' && '.$_POST["dbJoin"];

$aData = $db->get("", $aTables, null, $where, true, __FILE__, __LINE__, false);


//$jsonFileName = "json/".$_SERVER['REMOTE_ADDR'].".json";
$jsonPlusID = "";
if($_POST["dbID"]>0 && strLen(Trim($_POST["dbWhere"]))==0 ) {$jsonPlusID = "_".$_POST["dbID"];}
if(strLen(Trim($jsonPlusID))==0 && strLen(Trim($_POST["dbWhere"]))>0) {
    $asc = 0;
    $forAscWhere = str_replace(' ', '', $_POST["dbWhere"]);
    for($i=0;$i<strLen(Trim($forAscWhere));++$i) {
        $asc += ord(substr($forAscWhere, $i, 1));
    }
    $jsonPlusID = "_ASC_".$asc;
}

$aDbTables = explode('~', $_POST["dbTables"]);
$comma = $dbTable = '';

foreach($aDbTables as $table) {
    $dbTable .= $comma.subStr($table, 0, 3);
    $comma = '~';
}

//$jsonFileName = $_POST["pathJSON"].$_POST["dbTables"].$jsonPlusID.".json";
$jsonFileName = $_POST["pathJSON"].$dbTable.$jsonPlusID.".json";

if(!is_file($jsonFileName)) {

    $cdir = scandir("json");
    foreach ($cdir as $key => $value) {
        if (!in_array($value,array(".",".."))) {
            if(fileSize("json/".$value) < 15) {unlink("json/".$value);}
       }
    }

    $EOL = chr(13).chr(10);
    $json = '['.$EOL;
    if(count($aData) > 0) {
        $numRec = 1;
        $commaRec = ',';        
        foreach($aData as $record) {
            $json .= '{'.$EOL;
            $index = 1; 
            $comma = ',';
            foreach($aStruct as $field) {
                //  if($index==count($aStruct)) {$comma = '';}
                $json .= '"'.$field.'" : "'.$record[$field].'"'.$comma.$EOL;
                ++$index;
            }
            $dir = "img";
            $cdir = scandir($dir);
            $json .= '"images" : {'.$EOL;
    
            $aImages = array();
            foreach ($cdir as $key => $value)
            {
                if (!in_array($value,array(".","..")))
                {
                    if(strPos($value,"_".str_pad($record["gen_id"],9,'0', STR_PAD_LEFT).".")) {
                        $aImages[] = $value;
                    }
                }
            }    
            $fileIndex = 1;
            $imgComma = ',';
            foreach($aImages as $image) {
                if($fileIndex==count($aImages)) {$imgComma = '';}
                    $json .= '"image'.str_pad($fileIndex, 2, '0', STR_PAD_LEFT).'" : "'.$image.'"'.$imgComma.$EOL;
                    ++$fileIndex;
            }
            $json .= '}'.$EOL;
            if($numRec==count($aData)) {$commaRec = '';}
            $json .= '}'.$commaRec.$EOL;
            ++$numRec;
        }
    }
    
    $json .= ']'.$EOL;
    
    if(is_file($jsonFileName)) {unlink($jsonFileName);}
    $handle = fopen($jsonFileName, "w");
    fwrite($handle, chr(239) . chr(187) . chr(191) .$json);
    fclose($handle);

}

 

//temporary
function getSystemRoot() {
        
    $lastPath=getCWD();
    if(is_file("index.php")) {return(getCWD());}
    $aDir = explode("/",getCWD());
    $index = Count($aDir);   
    for($x=0;$x<10;++$x)    {
        if( is_file("index.php") )    {$lastSystemRoot=$systemRoot;}
        $systemRoot=""; for($i=1;$i<($index-1);++$i)  {$systemRoot.="/".$aDir[$i];    } --$index;
        if(!@chDir($systemRoot)) {break;} 
    }
    chDir($lastPath);
    return($lastSystemRoot);
}
?>