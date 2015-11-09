<?php
//gets a JSON array of schedules for a specific start and end date passed via GET
require_once "../../../api/InclusionFirst/connect_inclusion_first.php"; //connection for inclusion first
require_once "../../../api/InclusionFirst/Schedules.php"; //schedule table api

$schedules = new Schedules;
$resources = $schedules->getCalendarResources($inclusionFirst, "Client");

echo $resources;

?>