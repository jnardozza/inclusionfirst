<?php
require_once "../../../inclusionfirst_api/connect_inclusion_first.php";
require_once "../../../inclusionfirst_api/Events.php";

$start_param = $_POST["start"];
$end_param = $_POST["end"];
$group = $_POST["group"];
$timezone = 1;

$start_unix = strtotime($start_param) + 3600 * $timezone+date("I");
$end_unix = strtotime($end_param) + 3600 * $timezone+date("I");

$start = gmdate('m/d/Y', $start_unix);
$end = gmdate('m/d/Y', $end_unix);

$schedules = new Events;
$scheduleObject = array('date' => ">=".$start, 'dateSearch' => "<=".$end );
$events = $schedules->getCalendarEvents($scheduleObject, $inclusionFirst, "Client");

echo $events;

?>