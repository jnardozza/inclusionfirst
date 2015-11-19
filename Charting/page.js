var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

$.ajax({
	url: 'get_datasets.php',
	type: "POST",
	cache: false,
	dataType: 'json',
	data: {contract_id: contract_id, timeframe: "monthly"},
   	success: function(data, status, xhr){
   		console.log(data.labels);
   		console.log(data.datasets);
   		var barChartData = {
			labels : data.labels,
			datasets : data.datasets,
		}
		var ctx = document.getElementById("canvas").getContext("2d");
		window.myBar = new Chart(ctx).Bar(barChartData, {
			responsive : true,
			maintainAspectRatio : false
		});
   	}
});