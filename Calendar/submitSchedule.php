<?php
require_once "../../../inclusionfirst_api/connect_inclusion_first.php";
require_once "../../../inclusionfirst_api/Schedules.php";

//$request = $_POST;
$request = file_get_contents("php://input");
$request = json_decode($request, TRUE);

$parameter = Schedules::getAsParameter($request, Schedules::getFields());
$parameter = json_encode($parameter);

$schedules = new Schedules;
$events = $schedules->newSchedule($parameter, $inclusionFirst);

var_dump($events);

?>