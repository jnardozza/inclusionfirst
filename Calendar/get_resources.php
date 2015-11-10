<?php
require_once "../../../inclusionfirst_api/connect_inclusion_first.php";
require_once "../../../inclusionfirst_api/Events.php";

$schedules = new Events;
$resources = $schedules->getCalendarResources($inclusionFirst, "Client");

echo $resources;

?>