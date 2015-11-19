$('#createSchedule').on(
	'click',
	function(){
	    submitNew();
	}
);

$(function() { // document ready
	$('#calendar').fullCalendar({
		schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
		editable: true,
		scrollTime: '07:00',
		displayEventEnd: true,
		customButtons: {
  			    newSchedule: {
  			        text: 'Add Schedule',
  			        click: function() {
  			            newSchedule();
  			        }
  			    }
  			},
		header: {
			left: 'prevYear,prev,today,next,nextYear newSchedule',
			center: 'title',
			right: 'timelineDay,timelineSevenDays,month'
		},
		defaultView: 'timelineDay',
		views: {
			timelineSevenDays: {
				type: 'timeline',
				duration: { days: 7 },
				resourceGroupField: 'clientName',
				slotDuration: '24:00',
				displayEventEnd: true,
				resources: {
       				url: 'get_resources.php',
       				type: 'POST'
   				},
				events: {
       				url: 'get_events.php',
       				type: 'POST'
   				},
			}
		},
		resourceGroupField: 'clientName',
		eventClick: function(event, jsEvent, view){
			selectEvent(event, jsEvent, view);
		},
		resources: {
       		url: 'get_resources.php',
       		type: 'POST'
   		},
		events: {
       		url: 'get_events.php',
       		type: 'POST'
   		}
	});

});

function submitNew(){

	var domList = $('[id^="input_"]');
	var request = {};

	$.each( domList, function( key, value ) {
		var id = $(value).attr('id');
		var attribute = id.replace( "input_", "" );
		request[attribute] = document.getElementById(id).value;
	});


	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
    	 $("#modalNew").modal("toggle");
    	$('#calendar').fullCalendar( 'refetchEvents' );
    	}
  	}
	xhttp.open("POST", "submitSchedule.php", true);
	xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
	xhttp.send(JSON.stringify(request));

}

function selectEvent(event, jsEvent, view){
	var details = 	'<h4>Details</h4>' +
					'<table>' +
						'<tr>' +
							'<td>Client:</td>' +
							'<td>' + event.clientName + '</td>' +
						'</tr>' +
						'<tr>' +
							'<td>Personnel:</td>' +
							'<td>' + event.personnelName + '</td>' +
						'</tr>' +
						'<tr>' +
							'<td>Service:</td>' +
							'<td>' + event.serviceName + '</td>' +
						'</tr>' +
						'<tr>' +
							'<td>Description:</td>' +
							'<td><input value=\'' + event.description + '\'></input></td>' +
						'<tr>' +
							'<td>Date:</td>' +
							'<td><input type="date" value=\'' + event.date + '\'></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Time:</td>' +
							'<td><input type="time" value=\'' + event.startTime + '\'></input> to <input type="time" value=\'' + event.endTime + '\'></input></td>' +
						'</tr>' +
					'</table>';
	var repeat = 	'<h4>Repeat Options</h4><br>' +
					'repeat every <input id="weeks"></input> weeks on:' +
					'<table>' +
						'<tr>' +
							'<th>Day</th>' +
							'<th>Repeat</th>' +
							'<th>Start Time</th>' +
							'<th>End Time</th>' +
						'</tr>' +
						'<tr>' +
							'<td>Sunday:</td>' +
							'<td><select id="sunday"><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input type="time" id="sundayTimeStart"></input></td>' +
							'<td><input type="time" id="sundayTimeEnd"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Monday:</td>' +
							'<td><select id="monday"><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input type="time" id="mondayTimeStart"></input></td>' +
							'<td><input type="time" id="mondayTimeStart"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Tuesday:</td>' +
							'<td><select id="tuesday"><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input type="time" id="tuesdayTimeStart"></input></td>' +
							'<td><input type="time" id="tuesdayTimeStart"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Wednesday:</td>' +
							'<td><select id="wednesday"><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input type="time" id="wednesdayTimeStart"></input></td>' +
							'<td><input type="time" id="wednesdayTimeStart"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Thursday:</td>' +
							'<td><select id="thursday"><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input type="time" id="thursdayTimeStart"></input></td>' +
							'<td><input type="time" id="thursdayTimeStart"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Friday:</td>' +
							'<td><select id="friday"><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input type="time" id="fridayTimeStart"></input></td>' +
							'<td><input type="time" id="fridayTimeStart"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Saturday:</td>' +
							'<td><select id="saturday"><option value="1">No</option><option value="0">Yes</option></select></td>' +
							'<td><input type="time" id="saturdayTimeStart"></input></td>' +
							'<td><input type="time" id="saturdayTimeStart"></input></td>' +
						'</tr>' +
					'</table>';
           	$('#selectTitle').html(event.title);
           	$('#selectBody').html(details + repeat);
           	$('#modalSelect').modal();
   
}

