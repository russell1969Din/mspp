<?session_start();?>

<!DOCTYPE html>
<html>

<head>
    <meta http-equiv='cache-control' content='no-cache, no-store, must-revalidate'>
    <meta http-equiv='expires' content='0'>
    <meta http-equiv='pragma' content='no-cache'>

    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <link rel="shortcut icon" type="image/x-icon" href="icon.jpg" />

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>MSPP - responzívny formulár</title>
</head>                                 

<body>
    <span id="lastURL" style="display:none;"></span>
    <span id="currentURL" style="display:none;"></span>
    <span id="webURL" style="display:none;"></span>

    <span id="json" style="display:none;"></span>
    <div id="workSpace_css" ></div>
    <div id="workSpace_general" ></div>
    <script id="main"  src="/srcRoot/main.js" type="module"></script>
</body>

<html>


<script>
function undefinedIs(param) {if(typeof param != 'undefined') return param; else return '';}
</script>
