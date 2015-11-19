<?php
require_once "../../../inclusionfirst_api/connect_inclusion_first.php";
require_once "../../../inclusionfirst_api/Contracts.php";
require_once "../../../inclusionfirst_api/Events.php";

#get monthly budget amount
#for each month, get schedule amounts
#ignore timesheets for now

$contract_id = $_POST['contract_id'];

$contracts = new Contracts;
$search = array('id' => $contract_id);
$parameter = Contracts::getAsParameter($search, Contracts::getFields());
$parameter = json_encode($parameter);
$contract = $contracts->find($parameter, $inclusionFirst);

$client_id = $contract[0]['client_id'];
$service_id = $contract[0]['service_id'];
$monthly_budget = $contract[0]['hoursMonthly'];

$start    = (new DateTime($contract[0]['dateStart']))->modify('first day of this month');
$end      = (new DateTime($contract[0]['dateEnd']))->modify('first day of this month');
$interval = DateInterval::createFromDateString('1 month');
$periods   = new DatePeriod($start, $interval, $end);

foreach ($periods as $dt) {
    $labels[] = $dt->format("M Y");
}

$data['labels'] = $labels;

foreach ($labels as $period) {
	$data_budget[] = $monthly_budget;
}

$dataset_budget['fillColor'] = "rgba(220,220,220,0.5)";
$dataset_budget['strokeColor'] = "rgba(220,220,220,0.8)";
$dataset_budget['highlightFill'] = "rgba(220,220,220,0.75)";
$dataset_budget['highlightStroke'] = "rgba(220,220,220,1)";
$dataset_budget['data'] = $data_budget;

$dataset[] = $dataset_budget;

foreach ($periods as $dt) {
	$dt_end = clone $dt;
    $start    = $dt->modify('first day of this month');
	$end      = $dt_end->modify('last day of this month');

	$d = '{' . $start->format('d') . '...' . $end->format('d') . '}';
	$m = $start->format('m');
	$y = $start->format('Y');

	$events = new Events;
	$search = array('date' => "$m/$d/$y", 'client_id' => $client_id, 'service_id' => $service_id);
	$parameter = Events::getAsParameter($search, Events::getFields());
	$parameter = json_encode($parameter);
	$foundEvents = $events->find($parameter, $inclusionFirst);
	error_log("$m/$d/$y");
	if (!FileMaker::isError($foundEvents)) {
		$data_scheduled[] = ( FM_Table::summarize($foundEvents, 'duration_unix') / 60 / 60 ) ;
	} else {
		$data_scheduled[] = 0 ;
	}
}

$dataset_scheduled['fillColor'] = "rgba(151,187,205,0.5)";
$dataset_scheduled['strokeColor'] = "rgba(151,187,205,0.8)";
$dataset_scheduled['highlightFill'] = "rgba(151,187,205,0.75)";
$dataset_scheduled['highlightStroke'] = "rgba(151,187,205,1)";
$dataset_scheduled['data'] = $data_scheduled;

$dataset[] = $dataset_scheduled;

$data['datasets'] = $dataset;
echo json_encode($data);

?>