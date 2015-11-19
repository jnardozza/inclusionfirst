<?php
$contract_id = $_GET['id'];
?>

<!doctype html>
<html>
	<head>
		<title>Monthly Performance</title>
		<?php echo '<script>var contract_id = "' . $contract_id . '"</script>' ?>
	</head>
	<body>
			<canvas id="canvas" height="360" width="700"></canvas>
			<script src="lib/Chart.js"></script>
			<script src="lib/jquery.min.js"></script>
			<script src="page.js"></script>
	</body>
</html>