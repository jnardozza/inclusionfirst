<?php
//gets a JSON array of schedules for a specific start and end date passed via GET
require_once "../../../inclusionfirst_api/connect_inclusion_first.php"; //connection for inclusion first
require_once "../../../inclusionfirst_api/Events.php"; //schedule table api

#$start = $_GET["start"];
#$end = $_GET["end"];

$schedules = new Events;
//$scheduleObject = array('Date_Start' => $start, 'Date_End' => $end );
$scheduleObject = null;
$events = $schedules->getCalendarEvents($scheduleObject, $inclusionFirst, "Client");

echo $events;

?>