function newSchedule(){
	var title = '<input id="input_title" value="New Schedule"></input>';
	var details = 	'<h4>Details</h4>' +
					'<table>' +
						'<tr>' +
							'<td>Client:</td>' +
							'<td><input id="input_client_id"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Personnel:</td>' +
							'<td><input id="input_personnel_id"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Service:</td>' +
							'<td><input id="input_service_id"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Description:</td>' +
							'<td><input id="input_description"></input></td>' +
						'<tr>' +
							'<td>Date:</td>' +
							'<td><input id="input_dateStart" type="date"> to <input id="input_dateEnd" type="date"></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Time:</td>' +
							'<td><input id="input_timeStart" type="time"></input> to <input id="input_timeEnd" type="time"></input></td>' +
						'</tr>' +
					'</table>';
	var repeat = 	'<h4>Repeat Options</h4><br>' +
					'repeat every <input id="input_weeks"></input> weeks on:' +
					'<table>' +
						'<tr>' +
							'<th>Day</th>' +
							'<th>Repeat</th>' +
							'<th>Start Time</th>' +
							'<th>End Time</th>' +
						'</tr>' +
						'<tr>' +
							'<td>Sunday:</td>' +
							'<td><select id="input_sunday"><option value="0">No</option><option value="1">Yes</option></select></td>' +
							'<td><input type="time" id="input_sundayTimeStart"></input></td>' +
							'<td><input type="time" id="input_sundayTimeEnd"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Monday:</td>' +
							'<td><select id="input_monday"><option value="0">No</option><option value="1">Yes</option></select></td>' +
							'<td><input type="time" id="input_mondayTimeStart"></input></td>' +
							'<td><input type="time" id="input_mondayTimeStart"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Tuesday:</td>' +
							'<td><select id="input_tuesday"><option value="0">No</option><option value="1">Yes</option></select></td>' +
							'<td><input type="time" id="input_tuesdayTimeStart"></input></td>' +
							'<td><input type="time" id="input_tuesdayTimeStart"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Wednesday:</td>' +
							'<td><select id="input_wednesday"><option value="0">No</option><option value="1">Yes</option></select></td>' +
							'<td><input type="time" id="input_wednesdayTimeStart"></input></td>' +
							'<td><input type="time" id="input_wednesdayTimeStart"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Thursday:</td>' +
							'<td><select id="input_thursday"><option value="0">No</option><option value="1">Yes</option></select></td>' +
							'<td><input type="time" id="input_thursdayTimeStart"></input></td>' +
							'<td><input type="time" id="input_thursdayTimeStart"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Friday:</td>' +
							'<td><select id="input_friday"><option value="0">No</option><option value="1">Yes</option></select></td>' +
							'<td><input type="time" id="input_fridayTimeStart"></input></td>' +
							'<td><input type="time" id="input_fridayTimeStart"></input></td>' +
						'</tr>' +
						'<tr>' +
							'<td>Saturday:</td>' +
							'<td><select id="input_saturday"><option value="0">No</option><option value="1">Yes</option></select></td>' +
							'<td><input type="time" id="input_saturdayTimeStart"></input></td>' +
							'<td><input type="time" id="input_saturdayTimeStart"></input></td>' +
						'</tr>' +
					'</table>';

           	$('#modalTitle').html(title);
           	$('#modalBody').html(details + repeat);
           	$('#modalNew').modal();
}