<?php
require_once "../../../inclusionfirst_api/connect_inclusion_first.php";
require_once "../../../inclusionfirst_api/Schedules.php";

$request = $_POST["request"];
$parameter = Schedules::getAsParameter($request);

$schedules = new Schedules;
$events = $schedules->newSchedule($parameter, $inclusionFirst);

echo $events;

?>