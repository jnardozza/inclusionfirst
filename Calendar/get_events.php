<?php
require_once "../../../inclusionfirst_api/connect_inclusion_first.php";
require_once "../../../inclusionfirst_api/Events.php";

#$start = $_GET["start"];
#$end = $_GET["end"];

$schedules = new Events;
//$scheduleObject = array('Date_Start' => $start, 'Date_End' => $end );
$scheduleObject = null;
$events = $schedules->getCalendarEvents($scheduleObject, $inclusionFirst, "Client");

echo $events;

?>